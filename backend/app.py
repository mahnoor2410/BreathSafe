from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models import db, User, ChatHistory
from forms import SignupForm, LoginForm
from gemini_config import model
from air_pollution import get_air_pollution_data
from config import Config
from flask_migrate import Migrate
from markupsafe import Markup
from werkzeug.datastructures import MultiDict
import re
import os
from flask_cors import CORS

app = Flask(__name__)
# Configure session cookies
app.config.update(
    SESSION_COOKIE_SAMESITE="None",
    SESSION_COOKIE_SECURE=True
)
CORS(app, origins="http://localhost:5173", supports_credentials=True)

API_KEY = os.getenv('API_NINJAS_KEY')
migrate = Migrate(app, db)

# DATABASE CONFIGURATION
app.config.from_object(Config)
db.init_app(app)

# Initialize Login Manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'api_login'

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({'error': 'Unauthorized access'}), 401

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

# APP CONFIGURATION
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=7)

# USER PROFILE ROUTE
@app.route('/api/userprofile', methods=['GET'])
@login_required
def get_user_profile():
    return jsonify({
        "username": current_user.username,
        "email": current_user.email,
        "password": "••••••••"
    })

# SIGNUP ROUTES
@app.route('/api/signup', methods=['POST'])
def api_signup():
    form_data = MultiDict(mapping=request.get_json())
    form = SignupForm(formdata=form_data)
    
    if not form.validate():
        errors = {field.name: field.errors for field in form if field.errors}
        print("Validation errors:", form.errors)
        return jsonify({
            'success': False,
            'message': 'Validation failed',
            'errors': errors
        }), 400

    if User.query.filter_by(username=form.username.data).first():
        return jsonify({
            'success': False,
            'message': 'Username already taken',
            'errors': {'username': ['This username is already taken']}
        }), 409

    if User.query.filter_by(email=form.email.data).first():
        return jsonify({
            'success': False,
            'message': 'Email already taken',
            'errors': {'email': ['This email is already registered']}
        }), 409

    try:
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()

        login_user(user)
        return jsonify({
            'success': True,
            'message': 'Account created successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Account creation failed',
            'error': str(e)
        }), 500

# LOGIN ROUTES
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()

    if not data:
        return jsonify({'success': False, 'message': 'No input provided'}), 400

    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user)
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

# CHANGE PASSWORD ROUTES
@app.route('/api/change_password', methods=['POST'])
@login_required
def api_change_password():
    data = request.get_json()
    
    new_password = data.get('new_password', '')
    confirm_password = data.get('confirm_password', '')

    if new_password != confirm_password:
        return jsonify({'success': False, 'message': 'New passwords do not match.'}), 400

    if len(new_password) < 8:
        return jsonify({'success': False, 'message': 'Password should be at least 8 characters long.'}), 400

    user = current_user
    try:
        user.set_password(new_password)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Password successfully updated.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': 'Error updating password.', 'error': str(e)}), 500

# AIR POLLUTION PAGE ROUTES
@app.route('/api/air_pollution', methods=['POST'])
def air_pollution():
    request_data = request.get_json()
    if not request_data or 'latitude' not in request_data or 'longitude' not in request_data:
        return jsonify({"error": "Missing required fields: latitude, longitude"}), 400

    try:
        data = get_air_pollution_data(request_data)
        if not data or data.get('air_pollution_data') is None:
            return jsonify({"error": "Unable to fetch air pollution data. Please try again later."}), 400

        air_pollution_data = data.get('air_pollution_data', {})
        recommendations = data.get('recommendations', 'No recommendations available.')
        suggestions = data.get('suggestions', 'No suggestions available.')
        weekly_forecast = data.get('weekly_forecast', [])
        hourly_data = data.get('hourly_data', [])
        hourly_pm25 = data.get('hourly_pm25', [])
        hourly_pm10 = data.get('hourly_pm10', [])
        selected_time = data.get('selected_time', None)
        selected_aqi = data.get('selected_aqi', None)
        daily_data = data.get('daily_data', [])
        selected_date = data.get('selected_date', None)

        for entry in daily_data:
            if 'date' in entry and isinstance(entry['date'], datetime):
                entry['date'] = entry['date'].strftime('%Y-%m-%d')

        response_data = {
            "air_pollution_data": air_pollution_data,
            "recommendations": recommendations,
            "suggestions": suggestions,
            "weekly_forecast": weekly_forecast,
            "hourly_data": hourly_data,
            "hourly_pm25": hourly_pm25,
            "hourly_pm10": hourly_pm10,
            "selected_time": selected_time,
            "selected_aqi": selected_aqi,
            "daily_data": daily_data,
            "selected_date": selected_date
        }

        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch air pollution data: {str(e)}"}), 500
    
# chatbot 

@app.route('/check-auth', methods=['GET'])
@login_required
def check_auth():
    return jsonify({'message': 'Authenticated'}), 200

def format_response(text):
    cleaned_text = re.sub(r'[\*\_]', '', text)
    formatted_text = re.sub(r'(^[A-Za-z\s]+:)', r'<b>\1</b><br><br>', cleaned_text, flags=re.M)
    formatted_text = re.sub(r'(\.)(\s+)', r'.<br><br>', formatted_text)
    return Markup(formatted_text)

def sanitize_title(title):
    return re.sub(r'[\*\_]', '', title).strip()

@app.route('/api/chatbot', methods=['POST'])
@login_required
def chatbot_api():
    data = request.get_json()
    user_input = data.get('message')

    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    try:
        # Step 1: Chatbot interaction
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(user_input)
        bot_response = response.text.strip()
        formatted_response = format_response(bot_response)

        # Step 2: Title generation
        title_prompt = (
            "Generate a concise and meaningful title for a conversation that reflects the full context of the interaction. "
            f"Include user input.\n\nUser: {user_input}"
        )
        title_response = model.start_chat(history=[]).send_message(title_prompt).text.strip()
        title_response = sanitize_title(title_response)
        if len(title_response) > 100:
            title_response = title_response[:100] + "..."

        # Step 3: Save chat to database
        chat_history = ChatHistory(
            user_id=current_user.id,
            user_input=user_input,
            bot_response=formatted_response,
            title=title_response
        )
        db.session.add(chat_history)
        db.session.commit()

        # Step 4: Return response
        return jsonify({'response': formatted_response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# chat history

import logging 
# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route('/api/history', methods=['GET'])
@login_required
def chat_history_api():
    try:
        logger.debug(f"Fetching history for user_id: {current_user.id}")
        seven_days_ago = datetime.utcnow() - timedelta(days=7)

        history = ChatHistory.query.filter(
            ChatHistory.user_id == current_user.id,
            ChatHistory.timestamp >= seven_days_ago
        ).order_by(ChatHistory.timestamp.desc()).all()

        history_data = [
            {
                'id': chat.id,
                'title': chat.title or None,  # Handle None explicitly
                'user_input': chat.user_input,
                'bot_response': str(chat.bot_response),  # Ensure string conversion
                'timestamp': chat.timestamp.isoformat()
            }
            for chat in history
        ]

        logger.debug(f"Returning {len(history_data)} chat entries")
        return jsonify({'history': history_data}), 200

    except Exception as e:
        logger.error(f"Error in chat_history_api: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500
    
# chat Detail

@app.route('/api/history/<int:chat_id>', methods=['GET'])
@login_required
def get_chat_detail(chat_id):
    chat = ChatHistory.query.get_or_404(chat_id)

    if chat.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized access'}), 403

    return jsonify({
        'id': chat.id,
        'title': chat.title,
        'user_input': chat.user_input,
        'bot_response': str(chat.bot_response),
        'timestamp': chat.timestamp.isoformat()
    })

# update chat title

@app.route('/api/history/<int:chat_id>', methods=['PUT'])
@login_required
def update_chat_title(chat_id):
    chat = ChatHistory.query.get_or_404(chat_id)

    if chat.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    new_title = data.get('title', chat.title)
    new_title = sanitize_title(new_title)

    if len(new_title) > 100:
        new_title = new_title[:100] + "..."

    chat.title = new_title
    db.session.commit()

    return jsonify({'message': 'Title updated', 'title': new_title})

# delete Chat 

@app.route('/api/history/<int:chat_id>', methods=['DELETE'])
@login_required
def delete_chat_api(chat_id):
    chat = ChatHistory.query.get_or_404(chat_id)

    if chat.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized access'}), 403

    db.session.delete(chat)
    db.session.commit()

    return jsonify({'message': 'Chat deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
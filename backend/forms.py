from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField # library 
from wtforms.validators import DataRequired, Email, EqualTo # for validations

class SignupForm(FlaskForm):
    class Meta:
        csrf = False  # ✅ Disable CSRF for this API form

    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()]) # filled + valid ho
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')]) # match
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    class Meta:
        csrf = False  # ✅ Disable CSRF for this API form
        
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

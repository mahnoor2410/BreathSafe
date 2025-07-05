# BreathSafe 🌬️

[![Stars](https://img.shields.io/github/stars/mahnoor2410/BreathSafe?style=social)](https://github.com/mahnoor2410/BreathSafe/stargazers)
[![Forks](https://img.shields.io/github/forks/mahnoor2410/BreathSafe?style=social)](https://github.com/mahnoor2410/BreathSafe/fork)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB)](https://reactjs.org)

**BreathSafe** is an AI-powered web platform for real-time air quality monitoring and health guidance. Powered by Gemini, it features an interactive chatbot for air quality and health queries, integrated with the OpenWeather API for detailed AQI data and recommendations. Built with React JS and a Python/Flask backend, it provides secure user authentication and chat history management for health enthusiasts and environmentalists.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

---

## Project Overview

Air quality issues pose significant health risks, often undetected until severe. **BreathSafe** leverages AI to address this challenge with a Gemini-powered chatbot for personalized health guidance and real-time AQI monitoring. Its user-friendly React JS interface, secure Flask backend, and scalable database design make it ideal for monitoring air quality and managing health data.

---

## Features

- **AI-Powered Chatbot**: Query air quality or health issues using Gemini, with responses saved for 7 days.
- **Real-Time AQI Monitoring**: View AQI and pollutants (CO, NO2, PM2.5, PM10) with hourly, daily, and weekly forecasts.
- **Health Recommendations**: AI-generated short-term and long-term suggestions based on AQI levels.
- **User Profile Management**: Secure signup, login, and password updates via React JS.
- **Chat History**: View, edit titles, or delete chatbot interactions.
- **Secure & Scalable**: Flask-Login and Flask-Migrate ensure robust authentication and database management.
- **Admin Dashboard**: Manage users and system settings.

---

## Tech Stack

- **Backend**: Python, Flask, Flask-Login, Flask-Migrate, Flask-CORS, SQLAlchemy
- **Frontend**: React JS, JavaScript, HTML, CSS, `react-router-dom`, `react-icons`, `styled-components`, Axios
- **Database**: SQLite (development) / PostgreSQL (production)
- **AI/ML**: Gemini model (via `gemini_config`)
- **Dev Tools**: `requests`, `markupsafe`, `logging`, `re`, `datetime`

---

## System Architecture

- **Authentication System**: Flask-Login manages secure user signup, login, and session handling.
- **Real Time AQI Monitoring**:User selects location via interactive map; system retrieves real-time AQI data (CO, NO₂, PM2.5, PM10), displays trends, short-term alerts, and long-term health suggestions.
- **Chatbot Support**: Gemini model processes user queries for personalized air quality and health guidance.
- **Web Platform**: React JS frontend handles user interactions, AQI visualization, chatbot conversation, and profile management.
- **Data Storage**: SQLite/PostgreSQL stores user data, chat history, and AQI records.
- **API Layer**: Flask RESTful APIs (/api/signup, /api/chatbot, etc.) enable frontend-backend communication.
---

## Getting Started

### Prerequisites

- Python 3.8+
- Flask
- React JS (requires npm)
- SQLite (development) or PostgreSQL (production)
- Git
- Gemini API Access (for chatbot and recommendations, see Gemini documentation)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/mahnoor2410/BreathSafe.git
    cd BreathSafe
    ```

2. **Install backend dependencies**
    ```bash
    cd backend
    python -m venv venv
    source venv/Scripts/activate  # On Windows
    # source venv/bin/activate  # On Linux/Mac
    pip install -r requirements.txt
    ```

3. **Start the backend server**
    ```bash
    flask --debug run  # Runs on http://localhost:5000
    ```

4. **Set up the React JS frontend**
    ```bash
    cd frontend
    npm install
    npm run dev  # Runs on http://localhost:5173
    ```

7. **Configure Gemini AI**
    - Edit `backend/gemini_config.py` with your Gemini API credentials (refer to Gemini documentation).

---

## Usage

- Access the web app at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).
- Register or log in to access the dashboard.
- Use the chatbot to ask air quality or health-related questions.
- Enter latitude/longitude to view AQI, pollutant levels, and forecasts.
- Review AI-generated recommendations for air quality management.
- Manage chat history (view, edit titles, or delete).
---

## Screenshots

*Add screenshots to `screenshots/` directory or host on Imgur.*
- **Chatbot**: AI-powered interaction.
  ![Chatbot](screenshots/chatbot.png)
- **Dashboard**: AQI and forecasts.
  ![Dashboard](screenshots/dashboard.png)
- **User Profile**: Manage user details.
  ![User Profile](screenshots/user-profile.png)
- **Login Page**: Secure authentication.
  ![Login Page](screenshots/login-page.png)

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Make changes and commit.
4. Submit a pull request.

For major changes, open an issue first to discuss.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

---

## Authors

- Mahnoor Shahid
- Duaa Azmat
- Zainab Asif
- Areeba Naveed
  
 **Supervisor**: Ms. Fatima Anjum
 **Institution**: Lahore College For Women University

---

## Acknowledgments

- All open-source contributors and community resources referenced in the making of this project.
- Special thanks to our supervisor for guidance and support.

---

## Contact

For queries or collaboration, please open an issue or contact the authors directly.

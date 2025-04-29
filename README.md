# 🗓️ SchedulEase



A versatile, intuitive web application for managing courses and schedules—with a unique, **dynamic mood-based scheduler** that adapts to how you feel.

---

## 🚀 Features

1. **User Management & Authentication** 🔐
   - Secure sign-up / login flows with **JWT** and **Redux** state management.
   - Role-based access: Administrators, Instructors, Students.

2. **Course Module Management** 📚
   - CRUD for course modules: create, edit, delete, view.
   - Rich-text support for module content.
   - Module assignment to users by role.

3. **Dynamic Mood-Based Schedule Management** 🎭
   - **Unique Function:** Analyze user “mood text” via `Sentiment.js` to calculate a sentiment score.
   - Automatically **adjust flex schedules** in real time:
     - Negative mood → add buffer time (e.g., +30 min)
     - Positive mood → tighten schedule (e.g., -30 min)
     - Neutral → no change.
   - Propose changes, await user confirmation, then update via **WebSocket** & log events to **Kafka**.

4. **General Schedule Management** 📅
   - Create and manage fixed or flexible schedules.
   - View daily/weekly calendar overlays.
   - Drag-and-drop adjustments with live updates.

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Real-time:** Socket.io, KafkaJS, Docker (Kafka & Zookeeper)
- **NLP:** Sentiment.js
- **DevOps:** Docker Desktop, GitHub Actions

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/schedulease.git
   cd schedulease
   ```
2. **Install dependencies**
   ```bash
   # Server
   cd server && npm install

   # Client
   cd ../client && npm install
   ```
3. **Configure environment**
   - Copy `.env.example` to `.env` in both `server` and `client` folders.
   - Set `JWT_SECRET`, `MONGO_URI`, Kafka and Socket.io configs.
4. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```
5. **Start development servers**
   ```bash
   # In one tab:
   cd server && npm run dev

   # In another:
   cd client && npm start
   ```


## 💡 How It Works: Mood-Based Scheduler

1. **Input & Analysis**:
   - User enters mood text (e.g., “I’m feeling stressed today”).
   - Sentiment.js computes a sentiment score.

2. **Adjustment Logic**:
   - Score < 0 → Suggest break and add buffer time.
   - Score = 0 → Keep schedule unchanged.
   - Score > 0 → Suggest productive mode and tighten slots.

3. **Proposal & Confirmation**:
   - Flex schedules fetched from DB.
   - Proposed times shown; user confirms via UI.

4. **Update & Notify**:
   - On confirmation, updates saved with `updatedByMood: true`.
   - Real-time notification via Socket.io.
   - Event published to Kafka topic for analytics.

---



*Developed with ❤️ by the SchedulEase Team*


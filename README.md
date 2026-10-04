# StudyMate - AI-Powered Study Assistant

StudyMate is a full-stack web application that helps students analyze study materials (PDFs) using Groq's cloud AI API. It transforms textbooks and lecture notes into structured summaries, smart notes, and interactive quizzes.

## 🚀 Features

- **PDF Upload & Analysis**: Upload any academic PDF and get an instant overview of the subject and main concepts.
- **Important Topics**: AI identifies high-priority topics with explanations and related concepts.
- **Smart Notes**: Converts dense PDF text into structured study notes with headings, bullet points, and definitions.
- **MCQ Generator**: Generates a configurable number of MCQs based on the document.
- **Interactive Quiz**: A full quiz experience with score tracking and detailed explanations for every answer.
- **Quiz History & Analytics**: Saves each completed attempt and shows the user's study totals and score trend.
- **AI Processing**: PDF text is sent to Groq's API for analysis. Do not upload material you are not comfortable sharing with that provider.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Axios, Lucide-React, React Router.
- **Backend**: Node.js, Express.js, Multer (Uploads), pdf-parse (Extraction).
- **AI Engine**: Groq API (default model: `openai/gpt-oss-20b`).

## 📂 Folder Structure

```text
StudyMate/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, Uploader, Dashboard)
│   │   ├── services/       # API Integration
│   │   └── App.jsx        # Main Application Logic
├── server/                # Node.js Backend
│   ├── controllers/       # Request Handlers
│   ├── middleware/        # Upload validation & File limits
│   ├── routes/            # API Endpoints
│   ├── services/          # PDF processing & Groq API logic
│   └── server.js          # Entry point
└── README.md
```

## ⚙️ Installation & Setup

### 1. Prerequisites
- **Node.js** (v20.19+)
- **MongoDB** (local for development, or a hosted MongoDB deployment)

### 2. Groq API Setup
Create an API key in the [Groq Console](https://console.groq.com/keys) and add it as `GROQ_API_KEY` in `server/.env`.

### 3. Backend Setup
```bash
cd server
cp .env.example .env
# Update .env with your GROQ_API_KEY
npm install
npm start # (or node server.js)
```

### 4. Frontend Setup
```bash
cd client
npm install
npm run dev
```

Copy `client/.env.example` to `client/.env` for local development. When frontend and backend are hosted separately, set `VITE_API_URL` to the public backend API base URL (ending in `/api`) before building the frontend. Set `NODE_ENV=production`, `CLIENT_ORIGIN` to the frontend's exact origin, `MONGODB_URI` to the hosted database, and use a newly generated random `JWT_SECRET` of at least 32 characters plus a private `GROQ_API_KEY`. Never put server credentials in client environment variables.

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pdf/upload` | POST | Uploads PDF file to server |
| `/api/pdf/analyze` | POST | Extracts text and performs initial AI analysis |
| `/api/ai/notes` | POST | Generates structured study notes |
| `/api/ai/topics` | POST | Identifies important topics |
| `/api/ai/mcqs` | POST | Generates multiple choice questions |
| `/api/analytics` | GET | Returns the signed-in user's analytics |
| `/api/quiz-attempts` | GET/POST | Reads/saves the signed-in user's quiz history |
| `/api/health` | GET | Checks server status |

## 🛡 Data handling
AI requests send extracted PDF text to Groq for processing. Review Groq's current data handling terms before uploading sensitive study material. An internet connection and a configured API key are required.

## 🚀 Deployment notes

The API uses local disk temporarily for uploaded PDFs and removes each file after analysis. Configure the hosted service's writable temporary storage if required by your platform. The frontend host must serve `index.html` for client-side routes such as `/my-study` and `/analytics`.

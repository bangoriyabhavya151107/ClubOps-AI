ClubOps AI

A modern club and organization management web application built with Next.js, React, Supabase, and Tailwind CSS.

ClubOps AI is designed to provide a centralized platform for managing club members, events, attendance, and organization activities, with plans for AI-powered management features.

🚀 Tech Stack
Next.js — React framework and application routing
React — UI development
JavaScript / JSX — Application development
Supabase — Authentication and backend services
Tailwind CSS — Utility-first styling
Lucide React — Icons
Base UI — UI primitives
Google Gemini — AI integration dependency
ESLint — Code quality and linting
📁 Project Structure
ClubOps-AI/
├── public/
│
├── src/
│   ├── app/
│   │   ├── attendance/
│   │   │   └── page.jsx
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   ├── events/
│   │   │   └── page.jsx
│   │   ├── forgot-password/
│   │   │   └── page.jsx
│   │   ├── members/
│   │   │   └── page.jsx
│   │   ├── register/
│   │   │   └── page.jsx
│   │   ├── reset-password/
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.jsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   └── ui/
│   │       ├── avatar.jsx
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── input.jsx
│   │       ├── progress.jsx
│   │       ├── table.jsx
│   │       ├── tabs.jsx
│   │       ├── textarea.jsx
│   │       └── toast.jsx
│   │
│   └── lib/
│       ├── supabase/
│       │   └── client.js
│       └── utils.js
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
✨ Current Features
🏠 Landing Page

The application includes a landing page introducing ClubOps AI and its main capabilities.

📊 Dashboard

The dashboard provides an organization-management interface containing:

Member statistics
Event information
Task information
Quick actions
Organization overview

The current dashboard uses sample/static data and is being prepared for backend integration.

👥 Members

The Members section provides an interface for displaying club members with information such as:

Name
Email
Role
Member information

The current implementation uses sample data.

📅 Events

The Events section provides an interface for viewing organization events, including:

Event names
Dates
Locations
Event information

The current implementation uses sample data.

✅ Attendance

The Attendance section provides an interface for viewing attendance information, including:

Attendance statistics
Member attendance records
Attendance percentages

The current implementation currently uses sample data.

🔐 Authentication UI

The project includes authentication-related pages for:

Registration
Forgot password
Password reset

Supabase authentication is used for password reset functionality.

🗄️ Supabase

The project includes a Supabase client configuration located at:

src/lib/supabase/client.js

The application uses environment variables for Supabase configuration.

Create a .env.local file in the project root:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
Important

Do not commit .env.local or other files containing secret credentials.

The .gitignore file should prevent environment files from being committed to Git.

🤖 AI Features

The project includes the Google Generative AI package:

@google/genai

The project is intended to support AI-powered features such as:

AI assistance
Event planning
Organization management
Volunteer/member matching
Risk analysis
Document-based assistance

These features are part of the planned development of ClubOps AI and are not all implemented in the current version.

🛠️ Installation
1. Clone the repository
git clone https://github.com/bangoriyabhavya151107/ClubOps-AI.git
2. Enter the project directory
cd ClubOps-AI
3. Install dependencies
npm install
4. Configure environment variables

Create:

.env.local

and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
5. Start the development server
npm run dev

The application will normally be available at:

http://localhost:3000
📜 Available Scripts
Development
npm run dev

Starts the Next.js development server.

Production Build
npm run build

Creates a production build.

Start Production Server
npm start

Starts the production server after building.

Lint
npm run lint

Runs ESLint.

🔒 Environment Variables
Variable	Purpose
NEXT_PUBLIC_SUPABASE_URL	Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY	Supabase publishable key

Keep private credentials and API keys out of GitHub.

🗺️ Development Roadmap

The following features can be added as the project develops:

Complete Supabase authentication

Login page

User profiles

Role-based access control

Member CRUD operations

Event CRUD operations

Real attendance management

Task management

Meeting management

Announcements

Documents

Reports

AI Assistant

Gemini API integration

AI event planning

AI volunteer matching

Document-based AI/RAG

Organization analytics

Financial/budget management

Row Level Security (RLS)

Production deployment

🧭 Application Routes
Currently Available
/
├── /dashboard
├── /members
├── /events
├── /attendance
├── /register
├── /forgot-password
└── /reset-password

Some navigation items currently point to features that are planned but do not yet have corresponding pages.

⚠️ Current Development Status

ClubOps AI is currently under active development.

The current repository contains the frontend structure and UI foundation for the application. Several sections currently use static/sample data and still need to be connected to Supabase.

The project should therefore be considered a development/prototype version, rather than a fully production-ready club management system.

🤝 Contributing

Contributions and suggestions are welcome.

Basic workflow
git checkout -b feature/your-feature

Make your changes, then:

git add .
git commit -m "Add your feature"
git push origin feature/your-feature

Open a Pull Request on GitHub for review.

📄 License

This project is currently developed as a student/academic project.

Add a specific open-source license here if the project is later released under one.

👨‍💻 Project

ClubOps AI

GitHub repository:

https://github.com/bangoriyabhavya151107/ClubOps-AI
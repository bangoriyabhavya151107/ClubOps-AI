# ClubOps AI

## AI-Powered College Club Management Platform

ClubOps AI is a web-based college club management platform designed to help college clubs organize and manage their day-to-day activities from a centralized platform.

The system brings important club operations such as members, events, attendance, tasks, and administrative activities into one structured workspace.

The project is being developed as a student project using modern web technologies with a focus on scalability, usability, and future AI integration.

---
🚀 Installation and Setup
Step 1: Clone the Repository
git clone https://github.com/bangoriyabhavya151107/ClubOps-AI.git
Step 2: Navigate to the Project
cd ClubOps-AI
Step 3: Install Dependencies
npm install
Step 4: Configure Environment Variables

Create:

.env.local

Add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
Step 5: Start Development Server
npm run dev

Open the application in your browser:

http://localhost:3000


📜 Available Scripts
Development
npm run dev

Starts the Next.js development server.

Production Build
npm run build

Creates an optimized production build.

Production Server
npm start

Starts the application in production mode after building the project.

Lint
npm run lint

Runs ESLint to identify code-quality issues.

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Objectives](#-objectives)
- [Key Features](#-key-features)
- [Application Modules](#-application-modules)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Application Routes](#-application-routes)
- [Supabase Integration](#-supabase-integration)
- [AI Integration](#-ai-integration)
- [Installation and Setup](#-installation-and-setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Available Scripts](#-available-scripts)
- [Git Workflow](#-git-workflow)
- [Current Development Status](#-current-development-status)
- [Future Scope](#-future-scope)
- [Limitations](#-limitations)
- [Security](#-security)
- [Contributing](#-contributing)
- [Project Team](#-project-team)
- [Repository](#-repository)
- [License](#-license)

---

# 📌 Project Overview

Managing a college club involves several activities such as maintaining member information, organizing events, tracking attendance, assigning responsibilities, and monitoring club activities.

When these activities are managed using separate spreadsheets, messaging applications, and documents, information can become difficult to organize and maintain.

**ClubOps AI** is designed to provide a centralized digital platform for managing these activities.

The platform provides a modern dashboard-based interface where club administrators and members can access different club-management modules.

The current version focuses on building the frontend application, reusable components, dashboard interfaces, authentication-related pages, and the foundation for future Supabase and AI integration.

---

# ❗ Problem Statement

College clubs commonly face difficulties in managing their activities because information is distributed across multiple platforms.

Common problems include:

- Managing members manually
- Maintaining attendance records
- Organizing events
- Tracking tasks and responsibilities
- Monitoring club activities
- Maintaining information in spreadsheets
- Lack of a centralized management system
- Difficulty accessing club information quickly

ClubOps AI aims to address these challenges by providing a centralized platform for college club operations.

---

# 🎯 Objectives

The main objectives of ClubOps AI are:

1. To provide a centralized platform for college club management.
2. To simplify member management.
3. To organize and manage club events.
4. To provide an attendance tracking interface.
5. To provide a dashboard for monitoring club activities.
6. To provide authentication and user-management foundations.
7. To prepare the application for backend integration using Supabase.
8. To provide a foundation for future AI-assisted club management.
9. To create a scalable and maintainable web application.
10. To provide a simple and modern user experience.

---

# ✨ Key Features

## 🏠 Landing Page

The landing page introduces the ClubOps AI platform and provides navigation to the main sections of the application.

### Includes

- ClubOps AI branding
- Navigation bar
- Hero section
- Product introduction
- Call-to-action buttons
- Feature overview
- Responsive layout

---

## 📊 Dashboard

The dashboard provides an overview of the club's activities.

### Includes

- Total member information
- Upcoming events
- Task information
- Attendance statistics
- Quick actions
- Club activity overview

The dashboard currently uses demonstration/static data and is structured for future database integration.

---

## 👥 Member Management

The Members module provides an interface for viewing and managing club members.

### Includes

- Member listing
- Member names
- Email information
- Member roles
- Member status
- Search interface
- Role filtering
- Member actions

Example roles include:

- Member
- Volunteer
- Coordinator

The current implementation uses sample data for demonstration.

---

## 📅 Event Management

The Events module provides an interface for managing club events.

### Includes

- Event name
- Event date
- Event location
- Event status
- Event information
- Event actions

Example events can include:

- Annual Club Meeting
- Volunteer Training
- Community Workshop
- Monthly Review

The current implementation uses sample/static data.

---

## ✅ Attendance Management

The Attendance module provides an interface for tracking member participation.

### Includes

- Total members
- Present members
- Absent members
- Attendance percentage
- Individual attendance information
- Event information
- Attendance status

The current version uses demonstration data and is prepared for future database integration.

---

## 🔐 Authentication

The project includes authentication-related interfaces and Supabase integration foundations.

### Current authentication-related pages

- Registration
- Forgot Password
- Reset Password

The Supabase browser client is located at:

```text
src/lib/supabase/client.js

| Module          | Description                             |
| --------------- | --------------------------------------- |
| Landing Page    | Introduces the ClubOps AI platform      |
| Dashboard       | Provides an overview of club activities |
| Members         | Displays and manages member information |
| Events          | Displays club events                    |
| Attendance      | Provides attendance tracking interface  |
| Registration    | Provides user registration interface    |
| Forgot Password | Provides password recovery interface    |
| Reset Password  | Provides password update interface      |


| Technology                    | Purpose                                    |
| ----------------------------- | ------------------------------------------ |
| Next.js 16.3.5                | Frontend framework and application routing |
| React 19.2.8                  | User interface development                 |
| JavaScript                    | Application programming                    |
| JSX                           | React component development                |
| Supabase                      | Backend and authentication foundation      |
| @supabase/supabase-js         | Supabase client                            |
| @supabase/ssr                 | Supabase integration with Next.js          |
| Tailwind CSS                  | Styling                                    |
| Lucide React                  | Icons                                      |
| Base UI                       | UI primitives                              |
| shadcn                        | UI component tooling                       |
| Google Gemini / @google/genai | AI integration foundation                  |
| ESLint                        | Code quality and linting                   |
| Turbopack                     | Development build tooling                  |


🏗️ Project Architecture

ClubOps AI follows the Next.js App Router architecture.

The high-level application flow is:

                    ClubOps AI
                        │
                        ▼
                 Next.js Application
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
       Landing       Dashboard     Authentication
          │             │             │
          │       ┌─────┼─────┐       │
          │       │     │     │       │
          ▼       ▼     ▼     ▼       ▼
       Features Members Events Attendance
                        │
                        ▼
                    Supabase
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
          Database          Authentication
                        │
                        ▼
                  Future AI Layer
                        │
                        ▼
                    Gemini AI




                    📁 Project Structure



ClubOps-AI/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── attendance/
│   │   │   └── page.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   │
│   │   ├── events/
│   │   │   └── page.jsx
│   │   │
│   │   ├── forgot-password/
│   │   │   └── page.jsx
│   │   │
│   │   ├── members/
│   │   │   └── page.jsx
│   │   │
│   │   ├── register/
│   │   │   └── page.jsx
│   │   │
│   │   ├── reset-password/
│   │   │   └── page.jsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.jsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── Footer.jsx
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
│       │
│       ├── supabase/
│       │   └── client.js
│       │
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

🧭 Application Routes

| Route              | Description               |
| ------------------ | ------------------------- |
| `/`                | Main landing page         |
| `/dashboard`       | Club management dashboard |
| `/members`         | Member management         |
| `/events`          | Event management          |
| `/attendance`      | Attendance management     |
| `/register`        | User registration         |
| `/forgot-password` | Password recovery         |
| `/reset-password`  | Password reset            |


🗄️ Supabase Integration

ClubOps AI uses Supabase as the backend and authentication foundation.

The Supabase client is configured in:

src/lib/supabase/client.js

The application uses:

@supabase/supabase-js
@supabase/ssr

Supabase is intended to provide:

Authentication
Database storage
User management
Member records
Event records
Attendance records
Future real-time data
Row Level Security

The current project contains the Supabase client configuration, while complete database-backed functionality is part of the ongoing development.



🤖 AI Integration

The project name ClubOps AI represents the planned integration of artificial intelligence into college club management.

The project includes the Google Generative AI package:

@google/genai

The planned AI layer can eventually support features such as:

AI Club Assistant
Event planning assistance
Task assistance
Volunteer/member matching
Club activity analysis
Operational recommendations
Document-based assistance
AI-powered analytics
Current Status

AI functionality is currently part of the development roadmap.

The current repository should not be considered to contain a fully implemented AI assistant.




🔑 Environment Variables

Create a .env.local file in the root directory.

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
Example Project Structure
ClubOps-AI/
│
├── .env.local
├── package.json
├── README.md
└── src/
Security Note

Never commit .env.local or private credentials to GitHub.

The project's .gitignore already contains rules for ignoring environment files.



🔄 Development Workflow

The project uses Git and GitHub for version control and collaboration.

A typical workflow is:

Create Branch
     ↓
Develop Feature
     ↓
Test Changes
     ↓
git add
     ↓
git commit
     ↓
git push
     ↓
Create Pull Request
     ↓
Code Review
     ↓
Merge into main
🌿 Git Branch Workflow

Create a new branch:

git checkout -b feature/your-feature

Check the current status:

git status

Stage changes:

git add .

Create a commit:

git commit -m "Add your feature"

Push the branch:

git push origin feature/your-feature

After pushing the branch, create a Pull Request on GitHub for review and merging.

📊 Current Development Status

The project is currently under active development.

✅ Currently Implemented
Landing page
Navigation
Responsive frontend structure
Dashboard interface
Members interface
Events interface
Attendance interface
Registration interface
Forgot password interface
Reset password interface
Supabase client configuration
Reusable UI components
Layout components
Footer
ESLint configuration
Next.js App Router architecture
📦 Current Data Status

The current version contains demonstration/static data in several modules.

Dashboard

Uses sample statistics and activity information.

Members

Uses sample member information.

Events

Uses sample event information.

Attendance

Uses sample attendance information.

Tasks

Uses demonstration task information.

These modules are structured so that they can be connected to Supabase in future development.

🗺️ Future Scope
🔐 Authentication

Future authentication improvements include:

Complete Supabase authentication
Login functionality
User sessions
Logout
User profiles
Role-based access control
Protected routes
👥 Member Management

Future member-management functionality includes:

Add members
Edit members
Delete members
Member profiles
Database-backed member records
Role management
Member search
Member filtering
📅 Event Management

Future event-management functionality includes:

Create events
Edit events
Delete events
Event registration
Event reminders
Event attendance
Event analytics
✅ Attendance

Future attendance functionality includes:

Real-time attendance recording
Attendance history
Attendance analytics
Member attendance reports
Event-wise attendance
Exportable reports
📋 Task Management

Future task functionality includes:

Create tasks
Assign tasks
Task deadlines
Task priorities
Task status
Task tracking
Task notifications
🤖 Artificial Intelligence

Future AI functionality may include:

AI club assistant
AI event planning
AI task assistance
Volunteer matching
Member recommendations
Operational recommendations
AI-powered reports
AI analytics
Document-based AI assistance
📊 Administration and Analytics

Future administrative features may include:

Club performance analytics
Reports
Announcements
Document management
Budget management
Financial tracking
Advanced dashboards
Role-based permissions
⚠️ Current Limitations

ClubOps AI is currently a development/prototype version.

The following limitations currently exist:

Several modules use static/demo data.
Complete Supabase database integration is still under development.
Complete authentication is still under development.
Login functionality is not yet fully implemented.
AI assistant functionality is planned rather than fully implemented.
Some dashboard actions represent planned functionality.
Complete role-based access control is not yet implemented.
Real-time club operations are part of future development.

These limitations reflect the current stage of development and are expected to be addressed in future iterations.

🔒 Security

Security is considered an important part of the project architecture.

The project uses environment variables for Supabase configuration.

Sensitive values should be stored in:

.env.local

and should never be committed to the repository.

The .gitignore file includes environment-file patterns such as:

.env*
.env
.env.local
.env.*.local

Future backend development will include:

Supabase Row Level Security
Protected routes
Authentication-based access
Role-based permissions
Secure database operations
🧪 Testing and Validation

The project can be validated during development using:

npm run dev

and:

npm run lint

Production builds can be checked using:

npm run build

The project is continuously being developed and tested as new modules are added.

👥 Team Collaboration

ClubOps AI is being developed as a collaborative project using GitHub.

GitHub provides:

Version control
Branch management
Pull Requests
Code review
Collaboration
Project history

Each team member can work on a separate branch and submit their changes through a Pull Request.

📌 Project Information
Information	Details
Project Name	ClubOps AI
Project Type	Web Application
Domain	College Club Management
Frontend	Next.js + React
Backend Foundation	Supabase
AI Foundation	Google Gemini
Programming Language	JavaScript
Styling	Tailwind CSS + CSS
Version Control	Git + GitHub
Architecture	Next.js App Router
Development Status	Active Development
🎯 Project Goal

The long-term goal of ClubOps AI is to provide a centralized and intelligent platform for managing college club operations.

The intended workflow is:

                ┌───────────────┐
                │ Club Members  │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │     Events    │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │     Tasks     │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │  Attendance   │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │   Analytics   │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ AI Assistance │
                └───────────────┘

The final vision is to combine these operations into one centralized platform that helps college clubs manage their activities more efficiently.

📚 Learning and Academic Context

ClubOps AI is being developed as a student software project with the objective of applying concepts such as:

Web development
React development
Next.js
Component-based architecture
Database integration
Authentication
Git and GitHub
API integration
Cloud deployment
Artificial intelligence
User interface design
Software project collaboration

The project provides practical experience in developing and maintaining a modern full-stack web application.

📁 Important Configuration Files
File	Purpose
package.json	Project dependencies and scripts
next.config.mjs	Next.js configuration
jsconfig.json	JavaScript path aliases
eslint.config.mjs	ESLint configuration
postcss.config.mjs	PostCSS configuration
.gitignore	Files excluded from Git
src/app/layout.js	Root application layout
src/app/globals.css	Global styling
src/lib/supabase/client.js	Supabase browser client
README.md	Project documentation
🌐 Repository

GitHub Repository:

https://github.com/bangoriyabhavya151107/ClubOps-AI

📄 License

This project is currently developed as a student/academic project.

No specific open-source license has been assigned at this stage.

🚀 ClubOps AI

AI-Powered College Club Management Platform

Organize. Manage. Collaborate. Improve.
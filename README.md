⚡ ClubOps AI Platform
AI-Powered Operations & Event Management Engine for Sports Clubs & Organizations
ClubOps AI is a full-featured management dashboard designed to automate club operations, event planning, volunteer assignments, budget analytics, and risk assessments using Generative AI (powered by Gemini) and dynamic backend integrations (Supabase / Node.js).
🚀 Key Features
🎭 Role-Based Access Control (RBAC): Distinct dashboards and features tailored for Admin, Coordinator, and Volunteer roles.
🤖 AI Command Center: Perform operational tasks (task creation, schedule adjustments, risk audits) using natural language prompts.
📅 AI Event Planner & Readiness: Generates structured event breakdown structures (tasks, priorities, budgets, risk flags) and calculates live readiness metrics based on real database entries.
📋 Dynamic Kanban Task Management: Drag-and-and-drop workflow status tracker (To Do, In Progress, Review, Completed) with automated volunteer assignments.
🎙️ Meeting Transcript Analyzer: Extracts actionable decisions, summarizes key discussions, and generates real tasks directly from uploaded meeting logs or audio transcripts.
🤝 AI Volunteer Matcher: Recommends optimal volunteer placement based on skill tags, workload saturation, and scheduling availability.
🛡️ Autonomous Risk Audit & "What Am I Missing?": Real-time analysis of missing venue approvals, unbalanced budgets, unassigned high-priority tasks, or missing emergency contacts.
📑 RAG Document Knowledge Base: Query internal PDFs, policy guidelines, and event archives via semantic AI search.
📊 Financial Budget Tracker: Automated expense distribution breakdowns and remaining budget warnings.
🛡️ Role-Based Access Matrix
Feature Module
Admin
Coordinator
Volunteer
All Users Management
✅
❌
❌
Global Role Configuration
✅
❌
❌
Event Planning & Creation
✅
✅
View Only
Task Assignment & Kanban
✅
✅
Assigned Tasks
Volunteer Roster Management
✅
✅
Own Profile
Meetings & AI Minutes
✅
✅
Relevant Meetings
Budget & Expense Logs
✅
✅
Limited View
AI Command Center
Full Access
Full Access
Task Assistant

🛠️ Tech Stack & Architecture
Frontend: HTML5, Modern CSS (Custom Glassmorphism Design System), Tailwind CSS, FontAwesome Icons.
AI Engine: Google Gemini API (Natural Language Understanding, Intent Extraction, Summarization, and RAG).
Database & Auth: Supabase (PostgreSQL, Row Level Security, Auth Session Management).
Backend Runtime: Node.js / Express API gateway.
📦 Project Setup & Installation
Prerequisites
Node.js (v18.0.0 or higher)
Supabase Account & Database Project
Gemini API Key
Local Setup Steps
Clone the repository:
git clone https://github.com/your-org/clubops-ai.git
cd clubops-ai


Install Dependencies:
npm install


Configure Environment Variables:
Create a .env file in the root directory:
PORT=5000
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key


Database Setup:
Run the schema migration scripts in your Supabase SQL Editor:
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT CHECK (role IN ('ADMIN', 'COORDINATOR', 'VOLUNTEER')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;


Run the Application:
# Development Mode
npm run dev

# Production Build
npm run build
npm start


🧪 Recommended Demo Workflow
Launch UI: Open index.html in your browser or start the local dev server.
Switch Roles: Use the top header dropdown to test UI view switches between Admin, Coordinator, and Volunteer.
AI Planning: Navigate to the Events tab and click "🤖 Plan Event with AI" to generate a complete event strategy.
Run Risk Audit: Click "🔍 What Am I Missing?" in the AI Command Center to run automated checks against missing vendor contracts and unassigned deadlines.
Meeting Automation: Paste a meeting transcript into the Meetings tab and click "Analyze & Extract Tasks" to auto-generate tasks.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.


more stuff coming sooon 
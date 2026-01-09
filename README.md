# PrepBuddyAi - AI Interview Practice

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</div>

<br />

<div align="center">
  <h1>🎯 PrepBuddyAi</h1>
  <p><strong>Ace your next interview with AI-powered mock interviews and real-time feedback</strong></p>
  
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#-user-flow">User Flow</a>
</div>

<br />

---

## ✨ Overview

**PrepBuddyAi** is a modern, AI-powered interview practice platform designed to help job seekers prepare effectively. By analyzing your resume and target role, our AI interviewer generates personalized questions, listens to your responses (via voice or text), and provides detailed, actionable feedback.

Whether you're preparing for technical, behavioral, or HR interviews, PrepBuddyAi offers a realistic environment to build confidence and improve your skills.

---

## 🚀 Features

### 🔐 Secure Authentication
- **Full Auth Suite**: Email/Password signup and login powered by Supabase Auth.
- **Duplicate Prevention**: Smart detection of existing accounts with user-friendly redirection.
- **Security Check**: Secure password reset flow using PKCE and email verification.
- **Session Management**: Persistent sessions with protected routes.

### 🎤 AI-Powered Interviews
- **Smart Configuration**: Upload your resume (PDF) and select your target job role.
- **Voice & Text**: Answer using spoken audio (STT) or typing.
- **Dynamic Questions**: AI adapts questions based on your resume and previous answers.
- **Real-time Interaction**: Realistic TTS (Text-to-Speech) for the AI interviewer.

### 📊 Feedback & Analytics
- **Instant Result**: Get a detailed score (0-100) immediately after the session.
- **Deep Dive**: Analysis of strengths, weaknesses, and improvement areas.
- **Progress Tracking**: Dashboard with charts to visualize your growth over time.
- **PDF Export**: Download comprehensive reports for offline review.

### 💳 Subscription & Payments
- **Free Tier**: Start with free mock interviews to test the platform.
- **Pro Upgrade**: Unlock unlimited interviews and advanced analytics.
- **Secure Payments**: Integrated with Razorpay for seamless transactions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **UI Components**: Radix UI, Lucide Icons, Sonner (Toasts)

### Backend & Infrastructure
- **BaaS**: Supabase (PostgreSQL Database, Authentication, Storage)
- **AI Model**: Google Gemini 2.0 Flash (via Google AI Studio)
- **Payments**: Razorpay

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase Account
- Google AI API Key
- Razorpay Account (Test Mode)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/nakulbhagwandafale/prepify.git
    cd prepify
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add the following keys:
    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

    # Google AI
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

    # Razorpay
    NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_secret
    ```

4.  **Database Setup**
    Run the SQL migrations in your Supabase SQL Editor.
    *   Enable **Database Webhooks** if required.
    *   Create `interviews` table (schema provided in `supabase/migrations`).
    *   Create `check_email_exists` RPC function for secure signup.

5.  **Run the application**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ User Flow

1.  **Landing Page**: Explore features, pricing, and success stories.
2.  **Auth**: Sign up or Login.
    *   *Note*: "Sign In" button on Home is disabled if you are already logged in.
3.  **Dashboard**: View your interview history and performance stats.
4.  **Interview Setup**:
    *   Upload Resume (PDF).
    *   Choose Difficulty (Easy/Medium/Hard).
    *   Select Tech Stack/Topic.
5.  **Active Interview**:
    *   AI asks a question.
    *   You answer (Voice/Text).
    *   Repeat for 5-10 questions.
6.  **Results**: View detailed breakdown, score, and download PDF.

---

## 📁 Project Structure

```bash
preply/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes (Auth, Interview, Payment)
│   ├── context/          # React Context (Auth, Subscription)
│   ├── dashboard/        # User Dashboard
│   ├── interview-setup/  # Config Flow
│   ├── active-interview/ # Live Session
│   ├── result-page/      # Results & Feedback
│   └── (auth)/           # Login, Signup, Forgot Password
├── components/           # Reusable UI Components
│   ├── ui/               # Shadcn/Radix Primitives
│   └── ...
├── lib/                  # Utilities & Clients (Supabase, Gemini)
├── public/               # Static Assets
└── supabase/             # Migrations & SQL
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  Made with ❤️ by <b>Nakul Dafale</b>
</div>

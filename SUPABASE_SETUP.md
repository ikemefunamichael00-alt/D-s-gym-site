# Supabase & Vercel Setup Guide — D's Gym

This guide walks you through connecting your **Supabase** backend and deploying to **Vercel**.

---

## Part 1: Setting up Supabase (Authentication & Database)

### 1. Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and log in or sign up.
2. Click **"New project"**.
3. Set:
   - **Name**: `Ds-Gym`
   - **Database Password**: Choose a strong password.
   - **Region**: Choose the closest region to your members.
4. Click **"Create new project"** (takes ~1-2 minutes to initialize).

---

### 2. Run the Database Schema
1. In your Supabase project dashboard, navigate to the **SQL Editor** (the terminal/code icon in the left sidebar).
2. Click **"+ New query"**.
3. Open the file `supabase/schema.sql` from this repository and copy all its contents.
4. Paste the SQL into the Supabase editor and click **"Run"**.
5. This automatically creates:
   - `profiles` table (linked to `auth.users`, storing height in cm, target weight in kg, reminder preferences)
   - `weight_logs` table (stores weigh-ins, calculated BMI, and category)
   - `daily_checkins` table (stores daily workout, hydration in liters, energy levels, notes)
   - **Row Level Security (RLS)** policies so each member's biometric data is completely private.
   - An automated trigger `on_auth_user_created` to initialize new member profiles upon sign-up.

---

### 3. Connect Keys to Your App
1. In your Supabase dashboard, go to **Project Settings** (gear icon) -> **API**.
2. Find:
   - **Project URL**
   - **Project API keys** -> `anon public`
3. In the root of this project, create or open `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

---

## Part 2: Hosting on Vercel

1. Push this repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of D's Gym website"
   git branch -M main
   git remote add origin https://github.com/your-username/ds-gym-tracker.git
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** -> **"Project"**.
4. Import your `ds-gym-tracker` repository.
5. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase Anon key
6. Click **"Deploy"**. Vercel will build and assign you a global high-speed live URL (e.g. `https://ds-gym-tracker.vercel.app`)!

---

## Features Implemented & Working:
- ✅ **Dark Athletic Neon Aesthetics** (Tailwind CSS, high-energy neon lime accents).
- ✅ **Interactive WHO Metric BMI Calculator** (Supports height in cm and weight in kg with real-time status pointer).
- ✅ **Personalized Kilogram Advisory** (Calculates the exact kg advised to lose or gain to achieve healthy normal BMI range).
- ✅ **Goal Tracker & Progress Rings** (Calculates % accomplished, kg remaining, and estimated weeks to target weight).
- ✅ **Interactive Weight Loss Curve Chart** (SVG line & area visualization with goal reference line).
- ✅ **Daily Check-In Modal** (Log daily workout, type, water intake in liters, energy rating 1-5, and reflections).
- ✅ **Daily Reminders & Notifications** (Custom morning reminder time picker and browser push notification trigger).
- ✅ **Supabase Auth & Database Schema** (Full RLS security, profile creation triggers, and zero-leak privacy).

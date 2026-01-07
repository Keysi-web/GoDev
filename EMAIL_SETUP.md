# GoDev Careers Email & Database Setup Guide

## Overview
The careers page uses **Supabase** for storing applications and **Mailtrap** for email notifications.

---

## 1. Supabase Setup (Database & File Storage)

### Create Account & Project
1. Go to [supabase.com](https://supabase.com/)
2. Sign up for a free account
3. Create a new project

### Get API Keys
1. Go to **Settings → API**
2. Copy your **Project URL** and **anon public** key

### Create Database Table
Go to **SQL Editor** and run:

```sql
-- Career applications table
CREATE TABLE career_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  applicant_type TEXT NOT NULL,
  experience TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  cv_file_url TEXT,
  cv_file_name TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for application form)
CREATE POLICY "Allow public inserts" ON career_applications
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated reads (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON career_applications
  FOR SELECT TO authenticated
  USING (true);
```

### Create Storage Bucket
1. Go to **Storage** in Supabase dashboard
2. Click **New Bucket**
3. Name it `career-cvs`
4. Enable **Public bucket** for easy CV access

---

## 2. Mailtrap Setup (Email Notifications)

### Free Tier
- 1,000 emails/month
- 100 emails/day limit
- Perfect for career applications

### Setup Steps
1. Go to [mailtrap.io](https://mailtrap.io/)
2. Sign up for free
3. Go to **Sending Domains** → Add your domain (or use sandbox for testing)
4. Go to **API Tokens** → Create new token
5. Copy the API token

---

## 3. Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Mailtrap
MAILTRAP_API_TOKEN=your-api-token
MAILTRAP_SENDER_EMAIL=careers@yourdomain.com
HR_NOTIFICATION_EMAIL=hr@yourdomain.com
```

---

## 4. How It Works

When a candidate submits an application:
1. ✅ CV file uploads to Supabase Storage
2. ✅ Application data saves to `career_applications` table
3. ✅ HR receives email notification via Mailtrap
4. ✅ Candidate sees success message

---

## 5. Testing

1. Start dev server: `npm run dev`
2. Go to `http://localhost:3000/careers`
3. Submit a test application
4. Check:
   - Supabase dashboard → Table Editor → `career_applications`
   - Supabase Storage → `career-cvs` bucket
   - Mailtrap inbox for notification email

---

## Production Notes

- For production emails, verify your domain in Mailtrap
- Consider adding email confirmation to applicants
- Add rate limiting to prevent spam submissions
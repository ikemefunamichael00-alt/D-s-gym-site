-- ================================================================
-- D'S GYM & HEALTH TRACKER - SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- ================================================================

-- 1. Profiles Table (Extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  height_cm numeric(5,1) not null default 175.0,
  target_weight_kg numeric(5,1) not null default 70.0,
  gender text check (gender in ('male', 'female', 'other', 'unspecified')) default 'unspecified',
  birth_date date,
  daily_reminder_time time default '08:00:00',
  reminders_enabled boolean default true,
  membership_tier text default 'Standard Member',
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Weight Logs Table (Tracks daily weigh-ins and historical progress)
create table if not exists public.weight_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  weight_kg numeric(5,2) not null,
  bmi numeric(4,2) not null,
  category text not null, -- 'Underweight', 'Normal', 'Overweight', 'Obese'
  notes text,
  logged_date date not null default current_date,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id, logged_date)
);

-- 3. Daily Check-ins Table (Habits, Workouts, Water, Reminders)
create table if not exists public.daily_checkins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  checkin_date date not null default current_date,
  workout_completed boolean default false,
  workout_type text, -- 'Cardio', 'Strength', 'HIIT', 'Yoga', 'Rest Day'
  workout_duration_min int default 0,
  water_liters numeric(3,1) default 0.0,
  energy_rating int check (energy_rating between 1 and 5) default 3,
  diet_followed boolean default true,
  notes text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id, checkin_date)
);

-- 4. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.weight_logs enable row level security;
alter table public.daily_checkins enable row level security;

-- 5. RLS Policies (Complete Data Isolation per User)
-- Profiles
create policy "Users can view own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can insert own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- Weight Logs
create policy "Users can read own weight logs" 
  on public.weight_logs for select 
  using (auth.uid() = user_id);

create policy "Users can insert own weight logs" 
  on public.weight_logs for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own weight logs" 
  on public.weight_logs for update 
  using (auth.uid() = user_id);

create policy "Users can delete own weight logs" 
  on public.weight_logs for delete 
  using (auth.uid() = user_id);

-- Daily Checkins
create policy "Users can read own checkins" 
  on public.daily_checkins for select 
  using (auth.uid() = user_id);

create policy "Users can insert/update own checkins" 
  on public.daily_checkins for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own checkins" 
  on public.daily_checkins for update 
  using (auth.uid() = user_id);

-- 6. Trigger to automatically create a profile on user sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, height_cm, target_weight_kg)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'height_cm')::numeric, 175.0),
    coalesce((new.raw_user_meta_data->>'target_weight_kg')::numeric, 70.0)
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

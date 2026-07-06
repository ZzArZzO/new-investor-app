-- New Investor — accounts + progress schema (Supabase / Postgres)
--
-- Run this once in your Supabase project's SQL Editor after creating the
-- project. Supabase already provides `auth.users` (email, password/OTP,
-- sessions) — this file only adds the two tables the app actually reads
-- and writes: a minimal profile row per user, and per-lesson completion.
--
-- Everything is locked down with Row Level Security so a signed-in user
-- can only ever see or modify their own rows — the anon key shipped to
-- the browser (lessons/config.js) is safe to expose because of these
-- policies, the same way Firebase/Supabase public config always is.

-- ---------- profiles ----------
-- One row per authenticated user. Minimal on purpose: extend with more
-- columns (e.g. quiz archetype) only once something actually writes to them.
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up, so the app never
-- has to special-case "first login vs. returning user" for this table.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- lesson_progress ----------
-- One row per (user, lesson) marking that lesson complete. Lesson ids are
-- the plain integers from lessons/lessons-data.js (1-9 core, 10-12 bonus).
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users on delete cascade,
  lesson_id int not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users can view own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own progress"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);

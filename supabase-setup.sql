-- Run this in your Supabase SQL Editor
create table profiles (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  linkedin text,
  facebook text,
  instagram text,
  twitter text,
  youtube text,
  tiktok text,
  email text,
  phone text,
  whatsapp text,
  website text,
  created_at timestamptz default now()
);

-- Allow anyone to insert and read (public profiles)
alter table profiles enable row level security;

create policy "Anyone can create a profile"
  on profiles for insert
  with check (true);

create policy "Anyone can view profiles"
  on profiles for select
  using (true);

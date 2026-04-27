-- Run this in Supabase → SQL Editor

create table applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  country text not null,
  tiktok_handle text not null,
  additional_links text,
  content_type text not null,
  why_us text not null,
  skills text,
  followers text not null,
  monthly_views text,
  content_files text[]
);

-- Allow anyone to insert (form submissions from the website)
alter table applications enable row level security;

create policy "allow_public_insert"
  on applications for insert
  to anon
  with check (true);

-- Only authenticated users (you) can read
create policy "allow_authenticated_select"
  on applications for select
  to authenticated
  using (true);

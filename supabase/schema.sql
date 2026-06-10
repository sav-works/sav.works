-- sav.works Base Schema
-- Run this in Supabase SQL Editor to set up the initial tables

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Contact form submissions
create table if not exists contacts (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false
);

-- Enable Row Level Security
alter table contacts enable row level security;

-- Only authenticated users can read contacts
create policy "Only authenticated users can view contacts"
  on contacts for select
  to authenticated
  using (true);

-- Anyone can insert a contact message (public form)
create policy "Anyone can submit contact"
  on contacts for insert
  to anon
  with check (true);

-- Projects / work tracking
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  title text not null,
  description text not null default '',
  status text not null default 'planned' check (status in ('planned', 'active', 'paused', 'completed')),
  tags text[] not null default '{}'
);

alter table projects enable row level security;

create policy "Public can view projects"
  on projects for select
  to anon
  using (true);

create policy "Authenticated can manage projects"
  on projects for all
  to authenticated
  using (true);

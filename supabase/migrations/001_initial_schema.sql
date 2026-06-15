-- Enable pgvector
create extension if not exists vector;

-- Profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  plan text not null default 'free',
  credits integer not null default 10,
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

-- Generated images
create table generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  prompt text not null,
  style text default 'photorealistic',
  image_urls text[] not null default '{}',
  replicate_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Credits ledger
create table credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  balance integer not null default 10,
  updated_at timestamptz not null default now()
);

-- RLS
alter table profiles enable row level security;
alter table generations enable row level security;
alter table credits enable row level security;

create policy "Users read own profile" on profiles for select using (auth.uid() = id);
create policy "Users read own generations" on generations for select using (auth.uid() = user_id);
create policy "Users insert own generations" on generations for insert with check (auth.uid() = user_id);
create policy "Users read own credits" on credits for select using (auth.uid() = user_id);

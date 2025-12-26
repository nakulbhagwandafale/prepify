-- Create interviews table
create table public.interviews (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  category text not null,
  difficulty text not null,
  score integer not null,
  feedback text,
  json_report jsonb,
  
  constraint interviews_pkey primary key (id)
);

-- Enable RLS
alter table public.interviews enable row level security;

-- Create policies
create policy "Users can view their own interviews"
on public.interviews for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own interviews"
on public.interviews for insert
to authenticated
with check (auth.uid() = user_id);

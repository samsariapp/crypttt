-- Create users table
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  wallet_address text unique,
  email text unique,
  total_wagered decimal default 0,
  total_won decimal default 0,
  games_played integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create game_history table
create table if not exists public.game_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  game_name text not null,
  bet_amount decimal not null,
  payout decimal not null,
  result text not null,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create deposits table
create table if not exists public.deposits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  amount decimal not null,
  tx_hash text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create withdrawals table
create table if not exists public.withdrawals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  amount decimal not null,
  tx_hash text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.game_history enable row level security;
alter table public.deposits enable row level security;
alter table public.withdrawals enable row level security;

-- Create policies for users table
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Anyone can view usernames for leaderboard"
  on public.users for select
  using (true);

-- Create policies for game_history table
create policy "Users can view own game history"
  on public.game_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own game history"
  on public.game_history for insert
  with check (auth.uid() = user_id);

-- Create policies for deposits table
create policy "Users can view own deposits"
  on public.deposits for select
  using (auth.uid() = user_id);

create policy "Users can insert own deposits"
  on public.deposits for insert
  with check (auth.uid() = user_id);

-- Create policies for withdrawals table
create policy "Users can view own withdrawals"
  on public.withdrawals for select
  using (auth.uid() = user_id);

create policy "Users can insert own withdrawals"
  on public.withdrawals for insert
  with check (auth.uid() = user_id);

-- Create indexes for better performance
create index if not exists game_history_user_id_idx on public.game_history(user_id);
create index if not exists game_history_timestamp_idx on public.game_history(timestamp desc);
create index if not exists deposits_user_id_idx on public.deposits(user_id);
create index if not exists withdrawals_user_id_idx on public.withdrawals(user_id);

-- Create function to auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger on_users_updated
  before update on public.users
  for each row
  execute procedure public.handle_updated_at();

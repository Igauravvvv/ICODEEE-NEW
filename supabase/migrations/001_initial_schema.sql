create extension if not exists "pgcrypto";

create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  category text not null,
  description text,
  short_description text,
  cover_image text,
  gallery jsonb not null default '[]'::jsonb,
  video text,
  services jsonb not null default '[]'::jsonb,
  technologies jsonb not null default '[]'::jsonb,
  live_url text,
  case_study_content jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  content jsonb not null default '{}'::jsonb,
  icon text,
  "order" integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  website text,
  project_type text,
  budget text,
  message text not null,
  status text not null default 'NEW' check (status in ('NEW','CONTACTED','QUALIFIED','CLOSED','ARCHIVED')),
  created_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text not null,
  cover_image text,
  category text,
  author text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger resources_updated_at before update on public.resources for each row execute function public.set_updated_at();

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select exists(select 1 from public.admin_users where id = auth.uid()); $$;

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.leads enable row level security;
alter table public.resources enable row level security;
alter table public.site_settings enable row level security;

create policy "public reads published projects" on public.projects for select using (published or public.is_admin());
create policy "admins manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "public reads published services" on public.services for select using (published or public.is_admin());
create policy "admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "public reads published resources" on public.resources for select using (published or public.is_admin());
create policy "admins manage resources" on public.resources for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read leads" on public.leads for select using (public.is_admin());
create policy "admins update leads" on public.leads for update using (public.is_admin()) with check (public.is_admin());
create policy "admins manage settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "admins view own records" on public.admin_users for select using (id = auth.uid());

-- Lead insertion happens only through the server-side /api/leads route using SUPABASE_SERVICE_ROLE_KEY.

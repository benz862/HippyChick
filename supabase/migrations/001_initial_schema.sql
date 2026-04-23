-- Hippy Chick Life — initial schema, RLS, and storage buckets
-- Run in Supabase SQL editor or via supabase db push

create extension if not exists "pgcrypto";

-- Profiles (1:1 with auth.users for admins)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  description text,
  category text not null,
  subcategory text,
  media_type text not null default 'image',
  featured boolean not null default false,
  client_name text,
  platform text,
  campaign_date date,
  cover_image_url text,
  video_url text,
  thumbnail_url text,
  external_link text,
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  portfolio_item_id uuid not null references public.portfolio_items (id) on delete cascade,
  url text not null,
  media_type text not null default 'image',
  alt_text text,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body text not null,
  featured_image_url text,
  category text,
  tags text[] default '{}',
  meta_title text,
  meta_description text,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_title text,
  company text,
  avatar_url text,
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text,
  budget_range text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_items_published_idx
  on public.portfolio_items (is_published, sort_order desc);
create index if not exists blog_posts_published_idx
  on public.blog_posts (is_published, published_at desc);

-- updated_at triggers
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists portfolio_items_set_updated_at on public.portfolio_items;
create trigger portfolio_items_set_updated_at
before update on public.portfolio_items
for each row execute function public.set_updated_at();

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.portfolio_media enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

-- Profiles: users read own; admins read all (optional tighten later)
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Portfolio public read published
drop policy if exists "portfolio_items_public_read" on public.portfolio_items;
create policy "portfolio_items_public_read"
  on public.portfolio_items for select
  using (is_published = true);

drop policy if exists "portfolio_items_admin_all" on public.portfolio_items;
create policy "portfolio_items_admin_all"
  on public.portfolio_items for all
  using (public.is_admin())
  with check (public.is_admin());

-- Portfolio media: public can read media for published items
drop policy if exists "portfolio_media_public_read" on public.portfolio_media;
create policy "portfolio_media_public_read"
  on public.portfolio_media for select
  using (
    exists (
      select 1 from public.portfolio_items i
      where i.id = portfolio_media.portfolio_item_id
        and i.is_published = true
    )
  );

drop policy if exists "portfolio_media_admin_all" on public.portfolio_media;
create policy "portfolio_media_admin_all"
  on public.portfolio_media for all
  using (public.is_admin())
  with check (public.is_admin());

-- Blog
drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read"
  on public.blog_posts for select
  using (is_published = true and published_at is not null and published_at <= now());

drop policy if exists "blog_posts_admin_all" on public.blog_posts;
create policy "blog_posts_admin_all"
  on public.blog_posts for all
  using (public.is_admin())
  with check (public.is_admin());

-- Testimonials
drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read"
  on public.testimonials for select
  using (is_published = true);

drop policy if exists "testimonials_admin_all" on public.testimonials;
create policy "testimonials_admin_all"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- Contact: anyone can insert; only admins read
drop policy if exists "contact_inquiries_insert_public" on public.contact_inquiries;
create policy "contact_inquiries_insert_public"
  on public.contact_inquiries for insert
  with check (true);

drop policy if exists "contact_inquiries_admin_read" on public.contact_inquiries;
create policy "contact_inquiries_admin_read"
  on public.contact_inquiries for select
  using (public.is_admin());

drop policy if exists "contact_inquiries_admin_delete" on public.contact_inquiries;
create policy "contact_inquiries_admin_delete"
  on public.contact_inquiries for delete
  using (public.is_admin());

-- Site settings: public read; admin write
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- Storage buckets
insert into storage.buckets (id, name, public)
values
  ('portfolio-images', 'portfolio-images', true),
  ('portfolio-videos', 'portfolio-videos', true),
  ('blog-images', 'blog-images', true),
  ('brand-assets', 'brand-assets', false),
  ('testimonials', 'testimonials', true)
on conflict (id) do nothing;

-- Storage policies (objects)
drop policy if exists "portfolio images public read" on storage.objects;
create policy "portfolio images public read"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

drop policy if exists "portfolio videos public read" on storage.objects;
create policy "portfolio videos public read"
  on storage.objects for select
  using (bucket_id = 'portfolio-videos');

drop policy if exists "blog images public read" on storage.objects;
create policy "blog images public read"
  on storage.objects for select
  using (bucket_id = 'blog-images');

drop policy if exists "testimonials public read" on storage.objects;
create policy "testimonials public read"
  on storage.objects for select
  using (bucket_id = 'testimonials');

drop policy if exists "brand assets admin read" on storage.objects;
create policy "brand assets admin read"
  on storage.objects for select
  using (bucket_id = 'brand-assets' and public.is_admin());

drop policy if exists "storage admin insert" on storage.objects;
create policy "storage admin insert"
  on storage.objects for insert
  with check (public.is_admin());

drop policy if exists "storage admin update" on storage.objects;
create policy "storage admin update"
  on storage.objects for update
  using (public.is_admin());

drop policy if exists "storage admin delete" on storage.objects;
create policy "storage admin delete"
  on storage.objects for delete
  using (public.is_admin());

-- New user → profile (optional; admins created manually with is_admin)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, is_admin)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', false);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

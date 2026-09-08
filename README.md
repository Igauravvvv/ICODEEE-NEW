# iCodeee Studio

A Next.js studio site with Supabase as its CMS/database and Vercel deployment support.

## Local setup

1. Copy `.env.example` to `.env.local` and populate the Supabase values.
2. In Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql`.
3. Create an authenticated Supabase user, then add its `auth.users.id` to `public.admin_users`.
4. Run `npm run dev`.

## Deploy

Import this repository in Vercel, add every `.env.local` value as an environment variable, and set `NEXT_PUBLIC_SITE_URL` to the production URL. Configure the Supabase Auth redirect URL for `/admin/login`.

Contact email delivery is optional at development time; it activates when the Resend variables are set.

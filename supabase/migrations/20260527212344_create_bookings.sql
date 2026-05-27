create table public.bookings (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    city text,
    service text,
    preferred_time text,
    comment text,
    consent boolean not null,
    locale text not null,
    created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

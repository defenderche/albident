create table public.services (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    price_from integer not null,
    price_to integer not null,
    show_on_home boolean not null default false,
    sort_order integer not null default 0,
    name jsonb not null,
    short_description jsonb not null,
    full_description jsonb not null,
    trip jsonb not null,
    stages jsonb not null default '[]'::jsonb,
    sub_procedures jsonb not null default '[]'::jsonb,
    faq jsonb not null default '[]'::jsonb,
    related_doctors text[] not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint services_price_range check (price_to >= price_from)
);

create index services_sort_order_idx on public.services (sort_order);

-- updated_at поддерживается триггером, чтобы не зависеть от приложения
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger services_set_updated_at
    before update on public.services
    for each row
    execute function public.set_updated_at();

alter table public.services enable row level security;

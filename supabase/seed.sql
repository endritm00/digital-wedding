-- Seed data for local development.
-- Run automatically by `supabase db reset`; also safe to run manually.

-- ============================================================
-- Plans
-- ============================================================
insert into public.plans (code, name, base_price_cents, included_sections, sort_order) values
  ('save_the_date', 'Save the Date',  4900,  3,    1),
  ('experience',    'Experience',     9900,  7,    2),
  ('premium',       'Premium',        15900, null, 3)  -- null = unlimited sections
on conflict (code) do update set
  name               = excluded.name,
  base_price_cents   = excluded.base_price_cents,
  included_sections  = excluded.included_sections,
  sort_order         = excluded.sort_order;

-- ============================================================
-- Extras
-- section_overage is the per_unit overage fee referenced by the pricing engine.
-- Its code must match SECTION_OVERAGE_CODE in lib/pricing/index.ts.
-- ============================================================
insert into public.extras (code, name, price_cents, pricing) values
  ('opening_video',       'Animated Opening Video',  2900, 'per_invite'),
  ('custom_music',        'Custom Background Music', 1900, 'per_invite'),
  ('custom_illustration', 'Custom Illustration',     4900, 'per_invite'),
  ('section_overage',     'Additional Section',       900, 'per_unit')
on conflict (code) do update set
  name        = excluded.name,
  price_cents = excluded.price_cents,
  pricing     = excluded.pricing;

-- ============================================================
-- Themes (one sample to unblock builder development)
-- ============================================================
insert into public.themes (slug, name, category, status, config, sort_order) values
  (
    'ivory-botanica',
    'Ivory Botanica',
    'wedding',
    'active',
    '{
      "palette": {
        "primary":    "#f5f0e8",
        "accent":     "#8b7355",
        "text":       "#2c2c2c",
        "background": "#fdfaf5"
      },
      "fonts": {
        "heading": "Cormorant Garamond",
        "body":    "Inter"
      },
      "allowed_sections": [
        "opening", "story", "schedule", "venue", "rsvp",
        "gallery", "travel", "gifts", "countdown", "dress_code"
      ],
      "default_sections": ["opening", "story", "schedule", "venue", "rsvp"]
    }',
    1
  )
on conflict (slug) do update set
  name       = excluded.name,
  status     = excluded.status,
  config     = excluded.config,
  sort_order = excluded.sort_order;

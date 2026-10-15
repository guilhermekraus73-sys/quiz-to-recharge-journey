# Project rules
- Keep Brazilian funnel pages under `/br` and their presentation components isolated from the Spanish funnel so localization does not alter existing offers or navigation.
- Brazilian pages reuse the existing tracking helpers and Shopify cart-attribute handoff so tracking behavior remains consistent between languages.
- Spanish funnel keeps Shopify checkout; Brazilian funnel no longer uses Shopify.
- Seasonal Brazilian visuals live in a presentation-only wrapper under components/br and scoped CSS so payment, tracking, and Spanish pages stay unchanged.
- Spanish seasonal visuals use a separate presentation-only wrapper and es-halloween-scoped styling on main funnel routes; never change checkout handoff or tracking to apply a theme.

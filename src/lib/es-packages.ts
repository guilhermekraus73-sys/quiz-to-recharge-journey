import { frPackages, formatEUR, buildFrenchCheckoutUrl } from "@/lib/fr-packages";

const esBadges = [
  "MEJOR VALOR",
  "MÁS POPULAR",
  "MEJOR OFERTA",
  "MÁXIMO BENEFICIO",
  "SUPER PACK",
  "MEGA PACK",
] as const;

export const esPackages = frPackages.map((pkg, i) => ({
  diamonds: pkg.diamonds,
  bonus: pkg.bonus,
  cents: pkg.cents,
  badge: esBadges[i],
  variant: pkg.variant,
}));

export { formatEUR };
export const buildSpainCheckoutUrl = buildFrenchCheckoutUrl;

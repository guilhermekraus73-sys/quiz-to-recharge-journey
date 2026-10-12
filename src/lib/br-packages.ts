// Brazilian PIX packages. Prices are charged server-side from this list.
export const brPackages = [
  { diamonds: "5.600", bonus: "1.200", badge: "MELHOR VALOR", cents: 3700 },
  { diamonds: "11.200", bonus: "2.240", badge: "MAIS POPULAR", cents: 5700 },
  { diamonds: "22.400", bonus: "4.480", badge: "MELHOR OFERTA", cents: 7700 },
  { diamonds: "29.500", bonus: "5.900", badge: "MÁXIMO BENEFÍCIO", cents: 9700 },
  { diamonds: "39.200", bonus: "7.840", badge: "SUPER PACOTE", cents: 11700 },
  { diamonds: "56.000", bonus: "11.200", badge: "MEGA PACOTE", cents: 13700 },
] as const;

export const formatBRL = (cents: number) =>
  "R$" + (cents / 100).toFixed(2).replace(".", ",");

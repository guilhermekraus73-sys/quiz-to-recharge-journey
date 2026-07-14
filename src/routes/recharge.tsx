import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import GarenaHeader from "@/components/GarenaHeader";
import LiveViewersBadge from "@/components/LiveViewersBadge";
import SocialProofToasts from "@/components/SocialProofToasts";
import diamondIcon from "@/assets/diamond-icon.png";
import cubeIcon from "@/assets/cube-icon.png";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

const packages = [
  { diamonds: "5.600", cubes: 1, price: "$ 170.00 MXN", bonus: "1.120", badge: "MEJOR VALOR", badgeGradient: "from-violet-500 to-fuchsia-500", checkoutUrl: "https://qhqaey-1b.myshopify.com/cart/57366690922840:1?channel=buy_button" },
  { diamonds: "11.200", cubes: 2, price: "$ 290.00 MXN", bonus: "2.240", badge: "MÁS POPULAR", badgeGradient: "from-orange-500 to-pink-500", checkoutUrl: "https://qhqaey-1b.myshopify.com/cart/57366690988376:1?channel=buy_button" },
  { diamonds: "22.400", cubes: 4, price: "$ 340.00 MXN", bonus: "4.480", badge: "MEJOR OFERTA", badgeGradient: "from-violet-500 to-fuchsia-500", checkoutUrl: "https://qhqaey-1b.myshopify.com/cart/57366691021144:1?channel=buy_button" },
  { diamonds: "29.500", cubes: 6, price: "$ 440.00 MXN", bonus: "5.900", badge: "MÁXIMO BENEFICIO", badgeGradient: "from-violet-500 to-fuchsia-500", checkoutUrl: "https://qhqaey-1b.myshopify.com/cart/57366691053912:1?channel=buy_button" },
];

export const Route = createFileRoute("/recharge")({
  head: () => ({
    meta: [
      { title: "Recarga de Diamantes — Free Fire" },
      { name: "description", content: "Selecciona tu paquete de diamantes con bono especial desbloqueado." },
    ],
  }),
  component: RechargePage,
});

function RechargePage() {
  useFunnelTracking("recharge");
  const [selectedPkg, setSelectedPkg] = useState(0);
  const navigate = useNavigate();

  const preserveSearch = () =>
    typeof window !== "undefined" && window.location.search
      ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
      : undefined;

  return (
    <div className="min-h-screen gamer-bg">
      <main className="container py-4 sm:py-6 md:py-10">
        <div className="max-w-lg mx-auto">
          <GarenaHeader />

          <LiveViewersBadge className="mb-3 sm:mb-4" />

          <div className="bg-card rounded-2xl shadow-lg p-4 sm:p-6 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                1
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Cuenta</h2>
            </div>

            <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 sm:p-4 border border-border">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm sm:text-base">Jugador identificado</p>
                <p className="text-success text-xs sm:text-sm font-medium">Desbloqueado 65% de descuento</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-4 sm:p-6 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                2
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Valor de Recarga (Diamantes + Cubos Mágicos)</h2>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              {packages.map((pkg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPkg(i)}
                  className={`relative rounded-2xl border-2 overflow-hidden text-center transition-all bg-card ${
                    selectedPkg === i
                      ? "border-primary shadow-[0_0_24px_rgba(255,122,20,0.35)] scale-[1.02]"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`bg-gradient-to-r ${pkg.badgeGradient} text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-1.5 sm:py-2`}>
                    {pkg.badge}
                  </div>
                  <div className="p-2 sm:p-3">
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-1">
                      <img src={diamondIcon} alt="" className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
                      <span className="font-display font-bold text-foreground text-base sm:text-lg leading-none">{pkg.diamonds}</span>
                      <span className="text-muted-foreground font-medium text-sm">+</span>
                      <img src={cubeIcon} alt="" className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
                      <span className="font-display font-bold text-foreground text-base sm:text-lg leading-none">{pkg.cubes}</span>
                    </div>
                    <p className="text-violet-400 font-medium text-[10px] sm:text-xs">
                      {pkg.cubes === 1 ? "Cubo Mágico" : "Cubos Mágicos"}
                    </p>
                    <div className="w-12 h-px bg-border mx-auto my-2 sm:my-2.5" />
                    <p className="font-display text-primary font-extrabold text-2xl sm:text-3xl tracking-tight drop-shadow-[0_0_8px_rgba(255,122,20,0.4)]">{pkg.price}</p>
                    <div className="mt-2 sm:mt-3 bg-primary/10 border border-primary/30 rounded-lg py-1.5 px-2">
                      <p className="text-primary text-[10px] sm:text-xs font-semibold">+ {pkg.bonus} Diamantes bonus</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center mb-2 leading-relaxed">
              Tus créditos se acreditarán a tu cuenta de juego tan pronto como recibamos la confirmación del pago. Además de los diamantes de bonificación, también recibirás una bonificación del 20% en los artículos del juego.
            </p>
            <p className="text-xs text-primary text-center font-medium">
              ¡El importe de la recarga se convertirá automáticamente a tu moneda local!
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = packages[selectedPkg].checkoutUrl;
            }}
            className="go-to-checkout w-full font-display uppercase tracking-widest text-base sm:text-lg font-bold py-4 sm:py-5 px-6 rounded-xl bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-[0_8px_30px_rgba(255,122,20,0.4)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 animate-pulse-glow"
          >
            Continuar →
          </button>
        </div>
      </main>
      <SocialProofToasts />
    </div>
  );
}

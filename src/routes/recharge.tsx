import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import GarenaHeader from "@/components/GarenaHeader";
import LiveViewersBadge from "@/components/LiveViewersBadge";
import SocialProofToasts from "@/components/SocialProofToasts";
import diamondIcon from "@/assets/diamond-icon.png";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

const packages = [
  { diamonds: "5,600", price: "US$ 9.00", bonus: "1,120" },
  { diamonds: "11,200", price: "US$ 15.90", bonus: "2,240" },
  { diamonds: "22,400", price: "US$ 19.00", bonus: "4,480" },
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
    <div className="min-h-screen bg-[#f0f2f5]">
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
              <h2 className="text-base sm:text-lg font-bold text-foreground">Valor de Recarga</h2>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              {packages.map((pkg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPkg(i)}
                  className={`rounded-xl border-2 px-2 py-3 sm:p-4 text-center transition-all ${
                    selectedPkg === i
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <img src={diamondIcon} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-bold text-foreground text-xs sm:text-sm leading-none">{pkg.diamonds}</span>
                  </div>
                  <p className="text-primary font-bold text-xs sm:text-sm">{pkg.price}</p>
                  <p className="text-success text-[10px] sm:text-xs mt-1">+ Bonus</p>
                  <p className="text-success text-[10px] sm:text-xs font-bold">{pkg.bonus}</p>
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
            onClick={() =>
              navigate({
                to: "/checkout/$planId",
                params: { planId: String(selectedPkg + 1) },
                search: preserveSearch(),
              })
            }
            className="go-to-checkout w-full text-base sm:text-lg font-semibold py-3.5 sm:py-4 px-6 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110 transition-all duration-200"
          >
            Continuar
          </button>
        </div>
      </main>
      <SocialProofToasts />
    </div>
  );
}

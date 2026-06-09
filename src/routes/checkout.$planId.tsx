import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Sparkles, Clock } from "lucide-react";
import GarenaHeader from "@/components/GarenaHeader";
import LiveViewersBadge from "@/components/LiveViewersBadge";
import SocialProofToasts from "@/components/SocialProofToasts";
import diamondIcon from "@/assets/diamond-icon.png";

const plans = [
  { id: "1", diamonds: "5,600", bonus: "1,120", total: "6,720", price: "9.00" },
  { id: "2", diamonds: "11,200", bonus: "2,240", total: "13,440", price: "15.90" },
  { id: "3", diamonds: "22,400", bonus: "4,480", total: "26,880", price: "19.00" },
];

export const Route = createFileRoute("/checkout/$planId")({
  head: () => ({
    meta: [
      { title: "Checkout — Free Fire" },
      { name: "description", content: "Completa tu recarga de diamantes Free Fire." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { planId } = Route.useParams();
  const navigate = useNavigate();
  const plan = plans.find((p) => p.id === planId) ?? plans[0];

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitting(true);
    setTimeout(() => navigate({ to: "/checkout-success" }), 900);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <main className="container py-6 md:py-10">
        <div className="max-w-lg mx-auto">
          <GarenaHeader />

          <LiveViewersBadge className="mb-4" />

          <div className="bg-card rounded-2xl shadow-lg p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Resumen del pedido</h2>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-foreground">
                  <img src={diamondIcon} alt="" className="w-4 h-4" />
                  {plan.diamonds} diamantes
                </span>
                <span className="font-semibold text-foreground">US$ {plan.price}</span>
              </div>
              <div className="flex items-center justify-between text-success">
                <span>Bono</span>
                <span className="font-semibold">+ {plan.bonus}</span>
              </div>
              <div className="border-t border-border pt-2 flex items-center justify-between">
                <span className="font-bold text-foreground">Total a recibir</span>
                <span className="font-bold text-primary">{plan.total} 💎</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-warning/10 rounded-lg py-2 px-3">
              <Clock className="w-4 h-4 text-warning" />
              <span>Oferta válida por tiempo limitado</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-success" /> Datos de pago
            </h2>

            <div>
              <label className="text-sm text-foreground mb-1 block">Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="text-sm text-foreground mb-1 block">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label className="text-sm text-foreground mb-1 block">Número de tarjeta</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM / AA"
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="CVC"
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-lg font-semibold py-4 px-6 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110 transition-all disabled:opacity-60"
            >
              {submitting ? "Procesando..." : `Pagar US$ ${plan.price}`}
            </button>

            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Pago 100% seguro y encriptado
            </p>
          </form>
        </div>
      </main>
      <SocialProofToasts />
    </div>
  );
}

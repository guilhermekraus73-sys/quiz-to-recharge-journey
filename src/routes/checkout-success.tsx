import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import diamondIcon from "@/assets/diamond-icon.png";

export const Route = createFileRoute("/checkout-success")({
  head: () => ({
    meta: [
      { title: "¡Recarga confirmada! — Free Fire" },
      { name: "description", content: "Tu recarga de diamantes Free Fire fue procesada con éxito." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">¡Pago confirmado!</h1>
        <p className="text-muted-foreground mb-6">
          Tus diamantes serán acreditados en tu cuenta Free Fire en los próximos minutos.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-center gap-2">
          <img src={diamondIcon} alt="" className="w-5 h-5" />
          <span className="font-bold text-primary">Recarga en proceso</span>
        </div>

        <Link
          to="/quiz"
          className="inline-block w-full text-lg font-semibold py-3 px-6 rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

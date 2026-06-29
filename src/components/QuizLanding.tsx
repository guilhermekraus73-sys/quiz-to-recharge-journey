import { Check, TriangleAlert } from "lucide-react";
import freefireLogo from "@/assets/freefire-logo.png";

interface QuizLandingProps {
  onStart: () => void;
}

const QuizLanding = ({ onStart }: QuizLandingProps) => {
  return (
    <div className="animate-fade-in">
      <div className="relative flex justify-center mb-6 -mx-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(22_100%_54%/0.35),transparent_65%)] blur-2xl" />
        <img
          src={freefireLogo}
          alt="Free Fire Logo"
          className="relative w-full max-w-md h-auto object-contain drop-shadow-[0_0_18px_rgba(255,122,20,0.55)] [filter:brightness(1.25)_contrast(1.15)_saturate(1.2)]"
        />
      </div>

      <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-3 mb-4 text-center">
        <p className="text-sm font-medium text-primary">🔐 Acceso a bonos solo para cuentas calificadas</p>
      </div>

      <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-primary mb-3">
            ⚠️ ¿Tu cuenta Free Fire está calificada?
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Este sistema analiza tu perfil y determina si tu cuenta{" "}
            <span className="text-primary font-semibold">califica para recibir hasta 70% de descuento</span>{" "}
            en la compra de diamantes.
          </p>
        </div>

        <div className="space-y-3 mb-5">
          {["Experiencia en el juego", "Actividad de la cuenta", "Perfil competitivo"].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
              <Check className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-center text-warning text-sm mb-5 bg-warning/10 rounded-lg py-2 px-3">
          <TriangleAlert className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">No todas las cuentas califican</span>
        </div>

        <button
          onClick={onStart}
          className="w-full text-lg font-semibold py-4 px-6 rounded-xl bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 animate-pulse-glow"
        >
          <span>Comenzar Calificación</span>
          <span>🔥</span>
        </button>
      </div>
    </div>
  );
};

export default QuizLanding;

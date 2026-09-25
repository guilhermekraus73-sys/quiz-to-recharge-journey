import { useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

export const Route = createFileRoute("/roleta")({
  head: () => ({
    meta: [
      { title: "Roleta Free Fire — Gira y gana tu descuento" },
      { name: "description", content: "Gira la roleta y gana hasta 65% de descuento en diamantes de Free Fire." },
      { property: "og:title", content: "Roleta Free Fire — Gira y gana tu descuento" },
      { property: "og:description", content: "Gira la roleta y gana hasta 65% de descuento en diamantes de Free Fire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Roleta Free Fire — Gira y gana tu descuento" },
      { name: "twitter:description", content: "Gira la roleta y gana hasta 65% de descuento en diamantes de Free Fire." },
    ],
  }),
  component: RoletaPage,
});

type Segment = {
  label: string;
  kind: "none" | "35" | "65";
  fill: string;
  text: string;
};

// 4 casas sin premio + 2 con 35% + 2 con 65%
const SEGMENTS: Segment[] = [
  { label: "35% OFF", kind: "35", fill: "#7c2d12", text: "#fed7aa" },
  { label: "SIN PREMIO", kind: "none", fill: "#18181f", text: "#8a8a97" },
  { label: "65% OFF", kind: "65", fill: "#ea580c", text: "#0a0a0c" },
  { label: "SIN PREMIO", kind: "none", fill: "#18181f", text: "#8a8a97" },
  { label: "35% OFF", kind: "35", fill: "#7c2d12", text: "#fed7aa" },
  { label: "SIN PREMIO", kind: "none", fill: "#18181f", text: "#8a8a97" },
];

// Índice de la casa donde cae cada giro (fijo según la dinámica pedida)
const FIRST_SPIN = 1; // SIN PREMIO
const SECOND_SPIN = 2; // 65% OFF

const SEG_ANGLE = 360 / SEGMENTS.length;

function polar(cx: number, cy: number, r: number, angleFromTopDeg: number) {
  const rad = (angleFromTopDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function segmentPath(i: number) {
  const cx = 100;
  const cy = 100;
  const r = 96;
  const start = i * SEG_ANGLE;
  const end = (i + 1) * SEG_ANGLE;
  const p1 = polar(cx, cy, r, start);
  const p2 = polar(cx, cy, r, end);
  return `M ${cx} ${cy} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
}

type Phase = "idle" | "first" | "lost" | "second" | "won";

function RoletaPage() {
  useFunnelTracking("roleta");
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);

  const preserveSearch = () =>
    typeof window !== "undefined" && window.location.search
      ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
      : undefined;

  const spinTo = (segmentIndex: number, next: Phase) => {
    const mid = segmentIndex * SEG_ANGLE + SEG_ANGLE / 2;
    const jitter = Math.random() * (SEG_ANGLE - 24) - (SEG_ANGLE - 24) / 2;
    let target = 360 * 6 + (360 - mid) + jitter;
    while (target <= rotationRef.current + 720) target += 360;
    rotationRef.current = target;
    setRotation(target);
    setPhase(next);
  };

  const handleSpin = () => {
    if (phase === "idle") spinTo(FIRST_SPIN, "first");
    else if (phase === "lost") spinTo(SECOND_SPIN, "second");
  };

  const handleSpinEnd = () => {
    if (phase === "first") setPhase("lost");
    else if (phase === "second") setPhase("won");
  };

  const spinning = phase === "first" || phase === "second";

  return (
    <div className="min-h-screen gamer-bg relative overflow-hidden">
      <style>{`
        @keyframes roleta-confetti {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes roleta-prize-pop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes roleta-diamond-float {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(6deg); }
        }
      `}</style>

      <main className="container py-6 sm:py-10">
        <div className="max-w-md mx-auto text-center">
          <p className="font-display uppercase tracking-[0.3em] text-xs text-primary mb-2">
            Free Fire · Roleta de descuentos
          </p>
          <h1 className="font-display uppercase tracking-wider text-2xl sm:text-3xl font-bold text-foreground">
            ¡Gira y gana tu descuento!
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Tienes 1 giro gratis. Puede tocar hasta <span className="text-primary font-semibold">65% OFF</span> en diamantes.
          </p>

          {/* Roleta */}
          <div className="relative mx-auto mt-8 w-[300px] h-[300px] sm:w-[340px] sm:h-[340px]">
            {/* Puntero */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-20">
              <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[26px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_2px_6px_rgba(255,122,20,0.7)]" />
            </div>

            {/* Aro exterior */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/40 to-primary/10 p-[6px] tech-glow">
              <div className="w-full h-full rounded-full bg-background p-[3px] border border-border">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full rounded-full"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning
                      ? "transform 4.5s cubic-bezier(0.12, 0.8, 0.15, 1)"
                      : "none",
                  }}
                  onTransitionEnd={handleSpinEnd}
                >
                  {SEGMENTS.map((seg, i) => {
                    const mid = i * SEG_ANGLE + SEG_ANGLE / 2;
                    const labelPos = polar(100, 100, 62, mid);
                    return (
                      <g key={i}>
                        <path d={segmentPath(i)} fill={seg.fill} stroke="#0a0a0c" strokeWidth="1.5" />
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          fill={seg.text}
                          fontSize="10.5"
                          fontWeight="700"
                          fontFamily="Rajdhani, sans-serif"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${mid} ${labelPos.x} ${labelPos.y})`}
                        >
                          {seg.label}
                        </text>
                      </g>
                    );
                  })}
                  {/* Centro */}
                  <circle cx="100" cy="100" r="22" fill="#0a0a0c" stroke="#ea580c" strokeWidth="3" />
                  <text x="100" y="101" fill="#ea580c" fontSize="15" textAnchor="middle" dominantBaseline="middle">
                    💎
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Mensaje + botones */}
          <div className="mt-8 min-h-[120px]">
            {phase === "idle" && (
              <button
                onClick={handleSpin}
                className="font-display uppercase tracking-widest text-base sm:text-lg font-bold py-3.5 px-10 rounded-xl bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-[0_8px_24px_rgba(255,122,20,0.35)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 animate-pulse-glow"
              >
                Girar ahora
              </button>
            )}

            {phase === "lost" && (
              <div className="animate-fade-in">
                <p className="text-sm text-muted-foreground">
                  Casi… esta vez no tocó premio. ¡Tienes un giro más!
                </p>
                <button
                  onClick={handleSpin}
                  className="mt-4 font-display uppercase tracking-widest text-base sm:text-lg font-bold py-3.5 px-10 rounded-xl bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-[0_8px_24px_rgba(255,122,20,0.35)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 animate-pulse-glow"
                >
                  Girar de nuevo
                </button>
              </div>
            )}

            {(phase === "first" || phase === "second") && (
              <p className="font-display uppercase tracking-widest text-sm text-muted-foreground animate-fade-in">
                Girando…
              </p>
            )}

            {phase === "won" && (
              <div className="animate-fade-in">
                <div
                  className="relative bg-card border border-primary/50 rounded-2xl p-6 tech-glow overflow-hidden"
                  style={{ animation: "roleta-prize-pop 0.6s ease-out forwards" }}
                >
                  {/* Confetti */}
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute top-0 w-1.5 h-3 rounded-sm pointer-events-none"
                      style={{
                        left: `${(i * 37) % 100}%`,
                        backgroundColor: ["#ea580c", "#fbbf24", "#22c55e", "#f97316"][i % 4],
                        animation: `roleta-confetti ${1.8 + (i % 5) * 0.4}s linear ${(i % 7) * 0.15}s infinite`,
                      }}
                    />
                  ))}

                  <div
                    className="text-4xl mb-2"
                    style={{ animation: "roleta-diamond-float 1.6s ease-in-out infinite" }}
                  >
                    💎
                  </div>
                  <p className="font-display uppercase tracking-[0.25em] text-xs text-primary">
                    ¡Premio desbloqueado!
                  </p>
                  <h2 className="font-display uppercase tracking-wider text-3xl sm:text-4xl font-bold text-foreground mt-1">
                    65% OFF
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    En tu recarga de diamantes. Descuento aplicado al continuar.
                  </p>
                  <button
                    onClick={() => navigate({ to: "/idplayer", search: preserveSearch() })}
                    className="mt-5 w-full font-display uppercase tracking-widest text-base sm:text-lg font-bold py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-[0_8px_24px_rgba(255,122,20,0.45)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 animate-pulse-glow"
                  >
                    Rescatar descuento →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

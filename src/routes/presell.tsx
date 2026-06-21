import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/presell")({
  head: () => ({
    meta: [
      { title: "Oferta exclusiva — Free Fire" },
      { name: "description", content: "Accede a tu oferta exclusiva de diamantes para Free Fire." },
    ],
  }),
  component: PresellPage,
});

function PresellPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/quiz" });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <button
        onClick={handleClick}
        className="w-full max-w-sm text-lg font-semibold py-4 px-6 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110 transition-all duration-200 animate-pulse-glow"
      >
        Comenzar ahora
      </button>
    </div>
  );
}

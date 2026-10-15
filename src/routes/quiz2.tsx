import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import QuizLanding from "@/components/QuizLanding";
import QuizQuestions from "@/components/QuizQuestions";
import QuizResult from "@/components/QuizResult";
import SocialProofToasts from "@/components/SocialProofToasts";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import NarutoTheme from "@/components/NarutoTheme";

type QuizStep = "landing" | "questions" | "result";

export const Route = createFileRoute("/quiz2")({
  head: () => ({
    meta: [
      { title: "Quiz Free Fire × Naruto — Califica tu cuenta" },
      { name: "description", content: "Evalúa tu cuenta Free Fire y descubre tus descuentos en diamantes en una experiencia inspirada en Naruto." },
      { property: "og:title", content: "Quiz Free Fire × Naruto — Califica tu cuenta" },
      { property: "og:description", content: "Evalúa tu cuenta Free Fire y descubre tus descuentos en diamantes en una experiencia inspirada en Naruto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizTwoPage,
});

function QuizTwoPage() {
  useFunnelTracking("quiz");
  const [step, setStep] = useState<QuizStep>("landing");

  return (
    <NarutoTheme>
      <main className="container relative py-8 md:py-12">
        <div className="max-w-md mx-auto">
          {step === "landing" && <QuizLanding onStart={() => setStep("questions")} />}
          {step === "questions" && <QuizQuestions onComplete={() => setStep("result")} />}
          {step === "questions" && <SocialProofToasts />}
          {step === "result" && <QuizResult nextPage="/idplayer2" />}
        </div>
      </main>
    </NarutoTheme>
  );
}
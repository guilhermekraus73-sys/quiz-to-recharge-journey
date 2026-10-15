import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import QuizLanding from "@/components/QuizLanding";
import QuizQuestions from "@/components/QuizQuestions";
import QuizResult from "@/components/QuizResult";
import SocialProofToasts from "@/components/SocialProofToasts";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import ninjaBackground from "@/assets/quiz2_naruto_reference.png.asset.json";
import ninjaPortrait from "@/assets/quiz2-naruto-portrait.jpg";

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
    <div className="quiz-ninja min-h-screen isolate">
      <div className="quiz-ninja-scenery" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet={ninjaPortrait} />
          <img src={ninjaBackground.url} alt="" width={648} height={364} fetchPriority="high" className="quiz-ninja-backdrop" />
        </picture>
        <div className="quiz-ninja-veil" />
      </div>
      <main className="quiz-ninja-content container relative pb-12">
        <div className={`max-w-md mx-auto w-full${step === "landing" ? " quiz-ninja-landing" : ""}`}>
          {step === "landing" && <QuizLanding onStart={() => setStep("questions")} />}
          {step === "questions" && <QuizQuestions onComplete={() => setStep("result")} />}
          {step === "questions" && <SocialProofToasts />}
          {step === "result" && <QuizResult />}
        </div>
      </main>
    </div>
  );
}
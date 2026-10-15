import type { ReactNode } from "react";
import ninjaBackground from "@/assets/quiz2_naruto_reference.png.asset.json";
import ninjaPortrait from "@/assets/quiz2-naruto-portrait.jpg";

export default function NarutoTheme({ children, continuation = false }: { children: ReactNode; continuation?: boolean }) {
  return (
    <div className={`quiz-ninja min-h-screen isolate${continuation ? " ninja-continuation" : ""}`}>
      <div className="quiz-ninja-scenery" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet={ninjaPortrait} />
          <img src={ninjaBackground.url} alt="" width={648} height={364} fetchPriority="high" className="quiz-ninja-backdrop" />
        </picture>
        <div className="quiz-ninja-veil" />
      </div>
      {children}
    </div>
  );
}
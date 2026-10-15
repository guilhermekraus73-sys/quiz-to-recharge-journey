import type { ReactNode } from "react";
import halloweenArtwork from "@/assets/br-halloween-event.jpg";

export default function HalloweenTheme({ children }: { children: ReactNode }) {
  return (
    <div className="br-halloween min-h-screen">
      <header className="halloween-header mx-auto max-w-lg px-4 pt-4 sm:pt-6">
        <div className="halloween-art relative isolate overflow-hidden rounded-lg">
          <img
            src={halloweenArtwork}
            alt="Abóboras iluminadas e diamantes em um cenário gamer de Halloween"
            width={1536}
            height={512}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <p className="text-xs font-semibold uppercase text-halloween-moon">Especial de outubro</p>
            <h2 className="halloween-title font-display text-4xl font-bold text-foreground sm:text-5xl">HALLOWEEN</h2>
            <div className="mt-2 h-0.5 w-10 bg-primary" aria-hidden="true" />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
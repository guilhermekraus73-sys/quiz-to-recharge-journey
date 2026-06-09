import garenaLogo from "@/assets/garena-logo.png";
import membershipsBanner from "@/assets/memberships-banner.jpg";
import freefireCharacter from "@/assets/freefire-character.png";
import freefireBanner from "@/assets/freefire-banner.jpg";

const GarenaHeader = () => (
  <div className="space-y-4 mb-6">
    <div className="flex items-center gap-3">
      <img src={garenaLogo} alt="Garena" className="w-10 h-10 object-contain" />
      <div className="text-sm">
        <p className="text-muted-foreground">Canal Oficial de</p>
        <p className="text-foreground font-bold">Recarga</p>
      </div>
    </div>
    <img src={membershipsBanner} alt="Membresías Free Fire" className="w-full rounded-xl shadow-md" />
    <div>
      <p className="text-sm text-muted-foreground mb-2">Selección de Juego</p>
      <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-card">
        <img src={freefireCharacter} alt="Free Fire" className="w-8 h-8 object-contain" />
        <span className="text-foreground font-medium text-sm">Free Fire</span>
      </div>
    </div>
    <img src={freefireBanner} alt="Free Fire" className="w-full rounded-xl shadow-md" loading="lazy" />
  </div>
);

export default GarenaHeader;

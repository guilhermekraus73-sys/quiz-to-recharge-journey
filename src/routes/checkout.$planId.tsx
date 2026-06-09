import { useState, useEffect, useMemo, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Lock, Sparkles } from "lucide-react";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import { resolveTracking } from "@/lib/tracking";
import SocialProofToasts from "@/components/SocialProofToasts";
import LiveViewersBadge from "@/components/LiveViewersBadge";
import membershipsBanner from "@/assets/memberships-banner.jpg";
import diamondIcon from "@/assets/diamond-icon.png";

const BUMP_PRICE_USD = 2.99;

const countries = [
  { code: "MX", flag: "🇲🇽", name: "México" },
  { code: "US", flag: "🇺🇸", name: "Estados Unidos" },
  { code: "CA", flag: "🇨🇦", name: "Canadá" },
  { code: "GT", flag: "🇬🇹", name: "Guatemala" },
  { code: "SV", flag: "🇸🇻", name: "El Salvador" },
  { code: "HN", flag: "🇭🇳", name: "Honduras" },
  { code: "NI", flag: "🇳🇮", name: "Nicaragua" },
  { code: "CR", flag: "🇨🇷", name: "Costa Rica" },
  { code: "PA", flag: "🇵🇦", name: "Panamá" },
  { code: "DO", flag: "🇩🇴", name: "República Dominicana" },
  { code: "PR", flag: "🇵🇷", name: "Puerto Rico" },
  { code: "AR", flag: "🇦🇷", name: "Argentina" },
  { code: "BO", flag: "🇧🇴", name: "Bolivia" },
  { code: "BR", flag: "🇧🇷", name: "Brasil" },
  { code: "CL", flag: "🇨🇱", name: "Chile" },
  { code: "CO", flag: "🇨🇴", name: "Colombia" },
  { code: "EC", flag: "🇪🇨", name: "Ecuador" },
  { code: "PY", flag: "🇵🇾", name: "Paraguay" },
  { code: "PE", flag: "🇵🇪", name: "Perú" },
  { code: "UY", flag: "🇺🇾", name: "Uruguay" },
  { code: "VE", flag: "🇻🇪", name: "Venezuela" },
  { code: "ES", flag: "🇪🇸", name: "España" },
  { code: "PT", flag: "🇵🇹", name: "Portugal" },
  { code: "DE", flag: "🇩🇪", name: "Alemania" },
  { code: "FR", flag: "🇫🇷", name: "Francia" },
  { code: "IT", flag: "🇮🇹", name: "Italia" },
  { code: "GB", flag: "🇬🇧", name: "Reino Unido" },
];

const plans = [
  { id: 1, diamonds: "5,600", bonus: "1,120", total: "6,720", price: "9.00" },
  { id: 2, diamonds: "11,200", bonus: "2,240", total: "13,440", price: "15.90" },
  { id: 3, diamonds: "22,400", bonus: "4,480", total: "26,880", price: "19.00" },
];

const isLikelyValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export const Route = createFileRoute("/checkout/$planId")({
  head: () => ({
    meta: [{ title: "Checkout — Free Fire" }],
  }),
  component: CheckoutPage,
});

type PaymentSectionProps = {
  displayPrice: string;
  paymentIntentId: string;
  email: string;
  name: string;
  formValid: boolean;
  ensureAmountSynced: () => Promise<void>;
};

const PaymentSection = ({
  displayPrice,
  paymentIntentId,
  email,
  name,
  formValid,
  ensureAmountSynced,
}: PaymentSectionProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!formValid) {
      setErrorMsg("Completa tu correo y nombre antes de pagar");
      return;
    }
    setSubmitting(true);
    setErrorMsg(null);
    await ensureAmountSynced();
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMsg(submitError.message ?? "Revisa los datos de pago");
      setSubmitting(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout-success?payment_intent=${paymentIntentId}`,
        payment_method_data: {
          billing_details: { email, name },
        },
      },
    });
    if (error) {
      setErrorMsg(error.message ?? "Error al confirmar el pago");
      setSubmitting(false);
    }
  };

  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;
    setErrorMsg(null);
    setSubmitting(true);
    await ensureAmountSynced();
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMsg(submitError.message ?? "Revisa los datos de pago");
      setSubmitting(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout-success?payment_intent=${paymentIntentId}`,
      },
    });
    if (error) {
      setErrorMsg(error.message ?? "Error al confirmar el pago");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <div>
        <ExpressCheckoutElement
          onConfirm={handleExpressConfirm}
          options={{
            buttonHeight: 48,
            paymentMethods: {
              applePay: "auto",
              googlePay: "auto",
              link: "auto",
              amazonPay: "never",
              paypal: "never",
            },
          }}
        />
      </div>

      <div className="relative flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex-1 h-px bg-border" />
        <span className="uppercase tracking-wide">o paga con tarjeta</span>
        <span className="flex-1 h-px bg-border" />
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
          fields: {
            billingDetails: { email: "never", name: "never" },
          },
        }}
      />

      {errorMsg && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Lock className="w-4 h-4" />
        <span>Pago 100% seguro procesado por Stripe</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || submitting || !formValid}
        className="w-full text-lg font-semibold py-4 px-6 rounded-xl bg-gradient-to-b from-success to-success/80 text-success-foreground shadow-lg shadow-success/30 hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Procesando..." : `PAGAR $${displayPrice} USD`}
      </button>
    </form>
  );
};

function CheckoutPage() {
  useFunnelTracking("checkout");
  const { planId } = Route.useParams();
  const plan = plans.find((p) => p.id === Number(planId)) || plans[0];

  const [timeLeft, setTimeLeft] = useState(600);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("México");
  const [bumpSelected, setBumpSelected] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [creatingPaymentIntent, setCreatingPaymentIntent] = useState(false);

  const basePriceNumber = parseFloat(plan.price);
  const totalNumber = basePriceNumber + (bumpSelected ? BUMP_PRICE_USD : 0);
  const displayPrice = totalNumber.toFixed(2);

  const [stripePromise, setStripePromise] = useState<Promise<StripeJs | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const initKeyRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const data = await res.json();
        const code = (data?.country_code || data?.country || "").toUpperCase();
        if (cancelled || !code) return;
        const match = countries.find((c) => c.code === code);
        if (match) setCountry(match.name);
      } catch {
        /* silent */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formValid = email.trim().length > 3 && name.trim().length > 1;
  const emailReady = isLikelyValidEmail(email);

  useEffect(() => {
    if (!emailReady) return;
    if (initKeyRef.current) return;
    initKeyRef.current = email.trim().toLowerCase();
    setCreatingPaymentIntent(true);
    setInitError(null);

    (async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const tracking = resolveTracking(searchParams);

        const { data, error } = await supabase.functions.invoke("create-payment-intent", {
          body: {
            planId: plan.id,
            email: email.trim(),
            name: name.trim(),
            country,
            tracking,
          },
        });

        if (error) throw error;
        if (!data?.clientSecret || !data?.publishableKey) {
          throw new Error("Respuesta inválida del servidor");
        }
        setStripePromise(loadStripe(data.publishableKey));
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } catch (err) {
        initKeyRef.current = null;
        const msg = err instanceof Error ? err.message : "Error al iniciar el pago";
        setInitError(msg);
        toast.error(msg);
      } finally {
        setCreatingPaymentIntent(false);
      }
    })();
  }, [emailReady, country, email, name, plan.id]);

  const pendingSyncRef = useRef<Promise<unknown> | null>(null);

  const runSync = () => {
    if (!paymentIntentId) return Promise.resolve();
    const p = supabase.functions
      .invoke("update-payment-intent", {
        body: { paymentIntentId, email, name, country, bumpSelected },
      })
      .catch((err) => console.warn("update-payment-intent failed", err))
      .finally(() => {
        if (pendingSyncRef.current === p) pendingSyncRef.current = null;
      });
    pendingSyncRef.current = p;
    return p;
  };

  useEffect(() => {
    if (!paymentIntentId) return;
    const handle = setTimeout(() => {
      runSync();
    }, 250);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, name, country, paymentIntentId]);

  useEffect(() => {
    if (!paymentIntentId) return;
    runSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bumpSelected, paymentIntentId]);

  const ensureAmountSynced = async () => {
    const fresh = runSync();
    await fresh;
    if (pendingSyncRef.current) {
      await pendingSyncRef.current;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const elementsOptions = useMemo(
    () =>
      clientSecret
        ? {
            clientSecret,
            appearance: {
              theme: "stripe" as const,
              variables: {
                colorPrimary: "hsl(142 71% 45%)",
                borderRadius: "12px",
              },
            },
          }
        : undefined,
    [clientSecret],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-destructive text-destructive-foreground py-3">
        <div className="container flex items-center justify-center gap-3">
          <span className="text-2xl md:text-3xl font-bold font-mono">{formatTime(timeLeft)}</span>
          <Clock className="w-5 h-5" />
          <span className="font-medium text-sm md:text-base">PROMOCIÓN SOLO HOY</span>
        </div>
      </div>

      <main className="container py-6 md:py-10">
        <div className="max-w-lg mx-auto">
          <img src={membershipsBanner} alt="Membresías Free Fire" className="w-full rounded-xl mb-6 shadow-md" />
          <LiveViewersBadge className="mb-4" />

          <div className="bg-card rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <img src={diamondIcon} alt="Diamantes" className="w-14 h-14 object-contain" />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">Bono de Diamantes - Free Fire</h2>
                <p className="text-muted-foreground text-sm">
                  {plan.diamonds} + {plan.bonus} Bonus
                </p>
                {bumpSelected && (
                  <p className="text-success text-sm font-medium mt-1">+ 1,000 diamantes extras 🎁</p>
                )}
                <p className="text-success font-bold text-lg mt-1">Total: $ {displayPrice} USD</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Tus datos</h3>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tu correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">País</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBumpSelected((v) => !v)}
              className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                bumpSelected
                  ? "border-success bg-success/10 shadow-md"
                  : "border-dashed border-warning/60 bg-warning/5 hover:border-warning"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                    bumpSelected ? "bg-success border-success" : "border-warning"
                  }`}
                >
                  {bumpSelected && (
                    <svg viewBox="0 0 16 16" className="w-3 h-3 text-success-foreground">
                      <path
                        fill="currentColor"
                        d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-warning" />
                    <p className="text-sm font-bold text-foreground">¡SÍ! Quiero +1,000 diamantes extras</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Solo por{" "}
                    <span className="font-bold text-foreground">+US$ {BUMP_PRICE_USD.toFixed(2)}</span> —
                    agregado a esta misma compra. Oferta única, no se repite después del pago.
                  </p>
                </div>
              </div>
            </button>

            <div className="border-t border-border pt-6">
              <h3 className="text-base font-semibold text-foreground mb-4">Forma de pago</h3>

              {initError && (
                <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                  {initError}
                </p>
              )}

              {!emailReady && !clientSecret && !initError && (
                <p className="text-sm text-muted-foreground bg-muted/60 border border-border rounded-lg px-3 py-3">
                  Ingresa tu correo para ver Apple Pay, Google Pay y tarjetas.
                </p>
              )}

              {emailReady && !clientSecret && !initError && (
                <div className="space-y-3 animate-pulse">
                  <div className="h-12 rounded-xl bg-muted" />
                  <div className="h-12 rounded-xl bg-muted" />
                  <div className="h-12 rounded-xl bg-muted" />
                  {creatingPaymentIntent && (
                    <p className="text-xs text-muted-foreground">Preparando pago seguro...</p>
                  )}
                </div>
              )}

              {clientSecret && stripePromise && paymentIntentId && (
                <Elements stripe={stripePromise} options={elementsOptions}>
                  <PaymentSection
                    displayPrice={displayPrice}
                    paymentIntentId={paymentIntentId}
                    email={email}
                    name={name}
                    formValid={formValid}
                    ensureAmountSynced={ensureAmountSynced}
                  />
                </Elements>
              )}

              {clientSecret && !formValid && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Completa tu nombre para activar el botón de pago con tarjeta.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <SocialProofToasts />
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Gift, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const useCountdown = (expiryHours: number) => {
  const [expiry] = useState(() => {
    const stored = localStorage.getItem("discount_offer_expiry");
    if (stored) return new Date(stored);
    const exp = new Date(Date.now() + expiryHours * 60 * 60 * 1000);
    localStorage.setItem("discount_offer_expiry", exp.toISOString());
    return exp;
  });

  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, expiry.getTime() - Date.now()));

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, expiry.getTime() - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiry]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: timeLeft <= 0 };
};

const CountdownBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/20 border border-primary/30 flex items-center justify-center">
      <span className="text-2xl sm:text-3xl font-black text-primary font-mono">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-medium">{label}</span>
  </div>
);

const DiscountPopup = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const { data: config } = useQuery({
    queryKey: ["discount-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discount_config")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const countdown = useCountdown(config?.expiry_hours ?? 24);

  useEffect(() => {
    if (!config || !config.is_active) return;

    const dismissedAt = localStorage.getItem("discount_popup_dismissed_at");
    if (dismissedAt) {
      const hoursSince = (Date.now() - new Date(dismissedAt).getTime()) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setDismissed(true);
        return;
      }
      localStorage.removeItem("discount_popup_dismissed_at");
    }
    const timer = setTimeout(() => setVisible(true), (config.delay_seconds ?? 4) * 1000);
    return () => clearTimeout(timer);
  }, [config]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem("discount_popup_dismissed_at", new Date().toISOString());
  };

  if (!config || !config.is_active || dismissed || countdown.expired) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-1.5 bg-gradient-to-r from-primary via-orange-400 to-primary" />

              <div className="bg-card p-0">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative px-8 pt-10 pb-4 text-center overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/15 rounded-full blur-3xl" />
                  <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-500 mb-5 shadow-lg shadow-primary/30"
                  >
                    <Gift className="w-8 h-8 text-primary-foreground" />
                  </motion.div>

                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Exclusive Offer
                    </span>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>

                  <h2 className="text-4xl sm:text-5xl font-black mb-1 tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
                      {config.title}
                    </span>
                  </h2>
                  <p className="text-lg font-semibold mb-1">{config.subtitle}</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    {config.description}
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="px-8 mb-4">
                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                      Offer expires in
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <CountdownBlock value={countdown.hours} label="Hours" />
                    <span className="text-2xl font-bold text-primary mt-[-16px]">:</span>
                    <CountdownBlock value={countdown.minutes} label="Min" />
                    <span className="text-2xl font-bold text-primary mt-[-16px]">:</span>
                    <CountdownBlock value={countdown.seconds} label="Sec" />
                  </div>
                </div>

                {/* Code section */}
                <div className="mx-8 mb-5">
                  <div className="relative flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-muted/50 border-2 border-dashed border-primary/40">
                    <span className="text-sm text-muted-foreground font-medium">Promo Code:</span>
                    <span className="font-mono text-xl font-black text-primary tracking-widest">{config.promo_code}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-8 pb-8">
                  <Link
                    to="/claim-offer"
                    onClick={handleDismiss}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-primary-foreground font-bold text-base hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {config.cta_text}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={handleDismiss}
                    className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    No thanks, I'll pay full price
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiscountPopup;

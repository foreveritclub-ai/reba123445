import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Gift, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const DiscountPopup = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("discount_popup_dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("discount_popup_dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto rounded-3xl overflow-hidden shadow-2xl">
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-orange-400 to-primary" />

              <div className="bg-card p-0">
                {/* Close button */}
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Hero section */}
                <div className="relative px-8 pt-10 pb-6 text-center overflow-hidden">
                  {/* Glow effects */}
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
                      20% OFF
                    </span>
                  </h2>
                  <p className="text-lg font-semibold mb-2">All Services & Courses</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Transform your business with our premium IT solutions at an unbeatable price.
                  </p>
                </div>

                {/* Code section */}
                <div className="mx-8 mb-5">
                  <div className="relative flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-muted/50 border-2 border-dashed border-primary/40">
                    <span className="text-sm text-muted-foreground font-medium">Promo Code:</span>
                    <span className="font-mono text-xl font-black text-primary tracking-widest">EGREED20</span>
                  </div>
                </div>

                {/* Timer urgency */}
                <div className="flex items-center justify-center gap-2 mb-5 text-muted-foreground">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-medium">Limited time — Don't miss out!</span>
                </div>

                {/* CTA */}
                <div className="px-8 pb-8">
                  <Link
                    to="/claim-offer"
                    onClick={handleDismiss}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-primary-foreground font-bold text-base hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Claim Your 20% Discount
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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Percent, ArrowRight } from "lucide-react";

interface PopupAdProps {
  position: "bottom-right" | "top-right" | "top-left";
  delay: number;
  title: string;
  description: string;
  code: string;
}

const PopupAd = ({ position, delay, title, description, code }: PopupAdProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const key = `popup_dismissed_${position}`;
    const wasDismissed = sessionStorage.getItem(key);
    if (wasDismissed) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay, position]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(`popup_dismissed_${position}`, "true");
  };

  const positionClasses: Record<string, string> = {
    "bottom-right": "bottom-4 right-4",
    "top-right": "top-20 right-4",
    "top-left": "top-20 left-4",
  };

  const originMap: Record<string, { initial: { opacity: number; x?: number; y?: number; scale: number }; animate: { opacity: number; x?: number; y?: number; scale: number }; exit: { opacity: number; x?: number; y?: number; scale: number } }> = {
    "bottom-right": {
      initial: { opacity: 0, y: 40, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 40, scale: 0.9 },
    },
    "top-right": {
      initial: { opacity: 0, x: 40, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 40, scale: 0.9 },
    },
    "top-left": {
      initial: { opacity: 0, x: -40, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -40, scale: 0.9 },
    },
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50 w-72 sm:w-80`}
          {...originMap[position]}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="relative bg-card border border-primary/30 rounded-2xl p-5 shadow-2xl shadow-primary/10 overflow-hidden">
            {/* Glow accent */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />

            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Percent className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Limited Offer
              </span>
            </div>

            <h4 className="text-lg font-bold mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>

            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-muted/50 rounded-lg border border-dashed border-primary/30">
              <span className="text-xs text-muted-foreground">Use code:</span>
              <span className="font-mono font-bold text-primary text-sm">{code}</span>
            </div>

            <a
              href="#contact"
              onClick={handleDismiss}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Claim Now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DiscountPopups = () => {
  return (
    <>
      <PopupAd
        position="bottom-right"
        delay={3000}
        title="20% Off All Services!"
        description="Get 20% discount on any IT consulting or development service."
        code="EGREED20"
      />
      <PopupAd
        position="top-right"
        delay={8000}
        title="20% Off Training!"
        description="Enroll in any course today and save 20% on your tuition."
        code="LEARN20"
      />
      <PopupAd
        position="top-left"
        delay={15000}
        title="20% Off Web Dev!"
        description="Launch your professional website with 20% off our packages."
        code="WEB20"
      />
    </>
  );
};

export default DiscountPopups;

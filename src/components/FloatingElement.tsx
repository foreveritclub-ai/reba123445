import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  magnetStrength?: number;
}

const FloatingElement = ({ children, className = "", magnetStrength = 0.3 }: FloatingElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementCenter, setElementCenter] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const updateElementCenter = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setElementCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateElementCenter();
    window.addEventListener("resize", updateElementCenter);
    window.addEventListener("scroll", updateElementCenter);

    return () => {
      window.removeEventListener("resize", updateElementCenter);
      window.removeEventListener("scroll", updateElementCenter);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 300) {
          const force = (300 - distance) / 300;
          x.set(distanceX * magnetStrength * force);
          y.set(distanceY * magnetStrength * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [magnetStrength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import FloatingElement from "./FloatingElement";
import egreedLogo from "@/assets/egreed-logo.png";

const navItems = ["About", "Services", "Case-Studies", "Courses", "LLM", "Testimonials", "Contact"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-background/80 backdrop-blur-md border-b border-border/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <FloatingElement magnetStrength={0.3}>
          <a href="/" className="flex items-center gap-2">
            <img src={egreedLogo} alt="Egreed Technology" className="h-10 w-auto" />
          </a>
        </FloatingElement>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <FloatingElement key={item} magnetStrength={0.4}>
              <motion.a
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {item}
              </motion.a>
            </FloatingElement>
          ))}
          <FloatingElement magnetStrength={0.4}>
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
            >
              Blog
            </Link>
          </FloatingElement>
        </div>

        <div className="flex items-center gap-4">
          <FloatingElement magnetStrength={0.3}>
            {user ? (
              <Link
                to="/dashboard"
                className="hidden md:inline-flex px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:glow-primary transition-all duration-300"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/signin"
                className="hidden md:inline-flex px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:glow-primary transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </FloatingElement>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/30 p-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground py-2 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
            <Link
              to="/blog"
              className="text-foreground py-2 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <a
              href="#contact"
              className="mt-2 px-5 py-3 bg-primary text-primary-foreground text-center font-medium rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

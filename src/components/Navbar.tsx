import { motion } from "framer-motion";
import FloatingElement from "./FloatingElement";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <FloatingElement magnetStrength={0.3}>
          <a href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-foreground">Reba</span>
            <span className="text-primary">.</span>
          </a>
        </FloatingElement>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Work", "Services", "Contact"].map((item, index) => (
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
        </div>

        <FloatingElement magnetStrength={0.3}>
          <button className="px-5 py-2.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            Let's Talk
          </button>
        </FloatingElement>
      </div>
    </motion.nav>
  );
};

export default Navbar;

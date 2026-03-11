import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Code2, BookOpen, Users } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

interface LandingNavbarProps {
  authenticated?: boolean;
}

const navLinks = [
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Connections", href: "/notice/connection", icon: Users },
];

export default function LandingNavbar({ authenticated = false }: LandingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!authenticated) {
      localStorage.setItem("redirectAfterLogin", href);
      navigate("/login");
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#09090b]/80 dark:bg-[#09090b]/60 backdrop-blur-xl border-b border-white/[0.06] shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 group">
            <Code2 className="w-7 h-7 text-[var(--primary)] transition-transform group-hover:rotate-12" />
            <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
              KEPLER <span className="text-[var(--primary)]">CODES</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-md hover:bg-[var(--muted)]"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            {!authenticated ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <a
                href="/profiles"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
              >
                Dashboard
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-md text-[var(--foreground)]"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-[var(--border)]"
          >
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-md hover:bg-[var(--muted)]"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-3">
                {!authenticated ? (
                  <>
                    <a href="/login" className="py-2 text-sm font-medium text-center text-[var(--muted-foreground)] border border-[var(--border)] rounded-lg">
                      Login
                    </a>
                    <a href="/register" className="py-2 text-sm font-semibold text-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]">
                      Sign Up
                    </a>
                  </>
                ) : (
                  <a href="/profiles" className="py-2 text-sm font-semibold text-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]">
                    Dashboard
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

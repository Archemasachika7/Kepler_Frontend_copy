import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome } from "lucide-react";

type AuthMode = "login" | "signup";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    console.log(`OAuth sign-in with ${provider}`);
    window.location.href = "/login";
  };

  const handleCredentialsSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Credentials sign-in:", formData.email);
    window.location.href = "/login";
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Sign up:", formData.email);
    window.location.href = "/register";
  };

  const handleSubmit = mode === "login" ? handleCredentialsSignIn : handleSignUp;

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-2">
          {mode === "login"
            ? "Sign in to continue your learning journey"
            : "Start your journey with Kepler Codes today"}
        </p>
      </motion.div>

      {/* OAuth buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleOAuthSignIn("google")}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors disabled:opacity-50"
        >
          <Chrome className="w-4 h-4" />
          Continue with Google
        </button>
        <button
          onClick={() => handleOAuthSignIn("github")}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors disabled:opacity-50"
        >
          <Github className="w-4 h-4" />
          Continue with GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[var(--background)] px-3 text-[var(--muted-foreground)]">or continue with email</span>
        </div>
      </div>

      {/* Form */}
      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-shadow"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-shadow"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder={mode === "login" ? "Enter your password" : "Create a password"}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-shadow"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === "login" && (
            <div className="flex justify-end">
              <button type="button" className="text-xs text-[var(--primary)] hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[var(--primary-foreground)] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {mode === "login" ? "Sign In" : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>
      </AnimatePresence>

      {/* Toggle mode */}
      <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setIsLoading(false);
          }}
          className="text-[var(--primary)] font-medium hover:underline"
        >
          {mode === "login" ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

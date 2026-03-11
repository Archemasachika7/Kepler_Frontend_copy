import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Eye, EyeOff } from "lucide-react";

const spinnerFrames = ["\\", "|", "/", "-"];

const oauthProviders = [
  {
    id: "github",
    label: "Continue with GitHub",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    bgClass: "bg-[#24292F] hover:bg-[#2d3339] text-white",
    primary: true,
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
    bgClass: "bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-700",
    primary: false,
  },
];

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) return;
    const interval = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % spinnerFrames.length);
    }, 150);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleOAuthSignIn = useCallback((providerId: string) => {
    setIsSubmitting(true);
    window.location.href = "/login";
  }, []);

  const handleCredentialsSignIn = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || !password.trim()) return;
      setIsSubmitting(true);
      setError("");
      window.location.href = "/login";
    },
    [email, password]
  );

  const handleSignUp = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !email.trim() || !password.trim()) return;
      setIsSubmitting(true);
      setError("");
      setSuccess("");
      window.location.href = "/register";
    },
    [name, email, password]
  );

  const focusRingStyle = (field: string) =>
    focusedField === field
      ? "0 0 0 1px rgba(96,165,250,0.5), 0 0 20px rgba(96,165,250,0.1)"
      : "0 0 0 1px transparent";

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm font-mono placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none transition-colors";

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full min-h-screen px-6 sm:px-12 bg-[var(--background)]">
      {/* Subtle background noise */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(128,128,128,0.15) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo — visible on mobile only */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <Code2 className="w-7 h-7 text-blue-400" />
          <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
            KEPLER <span className="text-blue-400">CODES</span>
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {mode === "signup"
              ? "Sign up to start your engineering journey."
              : "Sign in to your engineering workspace."}
          </p>
        </div>

        {/* Error / Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {mode === "signin" ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleCredentialsSignIn}>
                <div className="flex flex-col gap-3">
                  {/* Email */}
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-px rounded-lg pointer-events-none"
                      animate={{ boxShadow: focusRingStyle("signin-email") }}
                      transition={{ duration: 0.2 }}
                    />
                    <input
                      ref={emailRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("signin-email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="engineer@example.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-px rounded-lg pointer-events-none"
                      animate={{ boxShadow: focusRingStyle("signin-password") }}
                      transition={{ duration: 0.2 }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("signin-password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Password"
                      required
                      className={`${inputClass} pr-10`}
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

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting || !email.trim() || !password.trim()}
                  className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="font-mono flex items-center gap-2">
                      <span className="inline-block w-4 text-center">
                        [{spinnerFrames[spinnerIndex]}]
                      </span>
                      Authenticating...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-xs text-[var(--muted-foreground)] font-mono uppercase tracking-widest">
                  or
                </span>
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              </div>

              {/* OAuth Buttons */}
              <div className="flex flex-col gap-3">
                {oauthProviders.map((provider) => (
                  <motion.button
                    key={provider.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOAuthSignIn(provider.id)}
                    disabled={isSubmitting}
                    className={`
                      flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg
                      text-sm font-medium transition-all duration-200 cursor-pointer
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${provider.bgClass}
                      ${provider.primary ? "ring-1 ring-white/10" : ""}
                    `}
                  >
                    {provider.icon}
                    <span>{provider.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Switch to sign up */}
              <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                    setSuccess("");
                  }}
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-3">
                  {/* Name */}
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-px rounded-lg pointer-events-none"
                      animate={{ boxShadow: focusRingStyle("signup-name") }}
                      transition={{ duration: 0.2 }}
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField("signup-name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Full name"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-px rounded-lg pointer-events-none"
                      animate={{ boxShadow: focusRingStyle("signup-email") }}
                      transition={{ duration: 0.2 }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("signup-email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="engineer@example.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-px rounded-lg pointer-events-none"
                      animate={{ boxShadow: focusRingStyle("signup-password") }}
                      transition={{ duration: 0.2 }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("signup-password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Password (min 6 characters)"
                      required
                      minLength={6}
                      className={`${inputClass} pr-10`}
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

                {/* Sign Up Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting || !name.trim() || !email.trim() || !password.trim()}
                  className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="font-mono flex items-center gap-2">
                      <span className="inline-block w-4 text-center">
                        [{spinnerFrames[spinnerIndex]}]
                      </span>
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-xs text-[var(--muted-foreground)] font-mono uppercase tracking-widest">
                  or
                </span>
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              </div>

              {/* OAuth Buttons */}
              <div className="flex flex-col gap-3">
                {oauthProviders.map((provider) => (
                  <motion.button
                    key={provider.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOAuthSignIn(provider.id)}
                    disabled={isSubmitting}
                    className={`
                      flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg
                      text-sm font-medium transition-all duration-200 cursor-pointer
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${provider.bgClass}
                      ${provider.primary ? "ring-1 ring-white/10" : ""}
                    `}
                  >
                    {provider.icon}
                    <span>{provider.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Switch to sign in */}
              <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                    setSuccess("");
                  }}
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="mt-8 text-[11px] text-[var(--muted-foreground)] text-center leading-relaxed">
          By signing in, you agree to our{" "}
          <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-2">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}

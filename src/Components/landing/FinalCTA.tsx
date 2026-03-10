import { ScaleIn } from "./MotionWrappers";
import { ArrowRight, Rocket } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleIn>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 sm:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--primary)]/5" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h2 className="text-[28px] sm:text-[36px] font-semibold text-[var(--foreground)] tracking-tight mb-4">
                Ready to Start Your{" "}
                <span className="text-[var(--primary)]">Coding Journey</span>?
              </h2>
              <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto mb-8">
                Join 50,000+ developers who are learning, building, and getting hired through Kepler Codes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/login"
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pricing"
                  className="flex items-center gap-2 px-8 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}

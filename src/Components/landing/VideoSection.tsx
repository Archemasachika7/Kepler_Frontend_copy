import { FadeIn } from "./MotionWrappers";

export default function VideoSection() {
  return (
    <section id="video-section" className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Free Coding Tutorials
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              How We Teach <span className="text-[var(--primary)]">Differently</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Project-based learning with real-world applications and AI-powered guidance.
            </p>
          </div>
        </FadeIn>
        <div className="text-center text-sm text-[var(--muted-foreground)]">
          Video tutorials coming soon...
        </div>
      </div>
    </section>
  );
}

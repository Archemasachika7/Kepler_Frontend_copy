import { FadeIn, RevealSlow } from "./MotionWrappers";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote: "Kepler Codes transformed my career. The project-based learning and AI mentor helped me crack my dream job at Google.",
    avatar: "PS",
  },
  {
    name: "James Chen",
    role: "Full Stack Developer at Meta",
    quote: "The community here is incredible. Code reviews from peers and mentors gave me the confidence to ship production-quality code.",
    avatar: "JC",
  },
  {
    name: "Aisha Patel",
    role: "Backend Engineer at Amazon",
    quote: "I went from zero coding experience to getting hired at Amazon in 8 months. The structured curriculum made all the difference.",
    avatar: "AP",
  },
  {
    name: "Marcus Johnson",
    role: "DevOps Engineer at Netflix",
    quote: "The hands-on projects and industry tools training set Kepler apart. I was production-ready from day one at my new job.",
    avatar: "MJ",
  },
  {
    name: "Sarah Kim",
    role: "ML Engineer at NVIDIA",
    quote: "The AI/ML track was exactly what I needed. Real datasets, real problems, and mentors who actually work in the field.",
    avatar: "SK",
  },
  {
    name: "David Okonkwo",
    role: "Frontend Developer at Adobe",
    quote: "Kepler's career support was amazing. Resume reviews, mock interviews, and the hiring partner network helped me land multiple offers.",
    avatar: "DO",
  },
];

export default function Community() {
  return (
    <section className="py-24 bg-[var(--muted)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Community
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Hear from Our{" "}
              <span className="text-[var(--primary)]">Community</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              Join thousands of developers who transformed their careers with Kepler Codes.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <RevealSlow key={testimonial.name}>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-colors h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-sm font-semibold text-[var(--primary)]">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            </RevealSlow>
          ))}
        </div>
      </div>
    </section>
  );
}

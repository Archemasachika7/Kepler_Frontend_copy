import { FadeIn } from "./MotionWrappers";
import { Play, ExternalLink } from "lucide-react";

const freeResources = [
  {
    title: "Introduction to Python",
    type: "Video Course",
    duration: "2h 30m",
    thumbnail: "🐍",
  },
  {
    title: "Web Development Basics",
    type: "Video Course",
    duration: "3h 15m",
    thumbnail: "🌐",
  },
  {
    title: "Data Structures 101",
    type: "Video Course",
    duration: "1h 45m",
    thumbnail: "🏗️",
  },
  {
    title: "Git & GitHub Essentials",
    type: "Video Course",
    duration: "1h 20m",
    thumbnail: "📦",
  },
];

const freeArticles = [
  {
    title: "How to Start Your Coding Journey",
    readTime: "5 min read",
    tag: "Beginner",
  },
  {
    title: "Top 10 Programming Languages in 2025",
    readTime: "8 min read",
    tag: "Guide",
  },
  {
    title: "Building Your First REST API",
    readTime: "12 min read",
    tag: "Tutorial",
  },
];

export default function FreeContent() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Free Resources
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Start Learning for{" "}
              <span className="text-[var(--primary)]">Free</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              Access our library of free courses and articles to kickstart your coding journey.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video courses */}
          <FadeIn>
            <div>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-6 flex items-center gap-2">
                <Play className="w-5 h-5 text-[var(--primary)]" />
                Free Video Courses
              </h3>
              <div className="space-y-4">
                {freeResources.map((resource) => (
                  <div
                    key={resource.title}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[var(--muted)] flex items-center justify-center text-2xl shrink-0">
                      {resource.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                        {resource.title}
                      </h4>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {resource.type} · {resource.duration}
                      </p>
                    </div>
                    <Play className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Articles */}
          <FadeIn>
            <div>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-[var(--primary)]" />
                Free Articles & Tutorials
              </h3>
              <div className="space-y-4">
                {freeArticles.map((article) => (
                  <div
                    key={article.title}
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
                          {article.tag}
                        </span>
                        <h4 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">
                          {article.readTime}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

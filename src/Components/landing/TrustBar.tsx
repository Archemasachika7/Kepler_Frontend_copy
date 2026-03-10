import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";

const companies = [
  "Google", "Amazon", "Microsoft", "NVIDIA", "TCS", "Infosys",
  "Meta", "Apple", "Netflix", "Adobe", "Salesforce", "Oracle",
];

export default function TrustBar() {
  return (
    <section className="py-16 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-sm font-medium text-[var(--muted-foreground)] mb-8 tracking-wide uppercase">
            Our students work at top companies worldwide
          </p>
        </FadeIn>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-[var(--background)] z-10" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-[var(--background)] z-10" aria-hidden="true" />
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...companies, ...companies].map((company, i) => (
              <div
                key={`${company}-${i}`}
                className="flex-shrink-0 px-6 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
              >
                <span className="text-sm font-semibold text-[var(--muted-foreground)] whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

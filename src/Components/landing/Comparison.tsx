import { FadeIn } from "./MotionWrappers";
import { Check, X } from "lucide-react";

const features = [
  { feature: "Structured Curriculum", kepler: true, others: "Partial" },
  { feature: "AI-Powered Mentoring", kepler: true, others: false },
  { feature: "Real-World Projects", kepler: true, others: "Limited" },
  { feature: "Industry Tool Training", kepler: true, others: false },
  { feature: "Career Support", kepler: true, others: "Partial" },
  { feature: "Hiring Partner Network", kepler: true, others: false },
  { feature: "Community & Peer Reviews", kepler: true, others: "Partial" },
  { feature: "Recognized Certifications", kepler: true, others: "Partial" },
  { feature: "In-Browser IDE", kepler: true, others: true },
  { feature: "Free Tier Available", kepler: true, others: true },
];

function StatusCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-red-500 mx-auto" />;
  }
  return (
    <span className="text-sm text-[var(--muted-foreground)]">{value}</span>
  );
}

export default function Comparison() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Comparison
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              How We{" "}
              <span className="text-[var(--primary)]">Compare</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              See how Kepler Codes stacks up against other learning platforms.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--foreground)]">
                    Feature
                  </th>
                  <th className="text-center p-4 text-sm font-medium text-[var(--primary)]">
                    Kepler Codes
                  </th>
                  <th className="text-center p-4 text-sm font-medium text-[var(--muted-foreground)]">
                    Others
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i < features.length - 1 ? "border-b border-[var(--border)]" : ""}
                  >
                    <td className="p-4 text-sm text-[var(--foreground)]">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center">
                      <StatusCell value={row.kepler} />
                    </td>
                    <td className="p-4 text-center">
                      <StatusCell value={row.others} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

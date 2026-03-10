import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started with coding basics.",
    features: [
      "Access to free courses",
      "Community forum access",
      "Basic code editor",
      "5 coding challenges/month",
      "Public profile",
    ],
    cta: "Get Started Free",
    href: "/login",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    description: "Everything you need to become a professional developer.",
    features: [
      "All Free features",
      "Full course library",
      "AI-powered code reviews",
      "Unlimited coding challenges",
      "Project portfolio builder",
      "Certificate of completion",
      "Priority support",
      "Mock interviews",
    ],
    cta: "Start Pro Trial",
    href: "/login",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams and organizations looking to upskill developers.",
    features: [
      "All Pro features",
      "Team management dashboard",
      "Custom learning paths",
      "Dedicated account manager",
      "API access",
      "SSO integration",
      "Analytics & reporting",
      "Custom certifications",
    ],
    cta: "Contact Sales",
    href: "/login",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-[var(--muted)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Pricing
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Simple, Transparent{" "}
              <span className="text-[var(--primary)]">Pricing</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              Choose the plan that fits your learning goals. Upgrade or cancel anytime.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={`relative p-6 rounded-xl border bg-[var(--card)] flex flex-col ${
                plan.popular
                  ? "border-[var(--primary)] shadow-lg shadow-[var(--primary)]/10 scale-105"
                  : "border-[var(--border)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-medium text-[var(--foreground)]">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[var(--foreground)]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span className="text-[var(--muted-foreground)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  plan.popular
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"
                    : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

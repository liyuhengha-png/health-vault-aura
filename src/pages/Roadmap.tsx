import PublicLayout from "@/components/PublicLayout";
import { CheckCircle2, Clock, Circle } from "lucide-react";

const phases = [
  {
    status: "completed",
    quarter: "Q1 2025",
    title: "Foundation",
    items: [
      "Core platform architecture",
      "Pseudonymous profile system",
      "PDF health report parsing with AI",
      "Client-side encryption framework",
      "Basic consent management",
    ],
  },
  {
    status: "current",
    quarter: "Q2 2025",
    title: "Community & Sharing",
    items: [
      "Profile search & matching engine",
      "Fee-gated private messaging",
      "Enhanced de-identification pipeline",
      "On-chain consent audit trail",
      "Wearable data integration (Apple Health)",
    ],
  },
  {
    status: "upcoming",
    quarter: "Q3 2025",
    title: "Research & Institutions",
    items: [
      "Institutional research portal",
      "Campaign management for studies",
      "Aggregate analytics dashboard",
      "Multi-party consent workflows",
      "API for third-party integrations",
    ],
  },
  {
    status: "upcoming",
    quarter: "Q4 2025",
    title: "Scale & Governance",
    items: [
      "DAO governance framework",
      "Data marketplace with token incentives",
      "Cross-chain interoperability",
      "Mobile app (iOS & Android)",
      "Advanced privacy-preserving analytics (FHE)",
    ],
  },
];

const statusIcon = (status: string) => {
  if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
  if (status === "current") return <Clock className="w-5 h-5 text-primary animate-pulse" />;
  return <Circle className="w-5 h-5 text-muted-foreground/40" />;
};

export default function Roadmap() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
              Roadmap
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Product Roadmap</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our vision for building the most trusted health data platform. Transparency in development, just like in data.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {phases.map((phase) => (
              <div
                key={phase.quarter}
                className={`vault-card p-6 md:p-8 ${phase.status === "current" ? "border-primary/30 bg-primary/[0.02]" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{statusIcon(phase.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-primary/60 uppercase tracking-wider">{phase.quarter}</span>
                      {phase.status === "current" && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase">In Progress</span>
                      )}
                      {phase.status === "completed" && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase">Complete</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${phase.status === "completed" ? "bg-emerald-400" : phase.status === "current" ? "bg-primary" : "bg-muted-foreground/30"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

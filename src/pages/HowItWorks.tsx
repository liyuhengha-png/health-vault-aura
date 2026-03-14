import PublicLayout from "@/components/PublicLayout";
import { Shield, Upload, Search, MessageSquare, Lock, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Shield,
    step: "01",
    title: "Create a Pseudonymous Profile",
    desc: "Sign up with just a pseudonym and email. No real name, no KYC. Your identity stays private from day one.",
    details: [
      "Choose any pseudonym you like",
      "Connect your crypto wallet for on-chain verification",
      "No personal information is ever stored on-chain",
    ],
  },
  {
    icon: Upload,
    step: "02",
    title: "Upload & Encrypt Health Data",
    desc: "Upload PDFs, images, or manually enter your health records. All data is encrypted before it ever leaves your device.",
    details: [
      "AI-powered extraction from PDF reports",
      "Client-side encryption with your keys",
      "Categorized automatically: labs, vitals, imaging, and more",
    ],
  },
  {
    icon: Lock,
    step: "03",
    title: "De-identify & Control Sharing",
    desc: "Strip all personal identifiers before making any data searchable. You choose exactly what others can see.",
    details: [
      "Automatic PII removal engine",
      "Granular consent controls per data category",
      "On-chain audit trail for every access",
    ],
  },
  {
    icon: Search,
    step: "04",
    title: "Find Similar Profiles",
    desc: "Search for people with similar conditions, medications, or health profiles — all pseudonymously.",
    details: [
      "Match by condition, medication, or demographics",
      "See match percentage based on profile similarity",
      "All profiles remain fully de-identified",
    ],
  },
  {
    icon: MessageSquare,
    step: "05",
    title: "Connect & Collaborate",
    desc: "Send fee-gated private messages, participate in research studies, and share data on your terms.",
    details: [
      "End-to-end encrypted messaging",
      "Escrow-protected fee system",
      "Institutional research invitations with consent",
    ],
  },
];

export default function HowItWorks() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
              Platform Overview
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How HealthVault Works</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five simple steps from sign-up to full control of your health data. No compromises on privacy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((s, i) => (
              <div key={s.step} className="vault-card-hover p-6 md:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs text-primary/60 mb-1">STEP {s.step}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground mb-4">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                          {d}
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

import PublicLayout from "@/components/PublicLayout";
import { Shield, CheckCircle2, FileText, Globe } from "lucide-react";

const standards = [
  {
    icon: Shield,
    title: "HIPAA Compliance",
    desc: "HealthVault is designed to meet all HIPAA Privacy and Security Rule requirements for Protected Health Information (PHI).",
    items: ["Administrative safeguards", "Physical safeguards", "Technical safeguards", "Breach notification procedures"],
  },
  {
    icon: Globe,
    title: "GDPR Alignment",
    desc: "Our platform aligns with GDPR principles for data protection, including the right to erasure, portability, and explicit consent.",
    items: ["Right to access", "Right to erasure", "Data portability", "Explicit consent management"],
  },
  {
    icon: FileText,
    title: "SOC 2 Type II",
    desc: "Our infrastructure and processes are regularly audited against SOC 2 criteria for security, availability, and confidentiality.",
    items: ["Annual audits", "Continuous monitoring", "Incident response", "Change management"],
  },
  {
    icon: CheckCircle2,
    title: "IRB-Ready Research",
    desc: "Our research portal is built to support IRB-approved studies with proper informed consent workflows.",
    items: ["Informed consent tracking", "De-identification verification", "Audit trail for data access", "Consent withdrawal support"],
  },
];

export default function Compliance() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
              Compliance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Compliance & Standards</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              HealthVault is built to meet the highest regulatory standards for health data management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {standards.map((s) => (
              <div key={s.title} className="vault-card-hover p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

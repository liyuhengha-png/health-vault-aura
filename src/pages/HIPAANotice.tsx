import PublicLayout from "@/components/PublicLayout";
import { Shield, CheckCircle2 } from "lucide-react";

const sections = [
  {
    title: "Our HIPAA Commitment",
    content: "HealthVault is designed with HIPAA compliance as a core architectural principle. While HealthVault is a decentralized platform and not a traditional Covered Entity, we implement all applicable HIPAA safeguards to protect your Protected Health Information (PHI).",
  },
  {
    title: "Technical Safeguards",
    items: [
      "AES-256 encryption for all health data at rest and in transit",
      "User-controlled encryption keys derived from wallet signatures",
      "Automatic session management and access controls",
      "Audit logging of all data access events on the blockchain",
      "Unique user identification through pseudonymous profiles",
    ],
  },
  {
    title: "Administrative Safeguards",
    items: [
      "Regular security training for all team members",
      "Background checks for personnel with system access",
      "Incident response and breach notification procedures",
      "Risk analysis and management processes",
      "Business Associate Agreements with all service providers",
    ],
  },
  {
    title: "Physical Safeguards",
    items: [
      "Infrastructure hosted in SOC 2 certified data centers",
      "Multi-factor authentication for all administrative access",
      "Encrypted backups with geographic distribution",
      "Hardware security modules for key management",
    ],
  },
  {
    title: "Your Rights Under HIPAA",
    content: "Under HIPAA, you have the right to access your health information, request corrections, obtain an accounting of disclosures, and request restrictions on how your information is used. HealthVault's Consent Center makes exercising these rights simple and transparent.",
  },
];

export default function HIPAANotice() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">HIPAA Notice</h1>
                <p className="text-muted-foreground">Last updated: March 2025</p>
              </div>
            </div>

            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.title} className="vault-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-3">{s.title}</h2>
                  {s.content && <p className="text-muted-foreground leading-relaxed">{s.content}</p>}
                  {s.items && (
                    <ul className="space-y-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

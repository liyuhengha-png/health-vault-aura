import PublicLayout from "@/components/PublicLayout";
import { Shield, Lock, Key, Eye, Server, CheckCircle2 } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All health data is encrypted on your device before it's uploaded. We never see or store unencrypted health records.",
  },
  {
    icon: Key,
    title: "User-Controlled Keys",
    desc: "Your encryption keys are derived from your wallet. Only you can decrypt your data — not even HealthVault can access it.",
  },
  {
    icon: Eye,
    title: "Zero-Knowledge Architecture",
    desc: "Our backend processes encrypted data without ever decrypting it. We literally cannot read your health records.",
  },
  {
    icon: Shield,
    title: "On-Chain Audit Trail",
    desc: "Every consent grant, data access, and sharing event is recorded on the blockchain for full transparency.",
  },
  {
    icon: Server,
    title: "Decentralized Storage",
    desc: "Health data fragments are distributed across multiple nodes. No single point of failure or breach can expose your data.",
  },
  {
    icon: CheckCircle2,
    title: "Regular Security Audits",
    desc: "Our smart contracts and infrastructure undergo regular third-party security audits to ensure the highest standards.",
  },
];

export default function Security() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
              Security
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Enterprise-Grade Security</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built from the ground up with security as the foundation. Your health data deserves nothing less.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {securityFeatures.map((f) => (
              <div key={f.title} className="vault-card-hover p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

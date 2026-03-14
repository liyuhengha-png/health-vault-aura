import PublicLayout from "@/components/PublicLayout";

const sections = [
  {
    title: "1. Information We Collect",
    content: "HealthVault collects minimal information: your pseudonym, email address (private), and wallet address. Health data you upload is encrypted and we cannot access its contents. We collect basic usage analytics (page views, feature usage) to improve the platform.",
  },
  {
    title: "2. How We Use Your Information",
    content: "Your email is used solely for account recovery and critical security notifications. Your pseudonym is your public identifier on the platform. Usage analytics are aggregated and anonymized. We never sell, rent, or share your personal information with third parties.",
  },
  {
    title: "3. Data Encryption",
    content: "All health data is encrypted using AES-256 encryption before it leaves your device. Encryption keys are derived from your wallet signature. HealthVault staff cannot decrypt or access your health data under any circumstances.",
  },
  {
    title: "4. Data Sharing",
    content: "Health data is only shared when you explicitly grant consent through the Consent Center. Shared data is always de-identified — personal identifiers are stripped before sharing. You can revoke consent at any time, which immediately terminates access.",
  },
  {
    title: "5. On-Chain Data",
    content: "Only consent records, access logs, and encrypted metadata are stored on the blockchain. No raw health data is ever written to the blockchain. On-chain records provide an immutable audit trail of all data access events.",
  },
  {
    title: "6. Data Retention",
    content: "You can delete your account and all associated data at any time. Upon account deletion, all encrypted health data is permanently destroyed. On-chain consent records remain as they are immutable, but are no longer linked to active data.",
  },
  {
    title: "7. Third-Party Services",
    content: "We use AI services for PDF parsing and data extraction. Health data is transmitted securely to these services for processing only and is not stored by them. No third-party service has persistent access to your health data.",
  },
  {
    title: "8. Your Rights",
    content: "You have the right to access, correct, and delete all your data. You have the right to export your data in standard formats. You have the right to know exactly who has accessed your data and when.",
  },
];

export default function PrivacyPolicy() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: March 2025</p>
            </div>
            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.title}>
                  <h2 className="text-lg font-semibold text-foreground mb-2">{s.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

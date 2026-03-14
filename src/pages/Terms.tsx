import PublicLayout from "@/components/PublicLayout";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using HealthVault, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform. HealthVault reserves the right to modify these terms at any time, with notification provided to registered users.",
  },
  {
    title: "2. User Accounts",
    content: "You are responsible for maintaining the confidentiality of your wallet credentials and account information. You agree to notify us immediately of any unauthorized access. HealthVault accounts are pseudonymous by design — you are not required to provide your real name.",
  },
  {
    title: "3. Health Data Ownership",
    content: "You retain full ownership of all health data you upload to HealthVault. We do not claim any rights to your data. You control who can access your data and can revoke access at any time through the Consent Center.",
  },
  {
    title: "4. Data Processing",
    content: "When you upload health documents, our AI system processes them to extract structured medical indicators. This processing occurs on our servers but the results are encrypted before storage. We do not use your health data for training AI models.",
  },
  {
    title: "5. Messaging & Fees",
    content: "Private messaging on HealthVault uses a fee-gated system with escrow protection. Message fees are determined by the recipient and held in escrow until the message is accepted. Declined messages result in fee refunds minus gas costs.",
  },
  {
    title: "6. Research Participation",
    content: "Participation in research studies is entirely voluntary. You may withdraw consent at any time. Research institutions must comply with IRB requirements and can only access de-identified data that you have explicitly consented to share.",
  },
  {
    title: "7. Prohibited Uses",
    content: "You may not use HealthVault to upload fraudulent health data, impersonate others, attempt to de-anonymize other users, or engage in any activity that violates applicable laws or regulations.",
  },
  {
    title: "8. Limitation of Liability",
    content: "HealthVault is not a medical provider and does not offer medical advice. The platform is provided \"as is\" without warranties. We are not liable for any decisions made based on data displayed on the platform.",
  },
];

export default function Terms() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
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

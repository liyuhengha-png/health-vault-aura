import PublicLayout from "@/components/PublicLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical, Users, Shield, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    title: "Launch Research Campaigns",
    desc: "Create targeted campaigns to recruit participants based on specific health conditions, medications, or demographics.",
  },
  {
    icon: Users,
    title: "Consent-Based Recruitment",
    desc: "Every participant explicitly consents before sharing any data. Full transparency and audit trail for compliance.",
  },
  {
    icon: Shield,
    title: "De-Identified Data Only",
    desc: "Access aggregate and individual de-identified health data. Personal identifiers are never shared with researchers.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Monitor campaign performance, response rates, and data quality metrics in real-time from your institution dashboard.",
  },
];

export default function ResearchPortal() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
              For Institutions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Research Portal</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recruit participants ethically, access de-identified health data, and run compliant research campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {features.map((f) => (
              <div key={f.title} className="vault-card-hover p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/institutions">
              <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 shadow-teal gap-2">
                Learn More About Institutions <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

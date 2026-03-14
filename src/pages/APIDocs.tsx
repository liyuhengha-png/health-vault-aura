import PublicLayout from "@/components/PublicLayout";
import { Code, Key, Globe, Shield } from "lucide-react";

const endpoints = [
  {
    method: "POST",
    path: "/api/health/parse",
    desc: "Upload a PDF health report and receive structured, AI-extracted medical indicators.",
    auth: "API Key",
  },
  {
    method: "GET",
    path: "/api/profiles/search",
    desc: "Search de-identified health profiles by condition, medication, or demographics.",
    auth: "API Key + Consent Token",
  },
  {
    method: "POST",
    path: "/api/messages/send",
    desc: "Send a fee-gated private message to another pseudonymous profile.",
    auth: "API Key + Wallet Signature",
  },
  {
    method: "GET",
    path: "/api/consent/grants",
    desc: "List all active consent grants and their scopes for the authenticated user.",
    auth: "API Key + Wallet Signature",
  },
];

export default function APIDocs() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
              Developer Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">API Documentation</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Integrate HealthVault into your research tools, EHR systems, or health applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Code, label: "RESTful API", sub: "Simple JSON endpoints" },
              { icon: Key, label: "API Keys", sub: "Secure authentication" },
              { icon: Globe, label: "CORS Enabled", sub: "Cross-origin support" },
              { icon: Shield, label: "Rate Limited", sub: "Fair usage policy" },
            ].map((item) => (
              <div key={item.label} className="vault-card p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-semibold text-foreground text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((ep) => (
                <div key={ep.path} className="vault-card p-5">
                  <div className="flex items-start gap-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${ep.method === "GET" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {ep.method}
                    </span>
                    <div className="flex-1">
                      <code className="text-sm font-mono font-semibold text-foreground">{ep.path}</code>
                      <p className="text-sm text-muted-foreground mt-1">{ep.desc}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">Auth:</span> {ep.auth}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

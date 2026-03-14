import PublicLayout from "@/components/PublicLayout";
import { Cookie } from "lucide-react";

const sections = [
  {
    title: "What Are Cookies?",
    content: "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.",
  },
  {
    title: "Essential Cookies",
    content: "These cookies are necessary for the platform to function. They handle authentication state, session management, and security features. You cannot opt out of essential cookies as they are required for basic functionality.",
    required: true,
  },
  {
    title: "Preference Cookies",
    content: "These cookies remember your settings such as theme preference (dark/light mode), sidebar state, and language selection. Disabling these cookies will reset your preferences on each visit.",
    required: false,
  },
  {
    title: "Analytics Cookies",
    content: "We use minimal analytics to understand how users interact with the platform. All analytics data is anonymized and aggregated. We do not use third-party analytics services that track users across websites.",
    required: false,
  },
  {
    title: "What We Don't Do",
    content: "HealthVault does not use advertising cookies, tracking pixels, or any form of cross-site tracking. We do not sell cookie data to third parties. We do not use cookies to build user profiles for targeted advertising.",
  },
  {
    title: "Managing Cookies",
    content: "You can manage cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that blocking essential cookies may prevent you from using HealthVault.",
  },
];

export default function CookiePolicy() {
  return (
    <PublicLayout>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Cookie Policy</h1>
                <p className="text-muted-foreground">Last updated: March 2025</p>
              </div>
            </div>

            <div className="space-y-6">
              {sections.map((s) => (
                <div key={s.title} className="vault-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
                    {s.required !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.required ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                        {s.required ? "Required" : "Optional"}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

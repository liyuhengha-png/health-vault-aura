import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Image, Cpu, CheckCircle2, Plus, Trash2, AlertCircle } from "lucide-react";

const categories = [
  { label: "Conditions & Diagnoses", count: 2, color: "bg-red-50 text-red-700 border-red-200" },
  { label: "Medications", count: 3, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Lab Results", count: 8, color: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Vitals", count: 4, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { label: "Wearable Data", count: 1, color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Imaging / Reports", count: 6, color: "bg-pink-50 text-pink-700 border-pink-200" },
];

const uploadMethods = [
  { icon: FileText, label: "Upload PDF / Image", desc: "Blood reports, discharge summaries, prescriptions", accent: "primary" },
  { icon: Cpu, label: "Apple Health Export", desc: "Import your Apple Health XML export file", accent: "blue" },
  { icon: Plus, label: "Manual Entry", desc: "Type in conditions, medications, or test results", accent: "purple" },
];

const recentUploads = [
  { name: "Blood_Panel_March2025.pdf", status: "parsed", size: "1.2 MB", date: "Mar 7, 2025", records: 12 },
  { name: "ECG_Report_Feb2025.pdf", status: "parsed", size: "890 KB", date: "Feb 20, 2025", records: 3 },
  { name: "Prescription_Jan2025.png", status: "parsed", size: "420 KB", date: "Jan 15, 2025", records: 2 },
];

export default function HealthDataUpload() {
  const [dragging, setDragging] = useState(false);

  return (
    <AppLayout title="Health Data">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Health Data Upload</h2>
          <p className="text-muted-foreground text-sm">Upload documents or enter data manually. All data is encrypted before storage.</p>
        </div>

        {/* Upload zone */}
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragging ? "border-primary bg-accent/30" : "border-border hover:border-primary/40 hover:bg-muted/30"}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={() => setDragging(false)}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <Upload className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Drop your health files here</div>
              <div className="text-sm text-muted-foreground">Supports PDF, PNG, JPG, Apple Health XML · Max 50MB</div>
            </div>
            <Button className="gap-2 bg-primary text-primary-foreground hover:opacity-90 shadow-teal">
              <Upload className="w-4 h-4" /> Browse Files
            </Button>
          </div>
        </div>

        {/* Upload methods */}
        <div className="grid md:grid-cols-3 gap-4">
          {uploadMethods.map((m) => (
            <div key={m.label} className="vault-card-hover p-6 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
                <m.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="font-medium text-foreground text-sm mb-1">{m.label}</div>
              <div className="text-xs text-muted-foreground">{m.desc}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Parsed categories */}
          <div className="vault-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> Auto-Parsed Categories
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <div key={cat.label} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium ${cat.color}`}>
                  <span className="truncate">{cat.label}</span>
                  <span className="ml-2 flex-shrink-0 font-bold">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manual entry */}
          <div className="vault-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" /> Quick Manual Entry
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Condition / Diagnosis</label>
                <Input placeholder="e.g. Type 2 Diabetes" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Medication</label>
                <Input placeholder="e.g. Metformin 500mg daily" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Lab Result</label>
                <Input placeholder="e.g. HbA1c: 6.8%" />
              </div>
              <Button size="sm" className="w-full gap-2 bg-primary text-primary-foreground hover:opacity-90">
                <Plus className="w-3.5 h-3.5" /> Add Entry
              </Button>
            </div>
          </div>
        </div>

        {/* Recent uploads */}
        <div className="vault-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Recent Uploads
          </h3>
          <div className="space-y-2">
            {recentUploads.map((upload) => (
              <div key={upload.name} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{upload.name}</div>
                  <div className="text-xs text-muted-foreground">{upload.size} · {upload.date} · {upload.records} records parsed</div>
                </div>
                <span className="status-active flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3" /> Parsed
                </span>
                <button className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* De-ID notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-accent border border-primary/20">
          <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-accent-foreground">
            <strong>De-identification is automatic.</strong> Before any data is made searchable or shared, personal identifiers (name, DOB, address) are stripped. You can review de-identified data in your <a href="/consent" className="underline">Consent Center</a>.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

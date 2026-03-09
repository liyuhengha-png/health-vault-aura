import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2, Cpu, FileText, Loader2, Plus, Trash2, Upload } from "lucide-react";

type ParsedIndicator = {
  id: string;
  name: string;
  category: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: string;
};

type ParseResponse = {
  fileName: string;
  contentType?: string;
  indicatorCount: number;
  indicators: ParsedIndicator[];
};

const categoryStyles: Record<string, string> = {
  "Conditions & Diagnoses": "bg-red-50 text-red-700 border-red-200",
  Medications: "bg-blue-50 text-blue-700 border-blue-200",
  "Lab Results": "bg-purple-50 text-purple-700 border-purple-200",
  Vitals: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Wearable Data": "bg-amber-50 text-amber-700 border-amber-200",
  "Imaging / Reports": "bg-pink-50 text-pink-700 border-pink-200",
};

const categoryOrder = [
  "Conditions & Diagnoses",
  "Medications",
  "Lab Results",
  "Vitals",
  "Wearable Data",
  "Imaging / Reports",
];

const uploadMethods = [
  { icon: FileText, label: "Upload PDF / Image", desc: "Blood reports, discharge summaries, prescriptions" },
  { icon: Cpu, label: "Apple Health Export", desc: "Import your Apple Health XML export file" },
  { icon: Plus, label: "Manual Entry", desc: "Type in conditions, medications, or test results" },
];

const recentUploads = [
  { name: "Blood_Panel_March2025.pdf", status: "parsed", size: "1.2 MB", date: "Mar 7, 2025", records: 12 },
  { name: "ECG_Report_Feb2025.pdf", status: "parsed", size: "890 KB", date: "Feb 20, 2025", records: 3 },
  { name: "Prescription_Jan2025.png", status: "parsed", size: "420 KB", date: "Jan 15, 2025", records: 2 },
];

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function HealthDataUpload() {
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParseResponse | null>(null);
  const [selectedIndicatorIds, setSelectedIndicatorIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    parsedData?.indicators.forEach((indicator) => {
      counts.set(indicator.category, (counts.get(indicator.category) ?? 0) + 1);
    });

    return categoryOrder.map((label) => ({
      label,
      count: counts.get(label) ?? 0,
      color: categoryStyles[label],
    }));
  }, [parsedData]);

  const handleIndicatorToggle = (indicatorId: string, checked: boolean) => {
    setSelectedIndicatorIds((current) => {
      if (checked) {
        return current.includes(indicatorId) ? current : [...current, indicatorId];
      }

      return current.filter((id) => id !== indicatorId);
    });
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setSelectedFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${apiBaseUrl}/api/health/parse`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data: ParseResponse = await response.json();
      setParsedData(data);
      setSelectedIndicatorIds(data.indicators.map((indicator) => indicator.id));

      toast({
        title: "File parsed",
        description: `${data.fileName} returned ${data.indicatorCount} indicators.`,
      });
    } catch (error) {
      setParsedData(null);
      setSelectedIndicatorIds([]);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unable to parse the selected file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadFile(file);
    event.target.value = "";
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    await uploadFile(file);
  };

  return (
    <AppLayout title="Health Data">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Health Data Upload</h2>
          <p className="text-muted-foreground text-sm">Upload documents or enter data manually. All data is encrypted before storage.</p>
        </div>

        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragging ? "border-primary bg-accent/30" : "border-border hover:border-primary/40 hover:bg-muted/30"}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.xml"
            onChange={handleFileSelection}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <Upload className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Drop your health files here</div>
              <div className="text-sm text-muted-foreground">Supports PDF, PNG, JPG, Apple Health XML | Max 50MB</div>
              {selectedFileName && <div className="text-xs text-primary mt-2">Selected file: {selectedFileName}</div>}
            </div>
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:opacity-90 shadow-teal"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isUploading ? "Parsing..." : "Browse Files"}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {uploadMethods.map((method) => (
            <div key={method.label} className="vault-card-hover p-6 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
                <method.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="font-medium text-foreground text-sm mb-1">{method.label}</div>
              <div className="text-xs text-muted-foreground">{method.desc}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="vault-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> Auto-Parsed Categories
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category.label} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium ${category.color}`}>
                  <span className="truncate">{category.label}</span>
                  <span className="ml-2 flex-shrink-0 font-bold">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

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

        <div className="vault-card p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Parsed Indicators
            </h3>
            <div className="text-xs text-muted-foreground">
              Selected {selectedIndicatorIds.length} / {parsedData?.indicators.length ?? 0}
            </div>
          </div>

          {!parsedData ? (
            <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              Upload a file to parse health indicators from the Python backend.
            </div>
          ) : (
            <div className="space-y-3">
              {parsedData.indicators.map((indicator) => {
                const isChecked = selectedIndicatorIds.includes(indicator.id);

                return (
                  <label
                    key={indicator.id}
                    className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${isChecked ? "border-primary bg-accent/40" : "border-border bg-background"}`}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => handleIndicatorToggle(indicator.id, checked === true)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">{indicator.name}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${categoryStyles[indicator.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                          {indicator.category}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground uppercase">
                          {indicator.status}
                        </span>
                      </div>
                      <div className="text-sm text-foreground">
                        {indicator.value} {indicator.unit}
                      </div>
                      {indicator.referenceRange && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Reference range: {indicator.referenceRange}
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

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
                  <div className="text-xs text-muted-foreground">{upload.size} | {upload.date} | {upload.records} records parsed</div>
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

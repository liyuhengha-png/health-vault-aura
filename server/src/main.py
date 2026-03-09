from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware


HARDCODED_INDICATORS = [
    {
        "id": "hba1c",
        "name": "HbA1c",
        "category": "Lab Results",
        "value": "6.8",
        "unit": "%",
        "referenceRange": "4.0-5.6",
        "status": "high",
    },
    {
        "id": "fasting_glucose",
        "name": "Fasting Glucose",
        "category": "Lab Results",
        "value": "126",
        "unit": "mg/dL",
        "referenceRange": "70-99",
        "status": "high",
    },
    {
        "id": "ldl",
        "name": "LDL Cholesterol",
        "category": "Lab Results",
        "value": "142",
        "unit": "mg/dL",
        "referenceRange": "<100",
        "status": "high",
    },
    {
        "id": "hdl",
        "name": "HDL Cholesterol",
        "category": "Lab Results",
        "value": "48",
        "unit": "mg/dL",
        "referenceRange": ">40",
        "status": "normal",
    },
    {
        "id": "triglycerides",
        "name": "Triglycerides",
        "category": "Lab Results",
        "value": "175",
        "unit": "mg/dL",
        "referenceRange": "<150",
        "status": "high",
    },
    {
        "id": "hemoglobin",
        "name": "Hemoglobin",
        "category": "Lab Results",
        "value": "13.4",
        "unit": "g/dL",
        "referenceRange": "12.0-16.0",
        "status": "normal",
    },
    {
        "id": "platelet_count",
        "name": "Platelet Count",
        "category": "Lab Results",
        "value": "248",
        "unit": "10^3/uL",
        "referenceRange": "150-450",
        "status": "normal",
    },
    {
        "id": "creatinine",
        "name": "Creatinine",
        "category": "Lab Results",
        "value": "0.94",
        "unit": "mg/dL",
        "referenceRange": "0.6-1.3",
        "status": "normal",
    },
    {
        "id": "blood_pressure",
        "name": "Blood Pressure",
        "category": "Vitals",
        "value": "128/82",
        "unit": "mmHg",
        "referenceRange": "<120/80",
        "status": "borderline",
    },
    {
        "id": "heart_rate",
        "name": "Heart Rate",
        "category": "Vitals",
        "value": "76",
        "unit": "bpm",
        "referenceRange": "60-100",
        "status": "normal",
    },
    {
        "id": "bmi",
        "name": "BMI",
        "category": "Vitals",
        "value": "27.1",
        "unit": "kg/m2",
        "referenceRange": "18.5-24.9",
        "status": "high",
    },
    {
        "id": "condition_t2d",
        "name": "Type 2 Diabetes",
        "category": "Conditions & Diagnoses",
        "value": "Confirmed",
        "unit": "",
        "referenceRange": "",
        "status": "active",
    },
    {
        "id": "med_metformin",
        "name": "Metformin",
        "category": "Medications",
        "value": "500 mg daily",
        "unit": "",
        "referenceRange": "",
        "status": "active",
    },
]


app = FastAPI(
    title="vital-key-chain server",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "vital-key-chain server is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/health/parse")
async def parse_health_file(file: UploadFile = File(...)) -> dict:
    return {
        "fileName": file.filename,
        "contentType": file.content_type,
        "indicatorCount": len(HARDCODED_INDICATORS),
        "indicators": HARDCODED_INDICATORS,
    }

from __future__ import annotations

import os
import sys
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile

# Ensure shared backend modules are importable in Vercel Functions.
ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from server.src.ark_client import build_ark_client
from server.src.pdf_parser import PDFParseError, extract_pdf_text
from server.src.summarizer import summarize_pdf_text

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB

app = FastAPI(title="health parse endpoint")


@app.post("/")
async def parse_health_file(file: UploadFile = File(...)) -> dict:
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename detected.")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only .pdf files are supported.")

    pdf_bytes = await file.read()
    if len(pdf_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    if len(pdf_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 20MB.")

    try:
        text, page_count = extract_pdf_text(pdf_bytes)
    except PDFParseError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    try:
        client = build_ark_client()
    except ValueError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    try:
        result = summarize_pdf_text(client, text, filename=file.filename)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"AI analysis failed: {exc}") from exc

    meta = result.get("meta")
    if isinstance(meta, dict):
        meta["page_count"] = page_count
        meta["filename"] = file.filename
        meta["max_file_size_mb"] = MAX_FILE_SIZE // (1024 * 1024)
        meta["ark_base_url"] = os.getenv("ARK_BASE_URL", "https://api.tu-zi.com/v1")

    return result

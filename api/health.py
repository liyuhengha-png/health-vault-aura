from __future__ import annotations

from fastapi import FastAPI

app = FastAPI(title="health endpoint")


@app.get("/")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

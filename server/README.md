# Server

This directory contains a minimal Python backend service for the project.

## Structure

```text
server/
├── requirements.txt
├── README.md
└── src/
    ├── __init__.py
    └── main.py
```

## Run

```bash
cd server
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

#!/usr/bin/env bash
# ─── 6E Creative Studio — Backend starter ────────────────────────────────────
set -e
cd "$(dirname "$0")"

# Create venv if missing
if [ ! -d ".venv" ]; then
  echo "📦  Creating virtual environment..."
  python3 -m venv .venv
fi

# Activate
source .venv/bin/activate

# Install / upgrade deps
echo "⬆️   Installing dependencies..."
pip install -q -r requirements.txt

echo ""
echo "🚀  Starting FastAPI on http://localhost:8000"
echo "    Docs: http://localhost:8000/docs"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

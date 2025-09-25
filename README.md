
# AppForge Bench (fixed bundle)

Use these steps (web only):
1) Delete any **docs-only** workflows under `.github/workflows/` (like `mkdocs.yml`, `deploy.yml`, etc.).
2) Upload everything in this ZIP to the repo root (replace existing files).
3) Go to **Settings ▸ Pages** → **Source: GitHub Actions**.
4) Open **Actions** and run **Build & Deploy (Next export + MkDocs via Pages)**.
5) Check:
   - `https://appforge-bench.github.io/` (Leaderboards site)
   - `https://appforge-bench.github.io/AppForge-Bench/` (Docs)

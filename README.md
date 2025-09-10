## 📊 AI-Powered Trend Analyzer

An end-to-end system that analyzes video datasets (e.g., YouTube CSV exports) to identify emerging trends using tags, keywords, and metadata.
Built with Next.js (frontend) and n8n (workflow automation + AI pipelines).

### 🚀 Features

- Upload and process CSV datasets containing video metadata.

- Extract top tags and keywords with trend status (emerging, stable, decaying).

- Prototype pipeline for trend analysis (decay/freshness indicators).

- Flexible hosting options (local, free cloud, or paid production).

### 🛠️ Tech Stack

- Frontend: Next.js (React, Tailwind, Vercel for hosting)

- Backend Workflow Engine: n8n (self-hosted via Railway, Render or n8n Cloud)

- File Handling: CSV ingestion via webhook

- Deployment/Hosting Options: Free (local/ngrok, Vercel, Railway, Render) or Paid (n8n Cloud, Railway/Render Pro plans)

## ⚙️ Setup & Usage
Clone Repo
```bash
git clone https://github.com/your-username/trend-analyzer.git
cd trend-analyzer
```

### Frontend (Next.js)

Install dependencies:
```bash
npm install
```
Run locally:
```bash
npm run dev
```
Now the app is available at http://localhost:3000.

### Backend (n8n Workflow Engine)
#### Option A: Run locally

Install n8n globally (through cmd):
```bash
npm install -g n8n
```

Start n8n:
```bash
n8n
```
Access workflow editor: http://localhost:5678

#### Option B: Expose locally with ngrok

Expose your n8n so Next.js can call it:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
ngrok http 5678
```

You’ll get a public URL like:
```bash
https://abcd1234.ngrok-free.app
```
Use this in your Next.js fetch calls.

#### Option C: Free Cloud Hosting

- Frontend (Next.js) → Deploy on Vercel

- Backend (n8n) → Deploy on:

- Railway/Render (free tier)

#### Option D: Paid Hosting

- n8n Cloud (managed SaaS)

- Paid tiers of Railway/Render for higher reliability

### 🌐 Environment Variables

For cloud deployment, configure these variables:
```bash
N8N_HOST=0.0.0.0
N8N_PORT=5678
N8N_EDITOR_BASE_URL=https://your-domain.com
WEBHOOK_TUNNEL_URL=https://your-domain.com
N8N_ENDPOINT_WEBHOOK=/webhook
N8N_API_ALLOW_CORS=true
```
(ℹ️ Railway auto-manages ports; explicit config may not be required.)

### 📂 Workflow Example

1. Webhook Node – Receive CSV file upload.

2. Spreadsheet File/Extract From File Node – Parse CSV data.

3. Function/Code Node – Extract tags, keywords, and calculate trend status.

4. Respond to Webhook – Return JSON result to Next.js frontend.

### 📦 Deployment Flow

- Frontend: Deploy to Vercel → production-ready instantly.

- Backend: Deploy n8n to Railway → expose webhook endpoints.

- Integration: Point Next.js fetch to your webhook URL.

### 📈 Roadmap / Future Work

- 🎵 Audio Analysis → Extract spoken keywords from videos using speech-to-text.

- 📊 Advanced ML Models → Predict trend lifecycle (growth, peak, decay).

- 🌍 Multi-Platform Support → Add TikTok, Instagram, Facebook, Xiaohongshu.

- 📈 Interactive Dashboard → Rich charts & visual insights for creators/marketers.

- 🔗 Real-Time APIs → Direct integration with YouTube/TikTok APIs instead of CSV uploads.
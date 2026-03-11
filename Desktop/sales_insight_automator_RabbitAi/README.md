# Sales Insight Automator (AI Cloud DevOps)

This is the repository for the **Sales Insight Automator**, built by the Cloud DevOps Engineering team for Rabbitt AI.

This full-stack application allows internal sales members to securely upload quarterly CSV/Excel datasets and automatically receive a concise, executive sales summary in their email, powered by the **Google Gemini Pro** LLM.

## Engineer's Log

### Stack Overview
- **Frontend**: Next.js (React), Tailwind CSS, Axios.
- **Backend**: FastAPI, Pandas, Google Generative AI (Gemini), SMTP Emailing.
- **Containerization**: Docker & Docker Compose (`python:3.10-slim`).
- **CI/CD Pipeline**: GitHub Actions (Linting + Build Checks).

### How I Secured the Endpoints
To protect the tool against common vulnerabilities and resource abuse while keeping it accessible internally, I applied the following:
1. **Rate Limiting**: Integrated `slowapi` into FastAPI, restricting the NLP/Email pipeline to **5 requests per minute per IP**, protecting against compute abuse and spamming.
2. **Strict Ingest Validation**: The file size is strictly capped at `5MB` using low-level byte-length checks dynamically before feeding into pandas. We validate exact `.csv` and `.xlsx` suffix typing.
3. **CORS Configuration**: Implemented `CORSMiddleware` (which should be bound tightly to the frontend origin in production).
4. **LLM Prompting Scoping**: The GenAI model is explicitly confined to specific prompt guardrails ("You are an expert sales analyst") to prevent arbitrary LLM manipulations.
5. **Secrets Management**: No secrets are committed. Everything relies securely on standard `.env` environment variables mapping seamlessly into Docker.

---

## 🚀 Running the Stack Locally

### 1. Configure the Environment
Within the `backend/` directory, copy the example environment file:
```bash
cp backend/.env.example backend/.env
```
Populate `backend/.env` with your actual API keys:
- `GEMINI_API_KEY`: Your Google AI Studio Key.
- `SMTP_PASSWORD`: Your App Password for sending emails.

### 2. Start the Application
You can spin up the entire isolated backend environment using Docker:
```bash
cd backend/
docker-compose up --build -d
```
The Swagger API documentation will instantly be available at `http://localhost:8000/docs`.

To run the Next.js Frontend locally:
```bash
cd frontend/
npm install
npm run dev
```
Access the application at `http://localhost:3000`.

---

## 🌍 Delivering & Deployment Strategy

To deploy to production quickly under the requested constraints:

**Frontend (Vercel):**
1. Push this repository to GitHub.
2. Link the repository directly in Vercel. Choose "Next.js" as the framework.
3. Set the `Next.js` root directory to `frontend/`. 

**Backend (Render):**
1. Link the same GitHub repository in Render using "Web Service".
2. Target the `backend/` directory.
3. Select Docker as the deployment type (Render detects the backend Dockerfile automatically).
4. Provide the exact environmental variables (`GEMINI_API_KEY`, etc.) inside the Render dashboard.

_Submission completed for AI Cloud DevOps._

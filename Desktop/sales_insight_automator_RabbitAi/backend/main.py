from fastapi import FastAPI, File, Form, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import EmailStr
import os
from dotenv import load_dotenv

from utils.file_parser import parse_sales_file
from ai_service import generate_summary
from email_service import send_summary_email

# Load environment variables
load_dotenv()

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Sales Insight Automator",
    description="API to generate executive sales summaries from CSV/XLSX files using Google Gemini API.",
    version="1.0.0"
)

# Secure the application with CORS middleware so frontend can call it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your Vercel frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom rate limit exception handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

MAX_FILE_SIZE_MB = 5
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

@app.post("/analyze-sales", summary="Analyze sales data and email summary")
@limiter.limit("5/minute")
async def analyze_sales(
    request: Request,
    email: EmailStr = Form(..., description="Email address to send the summary to."),
    file: UploadFile = File(..., description="Sales dataset (CSV or XLSX up to 5MB).")
):
    """
    Uploads a CSV or XLSX sales file and an email address.
    Generates an executive summary using Google Gemini AI and sends it to the provided email.
    """
    # 1. Validate file extension
    filename = file.filename.lower()
    if not (filename.endswith(".csv") or filename.endswith(".xlsx")):
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Only CSV and XLSX are allowed."
        )
        
    # 2. Validate file size limitation (Max 5MB)
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400, 
            detail=f"File size exceeds {MAX_FILE_SIZE_MB}MB limit."
        )
        
    try:
        # 3. Parse and convert the dataset to readable text
        data_text = parse_sales_file(contents, filename)
        
        # 4. Generate AI summary with Gemini
        summary = generate_summary(data_text)
        
        # 5. Send email via SMTP
        send_summary_email(email, summary)
        
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except RuntimeError as re:
        raise HTTPException(status_code=500, detail=str(re))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
        
    return {"message": "Summary generated and sent to email"}

if __name__ == "__main__":
    import uvicorn
    # Make sure to run the application with uvicorn directly if executed as a script
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

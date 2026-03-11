import os
import google.generativeai as genai

def generate_summary(data_text: str) -> str:

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""
You are an expert sales analyst.

Analyze the following sales dataset and generate an executive summary.

Include:
- Total revenue
- Top performing product category
- Regional trends
- Any anomalies (cancelled orders etc)
- A short executive summary paragraph

Dataset:
{data_text}
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        raise RuntimeError(f"Failed to generate summary: {str(e)}")

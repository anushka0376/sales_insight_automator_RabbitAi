import os
from google import genai

def generate_summary(data_text: str) -> str:
    """
    Sends the parsed sales data to Google Gemini to get an executive summary.
    """
    
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")
        
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert sales analyst. Please analyze the following sales data and generate a professional executive sales summary.
    
    The summary MUST include:
    - Total revenue
    - Top performing product category
    - Regional sales trends
    - Any anomalies (like cancelled orders)
    - A short executive-level narrative paragraph
    
    Here is the data:
    {data_text}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        raise RuntimeError(f"Failed to generate summary from AI: {str(e)}")

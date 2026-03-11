import os
import google.generativeai as genai

def generate_sales_summary(data_text: str) -> str:
    """
    Sends the parsed sales data to Google Gemini API to generate an executive summary.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set.")
        
    genai.configure(api_key=api_key)
    
    # Specify the model. gemini-1.5-flash has an excellent context window
    # that can comfortably fit up to 5MB worth of text data.
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    You are an expert sales analyst. Please analyze the following sales data and generate a professional executive sales summary.
    
    The summary MUST explicitly cover the following items:
    1. Total revenue
    2. Best performing product category
    3. Regional sales trends
    4. Any anomalies (e.g., cancelled orders, unusual spikes, or patterns)
    5. An executive-level narrative summary

    Here is the sales dataset:
    {data_text}
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise RuntimeError(f"Failed to generate summary from AI: {str(e)}")

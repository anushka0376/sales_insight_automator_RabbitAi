import pandas as pd
import io

def parse_sales_file(file_bytes: bytes, filename: str) -> str:
    """
    Parses the uploaded file bytes into a pandas DataFrame and converts it to a readable text format.
    """
    try:
        # Determine format based on file extension
        if filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(file_bytes))
        elif filename.endswith(".xlsx"):
            df = pd.read_excel(io.BytesIO(file_bytes))
        else:
            raise ValueError("Unsupported file format. Please upload CSV or XLSX.")
            
        # Convert the dataframe to a readable CSV text format (well-suited for LLMs)
        return df.to_csv(index=False)
        
    except ValueError as ve:
        raise ve
    except Exception as e:
        raise ValueError(f"Failed to parse dataset: {str(e)}")

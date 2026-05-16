import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env file
load_dotenv()

GEMINI_API_KEY = os.getenv("gemini_api")

# Clean up the key if there are spaces
if GEMINI_API_KEY:
    GEMINI_API_KEY = GEMINI_API_KEY.replace(" ", "")
    # Common typo: 'Alza' instead of 'AIza'
    if GEMINI_API_KEY.startswith("Alza"):
        print("Note: Found 'Alza' prefix, attempting to use it as 'AIza' (common typo)...")
        GEMINI_API_KEY = "AIza" + GEMINI_API_KEY[4:]

print(f"Testing Gemini with key: {GEMINI_API_KEY[:10]}...")

def test_gemini_api():
    if not GEMINI_API_KEY:
        print("Error: Missing gemini_api in .env")
        return

    try:
        genai.configure(api_key=GEMINI_API_KEY)
        
        # Use gemini-1.5-flash as a standard test model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        print("\nSending request to Gemini...")
        response = model.generate_content("Say hello and tell me what model you are.")
        
        print(f"Success!")
        print("-" * 30)
        print("Response:", response.text)
        print("-" * 30)
        
    except Exception as e:
        print(f"An error occurred with Gemini: {e}")

if __name__ == "__main__":
    test_gemini_api()

import requests

API_KEY = "AIzaSyD-ZLqNEGB_rQXcF_DuKK91TDMEqgKFa0A"
MODEL = "gemini-2.5-flash"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

def ask(prompt: str) -> str:
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    response = requests.post(URL, json=payload)
    response.raise_for_status()
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]

if _name_ == "_main_":
    print(f"Testing Gemini API ({MODEL})...\n")
    result = ask("Explain what an API is in one sentence.")
    print(f"Response: {result}")

import os
import httpx
from dotenv import load_dotenv

# Load .env file
load_dotenv()

MODEL_NAME = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-5-mini4")
URL = f"{os.getenv('AZURE_OPENAI_ENDPOINT')}openai/deployments/{MODEL_NAME}/chat/completions?api-version={os.getenv('AZURE_OPENAI_VERSION')}"
API_KEY = os.getenv("AZURE_OPENAI_KEY")

print(f"Testing with:")
print(f"Model: {MODEL_NAME}")
print(f"URL: {URL}")
print(f"API Key: {API_KEY[:5]}...{API_KEY[-5:] if API_KEY else ''}")

def test_azure_api():
    if not URL or not API_KEY:
        print("Error: Missing URL or API Key in .env")
        return

    headers = {
        "api-key": API_KEY,
        "Content-Type": "application/json"
    }

    # Standard Chat Completion payload for Responses API
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Say hello!"}
        ],
        "max_tokens": 100
    }

    print("\nSending request...")
    try:
        # Using a longer timeout for LLM responses
        response = httpx.post(URL, headers=headers, json=payload, timeout=30.0)
        
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Success!")
            print("Response:", response.json())
        else:
            print("Failed.")
            print("Response Text:", response.text)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_azure_api()

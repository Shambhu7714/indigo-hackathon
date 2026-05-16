import os
import uuid
from PIL import Image
from openai import AzureOpenAI
from google import genai
from google.genai import types

# -------------------------------------------------------------------------
# 1. Setup & Configuration
# -------------------------------------------------------------------------
AZURE_CONFIG = {
    "key": os.getenv("AZURE_OPENAI_KEY"),
    "version": os.getenv("AZURE_OPENAI_VERSION", "2024-05-01-preview"),
    "endpoint": os.getenv("AZURE_OPENAI_ENDPOINT"),
    "deployment": os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-5-mini4")
}

az_client = AzureOpenAI(
    api_key=AZURE_CONFIG["key"],
    api_version=AZURE_CONFIG["version"],
    azure_endpoint=AZURE_CONFIG["endpoint"]
)

gem_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def safe_extract_text(response):
    """Safely extracts text using getattr to avoid subscriptable errors."""
    try:
        choices = getattr(response, "choices", [])
        if not choices: return ""
        message = getattr(choices, "message", None)
        return getattr(message, "content", "").strip()
    except:
        return ""

# -------------------------------------------------------------------------
# PIPELINE
# -------------------------------------------------------------------------
def run_indigo_pipeline(topic, ref_files):
    print("🚀 Starting Executive IndiGo Pipeline...")

    # PHASE 1: Executive Caption
    print("🤖 Agent 1: Drafting Executive Narrative...")
    prompt = f"Write a formal LinkedIn post for IndiGo: {topic}. Tone: Strategic and professional. Reference 'leading from the front'."
    caption = safe_extract_text(az_client.chat.completions.create(
        model=AZURE_CONFIG["deployment"],
        messages=[{"role": "user", "content": prompt}]
    ))

    # PHASE 2: Visual Prompt
    print("🤖 Agent 2: Creating Visual Layout...")
    # We add 'High-resolution professional graphic' to force image generation intent
    v_prompt = (f"Generate a professional, high-resolution LinkedIn graphic. "
                f"Subject: {topic}. Design: Deep blue branding, centered white text box with the headline. "
                f"Style: Minimalist, authoritative corporate announcement.")
    
    # PHASE 3: Gemini Rendering
    print("🎨 Execution: Rendering Image...")
    payload = [v_prompt]
    for f in ref_files:
        if os.path.exists(f):
            print(f"✅ Fusing Reference: {f}")
            payload.append(Image.open(f))

    # CRITICAL: We explicitly set the response modality to IMAGE only
    config = types.GenerateContentConfig(
        response_modalities=["IMAGE"], 
        image_config=types.ImageConfig(aspect_ratio="1:1")
    )

    res = gem_client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=payload,
        config=config
    )

    # PHASE 4: Deep-Search Extraction
    print("📥 Extracting Binary Data...")
    try:
        # 1. Get the list of candidates
        candidates = getattr(res, "candidates", [])
        if not candidates and isinstance(res, list):
            candidates = res
            
        if not candidates:
            print("❌ No candidates in response.")
            return

        # 2. Iterate through ALL parts of ALL candidates to find 'inline_data'
        for cand in candidates:
            content = getattr(cand, "content", None)
            parts = getattr(content, "parts", [])
            
            for part in parts:
                # Direct check for image bytes in the part
                data_obj = getattr(part, "inline_data", None)
                if data_obj and hasattr(data_obj, "data"):
                    os.makedirs("indigo_assets", exist_ok=True)
                    save_path = f"generations/linkedin_{uuid.uuid4()}.png"
                    
                    with open(save_path, "wb") as f:
                        f.write(data_obj.data)
                    
                    print("\n" + "="*50)
                    print(f"🔥 SUCCESS: Asset generated at {save_path}")
                    print("="*50)
                    print(f"\n📝 CAPTION:\n{caption}")
                    return

        print("❌ Search complete: No image data found in any parts. Check Gemini API quotas or safety filters.")
        
    except Exception as e:
        print(f"❌ Extraction Error: {str(e)}")

if __name__ == "__main__":
    topic = "IndiGo launching direct Delhi-London Heathrow flights with Boeing 787s."
    # Ensure these paths are correct on your Mac
    refs = ["Link_v1.jpeg", "Lnk_v2.jpeg"] 
    run_indigo_pipeline(topic, refs)
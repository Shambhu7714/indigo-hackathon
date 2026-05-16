import os
import io
import uuid
from PIL import Image
from openai import AzureOpenAI
from google import genai
from google.genai import types

# -------------------------------------------------------------------------
# Configuration & Client Initialization
# -------------------------------------------------------------------------
AZURE_TEXT_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-5-mini4")

azure_client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version=os.getenv("AZURE_OPENAI_VERSION", "2024-05-01-preview"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
gemini_client = genai.Client(api_key=GEMINI_API_KEY)


def save_gemini_bytes_locally(image_part, output_folder: str = "instagram_outputs", filename: str = "bamboo_bottle_post.png") -> str:
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"📁 Created local directory: './{output_folder}'")
        
    filepath = os.path.join(output_folder, filename)
    print(f"📥 Fusing layers and compiling graphics into local PNG...")
    
    image_bytes = image_part.inline_data.data
    image = Image.open(io.BytesIO(image_bytes))
    image.save(filepath, format="PNG")
    
    print(f"💾 Success! Image written safely to storage disk.")
    return filepath


def run_instagram_agent_pipeline(raw_topic: str, reference_image_paths: list = None) -> dict:
    print(f"🚀 Starting multi-agent pipeline for topic: '{raw_topic}'...\n")
    
    # -------------------------------------------------------------------------
    # AGENT 1: The Creative Copywriter Agent (Azure OpenAI)
    # -------------------------------------------------------------------------
    print("🤖 Agent 1 (Copywriter): Generating optimized Instagram copy...")
    
    copy_prompt = f"""
    You are an expert Instagram Copywriter specializing in viral growth and engagement.
    Your task is to take the following raw topic and convert it into a compelling Instagram post.
    
    Raw Topic: {raw_topic}
    
    Requirements:
    1. Hook: Start with a powerful, emotional, or curiosity-driven hook.
    2. Body: Break down the core value in clear, readable paragraphs using appropriate emojis.
    3. Call To Action (CTA): End with a clear engagement prompt.
    4. Hashtags: Include 10-15 targeted hashtags.
    
    Output ONLY the final caption copy. Do not include any markdown tags or introductory remarks.
    """
    
    copy_response = azure_client.chat.completions.create(
        model=AZURE_TEXT_DEPLOYMENT,
        messages=[
            {"role": "system", "content": "You are a specialized Instagram growth agent."},
            {"role": "user", "content": copy_prompt}
        ]
    )
    instagram_caption = copy_response.choices[0].message.content.strip()
    
    # -------------------------------------------------------------------------
    # AGENT 2: The Visual Director Agent (Azure OpenAI)
    # -------------------------------------------------------------------------
    print("🤖 Agent 2 (Visual Director): Structuring image composition and typography rules...")
    
    visual_prompt = f"""
    You are an Art Director for a high-end social media agency. 
    Review the following Instagram caption and write a highly detailed image generation prompt. 
    
    Instagram Caption:
    {instagram_caption}
    
    Requirements for your output prompt:
    1. Composition: Describe a clean, professional scene matching the caption context.
    2. Embedded UI Text: Explicitly instruct the model to overlay a clean, styled social media container box (like a notification popup, milestone banner, or clean frame) containing legibly rendered text.
    3. Context Awareness: Instruct the model to blend the visual layout styles, lighting directions, and design cues from the provided reference images.
    
    Output ONLY the final prompt to be fed into the image generator. Do not explain your choices.
    """
    
    visual_response = azure_client.chat.completions.create(
        model=AZURE_TEXT_DEPLOYMENT,
        messages=[
            {"role": "system", "content": "You are a specialized visual art director agent."},
            {"role": "user", "content": visual_prompt}
        ]
    )
    optimized_image_prompt = visual_response.choices[0].message.content.strip()
    
    # -------------------------------------------------------------------------
    # LAYER 3: Creative Rendering Layer (NATIVE Gemini 2.5 Flash Image Gen)
    # -------------------------------------------------------------------------
    print("🎨 Execution Layer: Injecting references and generating image via Gemini...")
    
    # Build the multimodal context payload
    # Start with the optimized text prompt instructions
    gemini_contents = [optimized_image_prompt]
    
    # If reference image paths are provided, open and inject them as PIL objects
    if reference_image_paths:
        for path in reference_image_paths:
            if os.path.exists(path):
                print(f"📸 Loading reference image asset: '{path}'")
                pil_img = Image.open(path)
                gemini_contents.append(pil_img)
            else:
                print(f"⚠️ Reference image not found at '{path}'. Skipping this asset.")

    gemini_config = types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"],
        image_config=types.ImageConfig(aspect_ratio="1:1")
    )
    
    gemini_response = gemini_client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=gemini_contents,
        config=gemini_config
    )
    
    image_part = None
    for part in gemini_response.candidates[0].content.parts:
        if part.inline_data and "image" in part.inline_data.mime_type:
            image_part = part
            break
            
    if not image_part:
        raise Exception("Gemini execution pipeline failed to process references or render image data parts.")
    
    local_img_path = save_gemini_bytes_locally(
        image_part=image_part,
        output_folder="generations", 
        filename=f"instagram_{uuid.uuid4()}.png"
    )
    
    return {
        "caption": instagram_caption,
        "image_prompt": optimized_image_prompt,
        "local_path": local_img_path
    }

# --- Execution Block ---
if __name__ == "__main__":
    raw_input_topic = "Indigo is collaborating with local artists to create unique visuals for a concert in Delhi."

    # Add your local reference image file paths here
    # Place your context images in your working directory and add them to this list
    my_context_images = [
        "backend/app/models/Image_ref/ref1.jpeg", 
        "backend/app/models/Image_ref/ref3.png",
        "backend/app/models/Image_ref/ref2.png"

    ]
    
    try:
        final_post = run_instagram_agent_pipeline(raw_input_topic, reference_image_paths=my_context_images)
        
        print("\n" + "="*50)
        print("🎉 INSTAGRAM POST GENERATION COMPLETE 🎉")
        print("="*50)
        print("\n📸 GENERATED CAPTION:\n")
        print(final_post["caption"])
        print("\n" + "-"*50)
        print(f"\n🧠 AGENT GENERATED IMAGE PROMPT:\n{final_post['image_prompt']}")
        print("\n" + "-"*50)
        print(f"\n📁 ASSET SAVED LOCALLY AT:\n{final_post['local_path']}")
        print("="*50)
        
    except Exception as e:
        print(f"\n❌ An error occurred during execution: {e}")
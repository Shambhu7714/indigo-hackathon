import os
import uuid
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session
from google import genai
from google.genai import types
from PIL import Image
import io
import uuid
from app.models.Instagram import run_instagram_agent_pipeline
from app.models.linkedin import run_indigo_pipeline

from app.core.config import settings
from app.db.database import get_db
from app.models.campaign import CampaignGeneration

router = APIRouter(prefix="/campaign", tags=["Campaign"])

class CampaignRequest(BaseModel):
    projectId: str
    campaignType: str
    description: str
    targetAgentId: Optional[str] = None

class GenerationResponse(BaseModel):
    agent_id: str
    content: str
    imageUrl: Optional[str] = None

@router.post("/generate", response_model=GenerationResponse)
async def generate_campaign_content(req: CampaignRequest, db: Session = Depends(get_db)):
    if not settings.GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")

    # Initialize Google GenAI client
    client = genai.Client(api_key=settings.GEMINI_API_KEY)

    is_image = req.targetAgentId == "imageGen"
    
    # Define Prompt
    if req.targetAgentId == "social":
        prompt = (
            f"Act as an IndiGo Airlines social media strategist. "
            f"Generate 3 creative post ideas (Instagram, Twitter, LinkedIn) for a campaign about: {req.description}. "
            f"Use a professional, friendly, and 'on-time' brand tone. Include relevant hashtags."
        )
    elif req.targetAgentId == "copywriting":
        prompt = (
            f"Act as a lead copywriter for IndiGo Airlines. "
            f"Write a premium copy deck (Headline, Subhead, and Body) for a new campaign: {req.description}. "
            f"Emphasize reliability, luxury, and the 6E experience."
        )
    elif req.targetAgentId == "banner":
        prompt = f"Generate banner specifications for an IndiGo campaign: {req.description}."
    elif req.targetAgentId == "imageGen":
        prompt = (
            f"Create a beautiful, realistic advertisement photo for IndiGo Airlines. "
            f"Subject: {req.description}. "
            f"The image should be premium, cinematic, and follow IndiGo brand colors (Navy and White)."
        )
    else:
        prompt = f"Generate a creative campaign summary for IndiGo Airlines based on: {req.description}"

    try:
        if is_image:
            response = client.models.generate_content(
                model="gemini-3.1-flash-image-preview",
                contents=[prompt],
            )

            text_content = ""
            image_filename = f"{uuid.uuid4()}.png"
            image_path = os.path.join("generations", image_filename)
            image_saved = False

            for part in response.parts:
                if part.text is not None:
                    text_content += part.text
                elif part.inline_data is not None:
                    image = part.as_image()
                    image.save(image_path)
                    image_saved = True

            if not image_saved:
                # Fallback: if no image returned, it might be a text model
                # In that case, we revert to our previous Pollinations fallback for the demo
                import urllib.parse
                safe_prompt = urllib.parse.quote(text_content or prompt)
                image_url = f"https://image.pollinations.ai/prompt/{safe_prompt}?width=1280&height=720&nologo=true"
            else:
                image_url = f"http://localhost:8000/generations/{image_filename}"

            # Save to DB
            new_gen = CampaignGeneration(
                id=str(uuid.uuid4()),
                project_id=req.projectId,
                agent_id=req.targetAgentId,
                prompt=prompt,
                content=image_url
            )
            db.add(new_gen)
            db.commit()

            return {
                "agent_id": req.targetAgentId,
                "content": text_content or "Image generated successfully.",
                "imageUrl": image_url
            }

        elif req.targetAgentId == "social":
            # Call the specialized Instagram pipeline
            # Note: This is a multi-agent pipeline (Copywriter -> Visual Director -> Gemini)
            refs = [
                "app/models/Image_ref/ref1.jpeg",
                "app/models/Image_ref/ref2.jpeg",
                "app/models/Image_ref/ref3.png"
            ]
            # Convert relative paths to absolute or relative to backend root
            refs = [os.path.join(os.getcwd(), r) for r in refs]
            
            result = run_instagram_agent_pipeline(req.description, reference_image_paths=refs)
            
            caption = result["caption"]
            local_path = result["local_path"] # This is now in 'generations/'
            filename = os.path.basename(local_path)
            image_url = f"http://localhost:8000/generations/{filename}"

            # Save to DB
            new_gen = CampaignGeneration(
                id=str(uuid.uuid4()),
                project_id=req.projectId,
                agent_id=req.targetAgentId,
                prompt=prompt,
                content=caption
            )
            db.add(new_gen)
            db.commit()

            return {
                "agent_id": req.targetAgentId,
                "content": caption,
                "imageUrl": image_url
            }

        else:
            # Text generation using stable 1.5 flash
            response = client.models.generate_content(
                model="gemini-1.5-flash",
                contents=[prompt],
            )
            text_result = response.text
            
            # Save to DB
            new_gen = CampaignGeneration(
                id=str(uuid.uuid4()),
                project_id=req.projectId,
                agent_id=req.targetAgentId or "general",
                prompt=prompt,
                content=text_result
            )
            db.add(new_gen)
            db.commit()

            return {
                "agent_id": req.targetAgentId or "general",
                "content": text_result,
                "imageUrl": None
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Generation Error: {str(e)}")

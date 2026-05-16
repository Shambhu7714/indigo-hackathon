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
        prompt = f"Act as an IndiGo Airlines social media manager. Generate 3 social media posts (Instagram, Twitter, LinkedIn) for a campaign about: {req.description}. Format as JSON."
    elif req.targetAgentId == "copywriting":
        prompt = f"Act as a professional copywriter for IndiGo Airlines. Generate a copy deck for: {req.description}."
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

        else:
            # Text generation
            response = client.models.generate_content(
                model="gemini-2.0-flash",
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

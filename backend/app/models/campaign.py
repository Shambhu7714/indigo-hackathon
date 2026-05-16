from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base

class CampaignGeneration(Base):
    __tablename__ = "campaign_generations"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, index=True)
    agent_id = Column(String)  # social, copywriting, banner, imageGen
    prompt = Column(Text)
    content = Column(Text)  # The generated text or image URL
    created_at = Column(DateTime(timezone=True), server_default=func.now())

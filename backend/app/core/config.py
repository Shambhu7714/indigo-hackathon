from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = "supersecret_change_this_in_production_32chars_minimum"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DATABASE_URL: str = "sqlite:///./indigo.db"

    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    AZURE_OPENAI_KEY: str = ""
    AZURE_OPENAI_ENDPOINT: str = ""
    AZURE_OPENAI_VERSION: str = "2024-05-01-preview"
    AZURE_OPENAI_DEPLOYMENT: str = "gpt-5-mini4"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()

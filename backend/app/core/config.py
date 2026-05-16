from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = "supersecret_change_this_in_production_32chars_minimum"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DATABASE_URL: str = "sqlite:///./indigo.db"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()

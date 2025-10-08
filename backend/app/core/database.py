from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient | None = None

async def init_db():
    pass

def get_db():
    global client
    if client is None:
        client = AsyncIOMotorClient(settings.MONGO_URI)
    return client[settings.DB_NAME]

def close_db():
    pass

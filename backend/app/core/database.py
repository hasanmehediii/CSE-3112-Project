from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient | None = None

async def init_db():
    global client
    client = AsyncIOMotorClient(settings.MONGO_URI)

def get_db():
    global client
    if client is None:
        raise Exception("Database client not initialized. Call init_db() first.")
    return client[settings.DB_NAME]

def close_db():
    global client
    if client:
        client.close()

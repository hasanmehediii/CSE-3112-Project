from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient | None = None

async def init_db():
    global client
    client = AsyncIOMotorClient(settings.MONGO_URI)

def get_db():
    if client is None:
        raise Exception("Database client not initialized. Ensure 'init_db' is called at application startup.")
    return client[settings.DB_NAME]

def close_db():
    # In a serverless environment, we don't manually close the connection.
    pass

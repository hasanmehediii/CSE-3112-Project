from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings
import asyncio
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

client: AsyncIOMotorClient | None = None
_lock = asyncio.Lock()

async def get_db():
    global client
    if client is None:
        async with _lock:
            if client is None:
                logger.info("Initializing database client on demand...")
                try:
                    loop = asyncio.get_running_loop()
                    client = AsyncIOMotorClient(settings.MONGO_URI, io_loop=loop)
                    await client.server_info()
                    logger.info("Database client initialized successfully.")
                except Exception as e:
                    logger.error(f"Failed to initialize database client: {e}", exc_info=True)
                    raise e
    return client[settings.DB_NAME]

async def init_db():
    # This can be called at startup to "warm up" the connection.
    await get_db()

def close_db():
    pass

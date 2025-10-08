from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

client: AsyncIOMotorClient | None = None

async def init_db():
    global client
    logger.info("Initializing database connection...")
    try:
        client = AsyncIOMotorClient(settings.MONGO_URI)
        # The following line will force a connection to the database.
        await client.server_info()
        logger.info("Database connection initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize database connection: {e}", exc_info=True)
        raise e

def get_db():
    if client is None:
        logger.error("Database client not initialized. 'init_db' was not called or failed.")
        raise Exception("Database client not initialized. Ensure 'init_db' is called at application startup.")
    return client[settings.DB_NAME]

def close_db():
    # In a serverless environment, we don't manually close the connection.
    pass

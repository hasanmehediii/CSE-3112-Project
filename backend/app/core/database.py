from pymongo import MongoClient
from .config import settings
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

client: MongoClient | None = None

def init_db():
    global client
    logger.info("Initializing synchronous database client...")
    try:
        client = MongoClient(settings.MONGO_URI)
        # The following line will force a connection to the database.
        client.server_info()
        logger.info("Database client initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize database client: {e}", exc_info=True)
        raise e

def get_db():
    if client is None:
        raise Exception("Database client not initialized. Ensure 'init_db' is called at application startup.")
    return client[settings.DB_NAME]

def close_db():
    global client
    if client:
        client.close()

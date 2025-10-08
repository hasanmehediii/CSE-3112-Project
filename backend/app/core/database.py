from pymongo import MongoClient
from .config import settings
import threading
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

client: MongoClient | None = None
_lock = threading.Lock()

def get_db():
    global client
    with _lock:
        if client is None:
            logger.info("Initializing synchronous database client on demand...")
            try:
                client = MongoClient(settings.MONGO_URI)
                client.server_info()
                logger.info("Database client initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize database client: {e}", exc_info=True)
                raise e
    return client[settings.DB_NAME]

def init_db():
    # No longer needed with on-demand initialization
    pass

def close_db():
    # No longer needed with on-demand initialization
    pass

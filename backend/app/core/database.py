from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

# Create the client once when the module is imported.
# motor will manage the connection pool for us.
client = AsyncIOMotorClient(settings.MONGO_URI)

async def init_db():
    # This function is called at startup, but we now initialize the client above.
    # We can keep it for potential future use, but it does nothing for now.
    pass

def get_db():
    return client[settings.DB_NAME]

def close_db():
    # In a serverless environment, we don't manually close the connection.
    # The connection will be closed when the container is shut down.
    pass

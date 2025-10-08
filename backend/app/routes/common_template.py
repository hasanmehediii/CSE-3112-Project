from fastapi import APIRouter, HTTPException, Depends
from app.core.database import get_db
from app.core.utils import serialize_list
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def make_simple_router(collection_name: str) -> APIRouter:
    router = APIRouter()

    @router.get("/", summary=f"Get all {collection_name}")
    async def get_all():
        try:
            logger.info(f"Entering get_all for {collection_name}")
            db = await get_db()
            logger.info(f"Successfully got database handle: {db.name}")
            # Temporarily return a success message to isolate the issue.
            return {"message": f"Successfully connected to database for {collection_name}"}
        except Exception as e:
            logger.error(f"An error occurred in get_all for {collection_name}: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail=str(e))
    
    return router
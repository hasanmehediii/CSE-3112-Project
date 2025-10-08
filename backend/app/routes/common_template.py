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
            logger.info(f"Getting all documents from collection: {collection_name}")
            db = await get_db()
            logger.info(f"Database: {db.name}")
            coll = db[collection_name]
            logger.info(f"Collection: {coll.name}")
            cursor = coll.find({})
            logger.info("Cursor created")
            docs = []
            async for d in cursor:
                docs.append(d)
            logger.info(f"Found {len(docs)} documents")
            return serialize_list(docs)
        except Exception as e:
            logger.error(f"An error occurred in get_all for {collection_name}: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail=str(e))
    
    return router
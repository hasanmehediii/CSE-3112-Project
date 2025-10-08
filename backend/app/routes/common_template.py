from fastapi import APIRouter, HTTPException
from fastapi.concurrency import run_in_threadpool
from app.core.database import get_db
from app.core.utils import serialize_list
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def make_simple_router(collection_name: str) -> APIRouter:
    router = APIRouter()

    def get_docs():
        db = get_db()
        coll = db[collection_name]
        cursor = coll.find({})
        return list(cursor)

    @router.get("/", summary=f"Get all {collection_name}")
    async def get_all():
        try:
            logger.info(f"Getting all documents from collection: {collection_name}")
            # Run the synchronous database call in a thread pool
            docs = await run_in_threadpool(get_docs)
            logger.info(f"Found {len(docs)} documents")
            return serialize_list(docs)
        except Exception as e:
            logger.error(f"An error occurred in get_all for {collection_name}: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail=str(e))
    
    return router
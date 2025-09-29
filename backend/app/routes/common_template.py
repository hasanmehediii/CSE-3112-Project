from fastapi import APIRouter, HTTPException, Depends
from app.core.database import get_db
from app.core.utils import serialize_list

def make_simple_router(collection_name: str) -> APIRouter:
    router = APIRouter()

    @router.get("/", summary=f"Get all {collection_name}")
    async def get_all():
        db = get_db()
        coll = db[collection_name]
        cursor = coll.find({})
        docs = []
        async for d in cursor:
            docs.append(d)
        return serialize_list(docs)
    
    return router
from app.routes.common_template import make_simple_router

router = make_simple_router("users")


@router.post("/", status_code=201)
async def create_user():
    return {"message": "User created"}


@router.get("/{user_id}")
async def get_user(user_id: str):
    return {"user_id": user_id, "name": "John Doe"} 


@router.delete("/{user_id}", status_code=204)
async def delete_user(user_id: str):    
    return {"message": "User deleted"}


@router.put("/{user_id}")
async def update_user(user_id: str):    
    return {"message": "User updated"}
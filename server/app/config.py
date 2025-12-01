import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")  # your Neon DB URL
JWT_SECRET = os.getenv("JWT_SECRET", "supersecret_change_me")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 60 * 60 * 24  # 1 day

# 🔹 NEW: Where your frontend lives
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

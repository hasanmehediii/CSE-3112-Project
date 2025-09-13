from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]

users_col = db["users"]
students_col = db["students"]
canteens_col = db["canteens"]
orders_col = db["orders"]
complaints_col = db["complaints"]
weather_col = db["weather"]
mealplans_col = db["mealplans"]

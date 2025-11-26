import pymongo
from datetime import datetime

# Connection to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["khaikhai"]

# Sample Data
orders = [
    {
        "student_id": "student1",
        "canteen_id": "60d5ecb4b392d34a44a7b822",
        "meal_id": "meal1",
        "order_date": datetime(2025, 5, 1, 10, 30, 0),
        "status": "delivered",
        "quantity": 2,
        "total_price": 250.0,
        "payment_id": "payment1"
    },
    {
        "student_id": "student2",
        "canteen_id": "60d5ecb4b392d34a44a7b822",
        "meal_id": "meal2",
        "order_date": datetime(2025, 5, 1, 12, 0, 0),
        "status": "pending",
        "quantity": 1,
        "total_price": 120.0,
        "payment_id": "payment2"
    },
    {
        "student_id": "student3",
        "canteen_id": "60d5ecb4b392d34a44a7b823",
        "meal_id": "meal3",
        "order_date": datetime(2025, 5, 2, 9, 0, 0),
        "status": "cancelled",
        "quantity": 3,
        "total_price": 300.0,
        "payment_id": "payment3"
    }
]

# Insert Data
db["orders"].insert_many(orders)

print("Sample orders inserted successfully.")

# Sample Feedback Data
feedback = [
    {
        "student_id": "student1",
        "meal_id": "meal1",
        "canteen_id": "60d5ecb4b392d34a44a7b822",
        "rating": 4.5,
        "comment": "The food was delicious!",
        "created_at": datetime(2025, 5, 1, 11, 0, 0)
    },
    {
        "student_id": "student2",
        "meal_id": "meal2",
        "canteen_id": "60d5ecb4b392d34a44a7b822",
        "rating": 3.0,
        "comment": "The food was okay, but could be better.",
        "created_at": datetime(2025, 5, 1, 12, 30, 0)
    },
    {
        "student_id": "student3",
        "meal_id": "meal3",
        "canteen_id": "60d5ecb4b392d34a44a7b823",
        "rating": 2.0,
        "comment": "The food was not good.",
        "created_at": datetime(2025, 5, 2, 9, 30, 0)
    }
]

# Insert Data
db["feedback"].insert_many(feedback)

print("Sample feedback inserted successfully.")

import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME   = os.getenv("MONGO_DB_NAME")

client   = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]

menu_collection = database.get_collection("menu")

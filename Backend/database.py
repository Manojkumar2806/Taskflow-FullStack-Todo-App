from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


load_dotenv()


db_url = os.getenv("DATABASE_URL")

if db_url is None:
    raise ValueError("DATABASE_URL environment variable not set in .env file")


engine = create_engine(db_url)
 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

 
Base = declarative_base()

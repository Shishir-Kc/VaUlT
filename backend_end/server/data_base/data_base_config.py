from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url = 'postgress://postgres:1234@localhost:5432/vault'
engine = create_engine(url=db_url)
session = sessionmaker(bind=engine,autoflush=False,autoommit=False)


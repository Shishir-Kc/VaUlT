from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,String
import uuid

Base = declarative_base()


class User_Account(Base):
    __tablename__ = 'user'
    id  = Column(primary_key=True,default=lambda:str(uuid.uuid4()),index=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)

class User_Account_passwords():
    ...
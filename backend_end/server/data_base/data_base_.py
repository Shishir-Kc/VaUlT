from sqlmodel import SQLModel,Field
import uuid

class UserBase(SQLModel):
    email:str
    username:str

class User(UserBase,table=True):
    id:uuid.UUID=Field(default_factory=uuid.uuid4,primary_key=True)
    password:str

class UserCreate(UserBase):
    password:str

class UseRead(UserBase):
    id:uuid.UUID
    
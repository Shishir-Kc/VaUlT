from sqlmodel import SQLModel,Field,Relationship
import uuid
from typing import List,Optional


class UserPasswordCreate(SQLModel):
    user_gmail :str
    user_password :str
    application:str
    application_icon:Optional[str]=None

class UserPasswordRead(UserPasswordCreate):
    id:uuid.UUID
   

class UserPasswords(UserPasswordCreate,table=True):
    id:uuid.UUID = Field(default_factory=uuid.uuid4,primary_key=True)
    user_id : uuid.UUID = Field(foreign_key='user.id')
    user:"User" = Relationship(back_populates='user_passwords')


class UserBase(SQLModel):
    email:str
    username:str

class User(UserBase,table=True):
    id:uuid.UUID=Field(default_factory=uuid.uuid4,primary_key=True)
    password:str
    user_passwords:List["UserPasswords"] = Relationship(back_populates='user')

class UserCreate(UserBase):
    password:str

class UserRead(UserBase):
    id:uuid.UUID
    



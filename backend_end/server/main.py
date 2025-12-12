from fastapi import FastAPI,Depends,HTTPException,status
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from auth.auth_model import Token,User
from auth.user_auth import authenticate_user,get_current_active_user
from datetime import timedelta
from auth.auth_config import ACCESS_TOKEN_EXPIRE_MINUTES
from auth.jwt.generate_jwt import create_acess_token
from data_base.data_base_config import engine
from sqlmodel import SQLModel,Session,select
from data_base.data_base_ import UserCreate,UseRead
from data_base.data_base_ import User as U 
from auth.pass_hash import hash_password
from data_base.data_base_config import get_session

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"]
)

@app.get("/")
def home():
    return {
        "response":"hello"
    }

user_pass = {

        'facebook':{
            'facebook_image':"image of facebook",
            "user_email":"test@gmail.com",
            "user_pass":"hashed_password",

        },
        "instagram":{
            "inatagram-image":"image of instagram",
            "user_email":"lol@gmail.com",
            "user_pass":"hashed shit 1010",
            
        }
}


def init_database():
   SQLModel.metadata.create_all(engine)


session_dep = Annotated[Session,Depends(get_session)]

@app.on_event('startup')
def geenrate_table():
   init_database()


@app.get('/user/passwords/')
def user_dashboard():
    return user_pass


@app.post('/user/login/')
def user_login(
    form:Annotated[OAuth2PasswordRequestForm,Depends()],session:session_dep):

    user = authenticate_user(session,form.username,form.password)

    if not user: 
     raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expire = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_acess_token(
       data={'sub':user.username},expires_delta=access_token_expire
    )
    print(Token(access_token=access_token,token_type="bearer"))

    
    return Token(access_token=access_token,token_type="bearer")


@app.get("/users/me/items/")
def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]

@app.post("/user/create/")
def create_users(user:UserCreate,session:session_dep)->UseRead:
   hashed_pass = str(hash_password(user.password))
   user_db = U.model_validate(
      user,
      update={'password':hashed_pass}
   )
   session.add(user_db)
   session.commit()
   session.refresh(user_db)

   return user_db


@app.get('/users/all/',response_model=list[UseRead])
def get_all_users(session:session_dep,current_user:Annotated[User,Depends(get_current_active_user)]):
    statement = select(U)
    users = session.exec(statement).all()
    return users
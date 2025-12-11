from fastapi import FastAPI,Depends,HTTPException,status
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import jwt
from auth.user_auth import fake_users_db
from fastapi.security import OAuth2PasswordRequestForm
from auth.auth_model import Token,User
from auth.user_auth import authenticate_user,get_current_active_user
from datetime import timedelta
from auth.auth_config import ACCESS_TOKEN_EXPIRE_MINUTES
from auth.jwt.generate_jwt import create_acess_token

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


@app.get('/user/passwords/')
def user_dashboard():
    return user_pass


@app.post('/user/login/')
def user_login(
    form:Annotated[OAuth2PasswordRequestForm,Depends()]):
    print(form.username)
    user = authenticate_user(fake_users_db,form.username,form.password)
    # print(user.username)
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
from fastapi import FastAPI,Depends,HTTPException,status
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
from data_base.data_base_ import UserCreate,UserRead,UserPasswordCreate,UserPasswords,UserPasswordRead
from data_base.data_base_ import User as U 
from auth.pass_hash import hash_password
from data_base.data_base_config import get_session
from auth.security.kryptonite import encript_password,decription_password
from bot.scrappy import get_website_icon,download_and_save_icon
from fastapi.staticfiles import StaticFiles
import uuid


app = FastAPI()
app.mount("/static",StaticFiles(directory="static"),name="static")

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



@app.post("/user/create/")
def create_users(user:UserCreate,session:session_dep)->UserRead:
   hashed_pass = str(hash_password(user.password))
   user_db = U.model_validate(
      user,
      update={'password':hashed_pass}
   )
   session.add(user_db)
   session.commit()
   session.refresh(user_db)

   return user_db


@app.get('/users/all/',response_model=list[UserRead])
def get_all_users(session:session_dep,current_user:Annotated[User,Depends(get_current_active_user)]):
    statement = select(U)
    users = session.exec(statement).all()
    return users


@app.post("/user/add/passwords/",response_model=UserPasswordRead)
def add_passowrds(session:session_dep,userpasswords:UserPasswordCreate,user:Annotated[User,Depends(get_current_active_user)]):
   try:
    site =f"{userpasswords.application}.com"
    print(site)
    website =get_website_icon(f"{userpasswords.application}.com")
    saved_path = download_and_save_icon(website,filename_prefix=uuid.uuid4())
   except:
      print("error downloading !")

   user_db = UserPasswords.model_validate(
      userpasswords,
      update={'user_id':user.id,
              'user_password':encript_password(userpasswords.user_password),
              'application_icon':saved_path}
   )
   session.add(user_db)
   session.commit()
   session.refresh(user_db)
   return user_db

@app.get("/user/get/passwords/",response_model=list[UserPasswordRead])
def get_passowrds(session:session_dep,user:Annotated[User,Depends(get_current_active_user)]):
   
    statement = select(UserPasswords).where(UserPasswords.user_id==user.id)
    querry = session.exec(statement)
    decripted_list = []
    for entity in querry:
       decripted_entity =UserPasswordRead(
          id=entity.id,
          user_gmail=entity.user_gmail,
          user_password=decription_password(entity.user_password),
          application=entity.application,
          application_icon=entity.application_icon
       )
       decripted_list.append(decripted_entity)
    return decripted_list


@app.delete('/user/delete/passwords/{id}/')
def delete_password(id:str,session:session_dep,user:Annotated[User,Depends(get_current_active_user)]):
   statement = select(UserPasswords).where(UserPasswords.user_id==user.id,UserPasswords.id==id)
   querry = session.exec(statement).first()
   session.delete(querry)
   session.commit()
   return {
      'status':status.HTTP_200_OK
   }


@app.put('/user/update/password/{id}/')
def update_password(form:UserPasswordCreate,id:str,user:Annotated[User,Depends(get_current_active_user)],session:session_dep)->UserPasswordRead:
   statement = select(UserPasswords).where(
      UserPasswords.user_id==user.id,
      UserPasswords.id == id
)
   password_db = session.exec(statement).first()
   password_db.user_password = encript_password(form.user_password)
   password_db.application = form.application
   password_db.application_icon = form.application_icon
   password_db.user_gmail = form.user_gmail

   session.commit()
   session.refresh(password_db)
   return password_db


@app.get("/users/me")
def read_own_info(
    current_user: Annotated[User, Depends(get_current_active_user)],
)->UserRead:

    return current_user
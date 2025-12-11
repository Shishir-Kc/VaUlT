from .auth_model import UserInDB
from typing import Annotated
from jwt.exceptions import InvalidTokenError
from fastapi import Depends,HTTPException,status
from .pass_hash import oauth2_scheme,verify_password 
import jwt
from .auth_config import SECRET_KEY,ALGORITHM
from .auth_model import TokenData,User

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$wagCPXjifgvUFBzq4hqe3w$CYaIb8sB+wtD+Vu/P4uod1+Qof8h+1g7bbDlBID48Rc",
        "disabled": False,
    }
}


def get_current_user(token: Annotated[str,Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="user not found",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        username = payload.get('sub')
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    
    user = get_user(fake_users_db,username=token_data.username)
    if user is None:
        raise credentials_exception
    print(f"user hehe{user}")
    return user


def get_user(db,username:str):
    if username in db:
        user_dict = db[username]
       
        return UserInDB(**user_dict) 

def authenticate_user(fake_databae,username:str,password:str):
    user = get_user(fake_databae,username)
    if not user:
        print('user does not exists !')
        return False

    if not verify_password(password,user.hashed_password):
        print("invalid pass")
        return False
    
    print(f"i am {user}")
    return user 


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
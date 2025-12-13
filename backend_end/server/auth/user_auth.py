from .auth_model import UserInDB
from typing import Annotated
from jwt.exceptions import InvalidTokenError
from fastapi import Depends,HTTPException,status
from .pass_hash import oauth2_scheme,verify_password 
import jwt
from .auth_config import SECRET_KEY,ALGORITHM
from .auth_model import TokenData,User
from data_base.data_base_ import User
from sqlmodel import select,Session
from data_base.data_base_config import get_session


def get_current_user(session: Annotated[Session, Depends(get_session)],token: Annotated[str,Depends(oauth2_scheme)]):
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
    
    user = get_user(session,username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


def get_user(session: Session, username: str): 
    statement = select(User).where(User.username == username)
    user = session.exec(statement).first()
    return user

def authenticate_user(session:Session,username:str,password:str):
    user = get_user(session,username)
    if not user:
        return False

    if not verify_password(password,user.password):
        return False
    
    return user 


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):

    return current_user
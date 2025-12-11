import jwt
from datetime import timedelta,timezone,datetime
from auth.auth_config import ACCESS_TOKEN_EXPIRE_MINUTES,SECRET_KEY,ALGORITHM

def create_acess_token(data:dict,expires_delta:timedelta|None=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update(
        {
            'exp':expire
        }
    )
    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt

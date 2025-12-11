from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer

password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/user/login/')

def verify_password(plain_text,hashed_password):
    return password_hash.verify(plain_text,hashed_password)

def hash_password(plain_text):
    return password_hash.hash(plain_text)

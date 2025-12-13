from dotenv import load_dotenv
from cryptography.fernet import Fernet
import os
load_dotenv()

cipher = Fernet(os.getenv('KEY'))

def encript_password(password):
    return cipher.encrypt(password.encode()).decode()


def decription_password(password):
    return cipher.decrypt(password.encode()).decode()

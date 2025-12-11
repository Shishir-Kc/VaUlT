import requests

url = "http://127.0.0.1:8000/user/login/"
payload = {
    "username": "johndoe",
    "password": "password" 
}
# Note: The password might be wrong, but we are testing if the endpoint exists (not 404).
# If the password is wrong, we expect 401, not 404.

try:
    response = requests.post(url, data=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except requests.exceptions.ConnectionError:
    print("Could not connect to the server. Make sure it is running.")

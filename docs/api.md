# API Documentation

## Automatic Documentation

FastAPI provides automatic interactive API documentation. Once the backend server is running, you can access:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs) - Interactive API documentation where you can test endpoints directly.
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc) - Alternative API documentation view.

## Key Endpoints

### Authentication
- `POST /user/login/`: Authenticate a user and retrieve an access token.
- `POST /user/create/`: Register a new user.

### User Management
- `GET /users/me`: Retrieve current user information.
- `GET /users/all/`: Retrieve all users (likely for admin/debug).

### Password Management
- `GET /user/passwords/`: Retrieve a dashboard of passwords (static mock data in current implementation).
- `POST /user/add/passwords/`: Add a new password entry.
- `GET /user/get/passwords/`: Retrieve all stored password entries for the current user.
- `PUT /user/update/password/{id}/`: Update a specific password entry.
- `DELETE /user/delete/passwords/{id}/`: Delete a specific password entry.

## Data Models

The API uses Pydantic models for request and response validation. Key models include:
- `UserCreate`: Schema for user registration.
- `UserRead`: Schema for reading user data.
- `UserPasswordCreate`: Schema for adding a new password.
- `UserPasswordRead`: Schema for reading password entries.
- `Token`: Schema for the JWT access token.

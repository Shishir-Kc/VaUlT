# Architecture Overview

## High-Level Architecture

VaUlT follows a standard client-server architecture:

- **Client (Frontend)**: A Single Page Application (SPA) built with React and TypeScript. It handles user interactions, displays the UI, and communicates with the backend via RESTful APIs.
- **Server (Backend)**: A FastAPI application that serves as the REST API. It handles business logic, authentication, and database interactions.
- **Database**: A relational database (PostgreSQL) used to store user data, encrypted passwords, and other persistent information.

## Interaction Flow

1. **User Action**: The user interacts with the frontend (e.g., logs in, adds a password).
2. **API Request**: The frontend sends an HTTP request (GET, POST, PUT, DELETE) to the backend API endpoints.
3. **Authentication**: Requests to protected endpoints include a JWT (JSON Web Token) in the Authorization header. The backend verifies this token.
4. **Processing**: The backend processes the request. This may involve:
   - Validating input data.
   - Querying or updating the database using SQLModel.
   - Performing cryptographic operations (hashing, encryption/decryption).
5. **Response**: The backend sends a JSON response back to the frontend.
6. **UI Update**: The frontend receives the response and updates the UI accordingly.

## Database Schema

The application uses SQLModel to define database models. Key entities include:

- **User**: Stores user account information (username, email, hashed password).
- **UserPasswords**: Stores the encrypted passwords for various applications/sites associated with a user.
- **Token**: Represents authentication tokens.

## Security

- **Password Hashing**: User login passwords are hashed before storage using Argon2 (via `passlib` or similar libraries).
- **Data Encryption**: Stored passwords for external sites are encrypted using a symmetric encryption algorithm (likely Fernet or similar) before being saved to the database.

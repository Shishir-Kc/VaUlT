# VaUlT

VaUlT is a secure password manager application built with a modern tech stack. It provides a user-friendly interface to store and manage your passwords securely.

## Technology Stack

### Frontend
- **Framework**: React (with TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State/Notifications**: React Hot Toast

### Backend
- **Framework**: FastAPI
- **Database ORM**: SQLModel (SQLAlchemy)
- **Database**: PostgreSQL (inferred from dependencies)
- **Migrations**: Alembic
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

- `front_end/`: Contains the React frontend application.
- `backend_end/server/`: Contains the FastAPI backend application.

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.x
- PostgreSQL database

### Installation and Setup

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend_end/server
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (create a `.env` file if needed, based on configuration).

5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`.

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd front_end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Documentation

For more detailed information, please refer to the `docs/` directory:
- [Architecture Overview](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Frontend Documentation](docs/frontend.md)

# 📝 Todo List RESTful API

https://roadmap.sh/projects/todo-list-api

A production-ready, feature-rich RESTful API for managing user accounts and personal Todo lists built with **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. 

The project follows a clean **Controller-Service-Repository** architecture, features **JWT Authentication**, **Zod Request Validation**, **Prisma v7 Driver Adapters**, and interactive **Swagger (OpenAPI 3.0)** documentation.

---

## 🚀 Key Features

- 🔐 **JWT Authentication & Authorization**: Secure user registration and password hashing using `bcryptjs`, token-based authentication via `jsonwebtoken`.
- 📋 **Complete Todo CRUD Operations**: Create, read (paginated), update, and delete todo items tied strictly to the authenticated user.
- ⚡ **Prisma ORM v7**: Database management using PostgreSQL with `@prisma/adapter-pg` driver adapter and declarative migrations.
- 🛡️ **Schema Validation**: Type-safe request payload validation using **Zod**.
- 📖 **Interactive Swagger UI**: Interactive API documentation generated with `swagger-jsdoc` accessible at `/api-docs`.
- 🩺 **Health Check Endpoint**: Monitoring endpoint at `/health` to verify server uptime.
- 🧱 **Clean Architecture**: Decoupled routes, controllers, services, and middlewares for maintainability and scalability.

---

## 🛠️ Technology Stack

| Category | Technology / Package |
| :--- | :--- |
| **Runtime Environment** | Node.js (v18+ with native `--watch` dev mode) |
| **Web Framework** | Express.js (v5) |
| **Database** | PostgreSQL |
| **ORM** | Prisma ORM (v7.9+) with `@prisma/adapter-pg` |
| **Authentication** | JSON Web Token (`jsonwebtoken`), `bcryptjs` |
| **Validation** | Zod (`zod`) |
| **API Documentation** | OpenAPI 3.0 via `swagger-jsdoc` & `swagger-ui-express` |
| **Configuration** | `dotenv` |

---

## 📁 Project Structure

```
todo-list/
├── prisma/
│   ├── migrations/             # Database migration SQL files
│   └── schema.prisma           # Prisma models and database configuration
├── src/
│   ├── config/
│   │   ├── db.js               # Prisma Client initialization with PostgreSQL adapter
│   │   ├── env.js              # Environment variable configurations
│   │   └── swagger.js          # Swagger/OpenAPI 3.0 specification config
│   ├── controllers/
│   │   ├── authController.js   # HTTP handlers for auth routes
│   │   └── todoController.js   # HTTP handlers for todo routes
│   ├── middlewares/
│   │   ├── authMiddleware.js   # JWT authentication middleware
│   │   ├── errorMiddleware.js  # Global error handling middleware
│   │   └── validateMiddleware.js # Zod schema validation middleware
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication endpoints & OpenAPI specs
│   │   └── todoRoutes.js       # Todo endpoints & OpenAPI specs
│   ├── services/
│   │   ├── authService.js      # Auth business logic & DB interactions
│   │   └── todoService.js      # Todo business logic & DB interactions
│   ├── utils/
│   │   ├── authValidation.js   # Zod validation schemas for auth payloads
│   │   └── todoValidation.js   # Zod validation schemas for todo payloads
│   └── app.js                  # Express application setup & middleware mounting
├── .env.example                # Template for environment variables
├── package.json                # Project dependencies and scripts
├── prisma.config.ts            # Prisma 7 CLI configuration
├── request.rest                # REST Client HTTP test requests
└── server.js                   # Entry point (Server startup & DB connection check)
```

---

## 🗄️ Database Schema

The database uses PostgreSQL with the following two main entities:

```mermaid
erDiagram
    USER ||--o{ TODO : "owns"
    USER {
        string id PK "UUID"
        string email UK "Unique"
        string name
        string password "Hashed"
        datetime createdAt
        datetime updatedAt
    }
    TODO {
        string id PK "UUID"
        string title
        string description "Optional"
        boolean isCompleted "Default: false"
        string userId FK "Foreign Key -> User.id"
        datetime createdAt
        datetime updatedAt
    }
```

### Models Detail

#### User Model
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(uuid())` | Unique user UUID |
| `email` | `String` | `@unique` | User email address |
| `name` | `String` | — | User's full name |
| `password` | `String` | — | Hashed password (`bcryptjs`) |
| `createdAt` | `DateTime` | `@default(now())` | Registration timestamp |
| `updatedAt` | `DateTime` | `@updatedAt` | Last modification timestamp |

#### Todo Model
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(uuid())` | Unique todo UUID |
| `title` | `String` | — | Todo title |
| `description` | `String?` | Optional | Detailed description |
| `isCompleted` | `Boolean` | `@default(false)` | Task status |
| `userId` | `String` | Foreign Key | Owner user UUID |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp |
| `updatedAt` | `DateTime` | `@updatedAt` | Last update timestamp |

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** (v18.11.0 or higher recommended)
- **npm** (v9+ or higher)
- **PostgreSQL** instance (local instance or hosted via Prisma Postgres/Neon/Supabase)

---

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dat-nnguyen/todo-list.git
   cd todo-list
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   Fill in your configuration parameters in `.env`:
   ```env
   PORT=3000
   DATABASE_URL="postgres://username:password@localhost:5432/todo_db?sslmode=require"
   JWT_SECRET="your_secure_jwt_secret_key"
   ```

4. **Run Database Migrations & Generate Prisma Client**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start the Application**:
   - **Development mode** (with auto-reload):
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

---

## 📖 API Documentation & Endpoints

### 🌐 Interactive Swagger UI
When the server is running, access full interactive API documentation and test endpoints directly at:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

### 🩺 Health Check

#### `GET /health`
Verifies server status.
- **Access**: Public
- **Response `200 OK`**:
  ```json
  {
    "status": "OK",
    "message": "Server is running smoothly"
  }
  ```

---

### 🔑 Authentication Endpoints (`/api/auth`)

#### `POST /api/auth/register`
Registers a new user.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "secretpassword123",
    "name": "Dat Nguyen"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "message": "User registered successfully",
    "data": {
      "id": "fe442ca3-6023-4c1c-8228-8dd7ca77ae8b",
      "email": "user@example.com",
      "name": "Dat Nguyen",
      "createdAt": "2026-08-04T10:00:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Validation failure or email already in use.

---

#### `POST /api/auth/login`
Authenticates a user and returns a JWT token.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "secretpassword123"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "message": "Login successful",
    "data": {
      "user": {
        "id": "fe442ca3-6023-4c1c-8228-8dd7ca77ae8b",
        "email": "user@example.com",
        "name": "Dat Nguyen"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid credentials.

---

### 📋 Todo Endpoints (`/api/todos`)

> **Note**: All `/api/todos` endpoints require an `Authorization` header with a valid JWT token:
> `Authorization: Bearer <your_jwt_token>`

#### `POST /api/todos`
Creates a new todo for the authenticated user.
- **Access**: Protected (JWT)
- **Request Body**:
  ```json
  {
    "title": "Build REST API",
    "description": "Implement authentication and todo endpoints"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "message": "Todo created successfully",
    "data": {
      "id": "b3f12a98-9410-4c11-a833-22108711ef0a",
      "title": "Build REST API",
      "description": "Implement authentication and todo endpoints",
      "isCompleted": false,
      "userId": "fe442ca3-6023-4c1c-8228-8dd7ca77ae8b",
      "createdAt": "2026-08-04T10:30:00.000Z",
      "updatedAt": "2026-08-04T10:30:00.000Z"
    }
  }
  ```

---

#### `GET /api/todos`
Retrieves a paginated list of todos belonging to the authenticated user.
- **Access**: Protected (JWT)
- **Query Parameters**:
  - `page` (optional, default: `1`): Page number
  - `limit` (optional, default: `10`): Items per page
- **Example Request**: `GET /api/todos?page=1&limit=5`
- **Response `200 OK`**:
  ```json
  {
    "message": "Get All Todo",
    "data": [
      {
        "id": "b3f12a98-9410-4c11-a833-22108711ef0a",
        "title": "Build REST API",
        "description": "Implement authentication and todo endpoints",
        "isCompleted": false,
        "userId": "fe442ca3-6023-4c1c-8228-8dd7ca77ae8b",
        "createdAt": "2026-08-04T10:30:00.000Z",
        "updatedAt": "2026-08-04T10:30:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 5,
      "totalPages": 1
    }
  }
  ```

---

#### `GET /api/todos/:id`
Retrieves a single todo item by ID.
- **Access**: Protected (JWT - Owner only)
- **Response `200 OK`**:
  ```json
  {
    "message": "Get Todo by ID",
    "data": {
      "id": "b3f12a98-9410-4c11-a833-22108711ef0a",
      "title": "Build REST API",
      "description": "Implement authentication and todo endpoints",
      "isCompleted": false,
      "userId": "fe442ca3-6023-4c1c-8228-8dd7ca77ae8b",
      "createdAt": "2026-08-04T10:30:00.000Z",
      "updatedAt": "2026-08-04T10:30:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - `403 Forbidden`: Trying to access another user's todo.
  - `404 Not Found`: Todo ID does not exist.

---

#### `PUT /api/todos/:id`
Updates an existing todo item.
- **Access**: Protected (JWT - Owner only)
- **Request Body**:
  ```json
  {
    "title": "Updated Todo Title",
    "description": "Updated description",
    "isCompleted": true
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "message": "Todo updated successfully",
    "data": {
      "id": "b3f12a98-9410-4c11-a833-22108711ef0a",
      "title": "Updated Todo Title",
      "description": "Updated description",
      "isCompleted": true,
      "userId": "fe442ca3-6023-4c1c-8228-8dd7ca77ae8b",
      "createdAt": "2026-08-04T10:30:00.000Z",
      "updatedAt": "2026-08-04T10:35:00.000Z"
    }
  }
  ```

---

#### `DELETE /api/todos/:id`
Deletes a todo item by ID.
- **Access**: Protected (JWT - Owner only)
- **Response `200 OK`**:
  ```json
  {
    "message": "Deleted successfully"
  }
  ```

---

## 🧪 Testing with REST Client

A pre-configured `request.rest` file is provided in the project root to test endpoints using VS Code's **REST Client** extension:

1. Open `request.rest` in your editor.
2. Execute the **Register User** request.
3. Execute the **Login User** request and copy the returned `token`.
4. Paste the token into the `Authorization: Bearer <token>` header of your Todo requests.
5. Click **Send Request** above any block to execute the request.

---

## 📄 License

This project is licensed under the MIT License.

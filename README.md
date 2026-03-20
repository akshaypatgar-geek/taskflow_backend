# TaskFlow API — Backend Documentation

## Overview

TaskFlow API is a RESTful backend built with **NestJS**, **Drizzle ORM**, and **PostgreSQL**. It provides authentication (JWT), CRUD for tasks and categories, user management, cursor-based pagination, and real-time task updates via **Socket.IO** WebSockets.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| NestJS | Application framework |
| Drizzle ORM | Database ORM and migrations |
| PostgreSQL | Relational database |
| Passport JWT | Authentication |
| Socket.IO | Real-time WebSocket events |
| Multer | Profile picture upload |
| class-validator | Request validation |
| Swagger | API documentation (`/api`) |
| bcrypt | Password hashing |
| Joi | Environment variable validation |

---

## Project Structure

```
api/
├── src/
│   ├── main.ts                          # App bootstrap, global pipes/filters/interceptors
│   ├── app.module.ts                    # Root module
│   ├── app.controller.ts               # Health-check endpoint
│   ├── app.service.ts
│   │
│   ├── auth/                            # Authentication module
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts             # Passport JWT strategy
│   │   ├── jwt.auth.guard.ts           # Global HTTP JWT guard
│   │   ├── controller/auth.controller.ts
│   │   ├── service/auth.service.ts
│   │   └── dto/                        # Login, register DTOs
│   │
│   ├── users/                           # User management module
│   │   ├── users.module.ts
│   │   ├── controller/users.controller.ts
│   │   ├── service/users.service.ts
│   │   ├── repository/users.repository.ts        # Interface
│   │   ├── repository/users.repository.impl.ts   # Implementation
│   │   ├── dto/
│   │   └── exceptions/
│   │
│   ├── tasks/                           # Tasks module
│   │   ├── tasks.module.ts
│   │   ├── controller/tasks.controller.ts
│   │   ├── service/tasks.service.ts
│   │   ├── repository/tasks.repository.ts        # Interface
│   │   ├── repository/tasks.repository.impl.ts   # Implementation
│   │   ├── websocket/tasks.gateway.ts            # Socket.IO gateway
│   │   ├── websocket/websocket.jwt.guard.ts      # WebSocket auth guard
│   │   ├── dto/
│   │   └── exceptions/
│   │
│   ├── categories/                      # Categories module
│   │   ├── categories.module.ts
│   │   ├── controller/categories.controller.ts
│   │   ├── service/categories.service.ts
│   │   ├── repository/categories.repository.impl.ts
│   │   ├── dto/
│   │   └── exceptions/
│   │
│   ├── common/                          # Shared utilities
│   │   ├── filters/all.exception.filter.ts
│   │   ├── interceptors/logging.interceptor.ts
│   │   ├── interceptors/all.response.validator.interceptor.ts
│   │   ├── dto/response.dto.ts
│   │   └── file-upload/
│   │
│   ├── config/                          # Environment config
│   │   ├── env.config.ts
│   │   └── env.config.module.ts
│   │
│   ├── db/                              # Database setup
│   │   ├── schema.ts                   # Drizzle table definitions
│   │   └── db.module.ts                # DB connection provider
│   │
│   └── decorators/                      # Custom decorators
│       ├── public.decorator.ts         # @Public() — bypass JWT
│       └── current.user.decorator.ts   # @CurrentUser() — inject user
│
├── drizzle/
│   └── migrations/                     # SQL migration files (0000–0009)
│
├── drizzle.config.ts
├── package.json
└── .env
```

---

## Modules

### AppModule (Root)
Imports all feature modules, config, and database modules.

### AuthModule
- **Login** — validates credentials, returns `access_token` (50m) and `refresh_token` (7d).
- **Refresh** — accepts a valid refresh token and issues new token pair.
- **JwtStrategy** — extracts Bearer token and validates payload.
- **JwtAuthGuard** — applied globally; skips routes marked `@Public()`.

### UsersModule
- User registration (password hashed with bcrypt).
- Profile retrieval and update (including profile picture via Multer).
- Repository pattern with interface and implementation.

### TasksModule
- Full CRUD for tasks with cursor-based pagination.
- Filtering by status, priority, category, search key, date range.
- Sorting by any field with configurable order.
- WebSocket gateway for real-time notifications.

### CategoriesModule
- CRUD for categories with cursor-based pagination.

---

## Database Schema (Drizzle ORM)

### Users Table
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key, default random |
| name | VARCHAR(100) | Nullable |
| email | VARCHAR(100) | Unique, not null |
| password | VARCHAR(255) | Not null |
| status | ENUM(ACTIVE, INACTIVE) | Default ACTIVE |
| profilePicture | TEXT | Nullable |

### Tasks Table
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key, default random |
| title | VARCHAR(255) | Not null |
| createdAt | TIMESTAMP | Default now |
| updatedAt | TIMESTAMP | Default now |
| authorId | UUID | Foreign key → users.id |
| priority | ENUM(LOW, MEDIUM, HIGH) | Default LOW |
| categoryId | UUID | Foreign key → categories.id, nullable |
| status | ENUM(OPEN, IN_PROGRESS, COMPLETED) | Default OPEN |

### Categories Table
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key, default random |
| title | VARCHAR(100) | Not null |
| status | ENUM(ACTIVE, INACTIVE) | Default ACTIVE |

### Relations
- `user` → many `tasks` (via `authorId`)
- `category` → many `tasks` (via `categoryId`)

---

## API Endpoints

### Auth (`/auth`)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/auth/login` | Public | Login with email/password |
| POST | `/auth/refresh` | JWT (refresh token) | Get new token pair |

### Users (`/users`)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/users/register` | Public | Register new user |
| GET | `/users/profile` | JWT | Get current user profile |
| PATCH | `/users` | JWT | Update profile (name, picture) |

### Tasks (`/tasks`)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/tasks/create` | JWT | Create a task |
| GET | `/tasks` | JWT | List tasks (with filters/pagination) |
| GET | `/tasks/:id` | JWT | Get task by ID |
| PATCH | `/tasks` | JWT | Update a task |
| DELETE | `/tasks/:id` | JWT | Delete a task |

**Task query parameters:** `limit`, `cursor`, `priority`, `categoryId`, `searchKey`, `status`, `startDate`, `endDate`, `sortBy`, `sortOrder`

### Categories (`/categories`)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/categories/create` | JWT | Create a category |
| GET | `/categories` | JWT | List categories (cursor pagination) |
| GET | `/categories/:id` | JWT | Get category by ID |

---

## Authentication Flow

1. **Login** (`POST /auth/login`): Validates email/password → returns `access_token` (50 min) and `refresh_token` (7 days).
2. **Request auth**: `JwtAuthGuard` (global) reads `Authorization: Bearer <access_token>`, validates via `JwtStrategy`, injects `{ id, email }` into `req.user`.
3. **Public routes**: Decorated with `@Public()` to bypass the guard.
4. **Token refresh** (`POST /auth/refresh`): Client sends the refresh token as Bearer → new token pair issued.
5. **Custom decorators**: `@CurrentUser()` extracts `req.user` for controller methods.

---

## WebSocket (Socket.IO)

### Connection
- Client connects to the WebSocket URL with `{ auth: { token: '<jwt>' } }`.
- `TasksGateway.handleConnection` verifies the JWT and joins a room named by `user.id`.

### Events Emitted (Server → Client)
| Event | Payload | Trigger |
|-------|---------|---------|
| `task.created` | Task JSON | After task creation |
| `task.updated` | Task JSON | After task update |
| `task.deleted` | `{ taskId }` | After task deletion |

Events are emitted to the **author's room**, so only the task owner receives them.

### Guard
`WsJwtGuard` validates the token from `client.handshake.auth.token` on connection.

---

## Global Middleware & Interceptors

| Layer | Class | Purpose |
|-------|-------|---------|
| **Pipe** | `ValidationPipe` | Whitelist + transform DTOs |
| **Filter** | `AllExceptionsFilter` | Catches all exceptions → JSON `{ statusCode, Message, path, timestamp }` |
| **Interceptor** | `LoggingInterceptor` | Logs request method/URL and response time |
| **Interceptor** | `AllResponseTransformInterceptor` | Validates responses via `@ResponseDto()` decorator |

---

## Environment Configuration

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 3000) |
| `JWT_SECRET` | Secret for JWT signing (required, validated by Joi) |
| `DATABASE_URL` | PostgreSQL connection string |

Loaded via `@nestjs/config` with `ConfigModule.forRoot()`. Accessible through `EnvConfigModule` (`env.config.ts`).

---

## Database Scripts

```bash
npm run db:generate   # Generate migration from schema changes
npm run db:migrate    # Run pending migrations
npm run db:push       # Push schema directly (dev)
npm run db:studio     # Open Drizzle Studio GUI
```

---

## Running the Project

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env   # Fill in DATABASE_URL, JWT_SECRET

# Run migrations
npm run db:migrate

# Start development server
npm run start:dev

# Swagger docs available at
http://localhost:3000/api
```

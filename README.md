# 🚀 RoleRadar

**AI-Powered Career Intelligence & Job Discovery Platform**

RoleRadar helps job seekers discover highly relevant jobs, get personalized career insights, and manage their entire job search — all from one platform.

---

## ✨ Features (MVP)

- **🔐 Authentication** — Secure JWT-based auth with Google OAuth
- **📄 Resume Management** — Upload PDF/DOCX or build via guided UI, AI-powered parsing
- **🔍 Job Aggregation** — Jobs from Indeed, Adzuna, Remotive APIs, auto-refreshed
- **🎯 Smart Matching** — AI relevancy scoring (0-100) using semantic embeddings
- **📋 Application Tracker** — Kanban board to track applications across hiring stages
- **🤖 AI Insights** — Per-job match reasons, skill gap analysis, cover letter generation
- **📊 Analytics Dashboard** — Application funnel, skill trends, activity metrics
- **🌙 Dark Mode** — Premium UI with smooth animations

---

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| Java 21 + Spring Boot 3.3 | REST API, business logic |
| PostgreSQL 16 + pgvector | Primary database + vector similarity |
| Redis 7 | Caching, rate limiting |
| MinIO | Object storage (resumes) |
| RabbitMQ | Async job processing |
| Apache Tika | PDF/DOCX text extraction |
| OpenAI API | Resume parsing, matching, insights |
| Flyway | Database migrations |

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 + Vite | SPA framework |
| Tailwind CSS v4 | Styling |
| Zustand | State management |
| React Router v7 | Client-side routing |
| React Hook Form + Zod | Form handling + validation |
| Recharts | Dashboard charts |
| Axios | HTTP client |

---

## 📁 Project Structure

```
RoleRadar/
├── roleradar-backend/          # Spring Boot API
│   ├── src/main/java/com/roleradar/
│   │   ├── config/             # Security, CORS, Redis configs
│   │   ├── auth/               # Authentication module
│   │   ├── resume/             # Resume management module
│   │   ├── job/                # Job aggregation module
│   │   ├── matching/           # Matching engine module
│   │   ├── application/        # Application tracker module
│   │   ├── analytics/          # Analytics module
│   │   └── ai/                 # AI integration module
│   └── src/main/resources/
│       ├── db/migration/       # Flyway SQL migrations
│       └── prompts/            # LLM prompt templates
│
├── roleradar-frontend/         # React SPA
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/              # Route pages
│       ├── hooks/              # Custom hooks
│       ├── stores/             # Zustand stores
│       └── services/           # API client
│
└── docker-compose.yml          # PostgreSQL, Redis, MinIO, RabbitMQ
```

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Node.js 18+ / npm 10+
- Docker & Docker Compose

### 1. Start Infrastructure

```bash
cd RoleRadar
docker-compose up -d
```

This starts PostgreSQL, Redis, MinIO, and RabbitMQ.

### 2. Start Backend

```bash
cd roleradar-backend
./mvnw spring-boot:run
```

API available at `http://localhost:8080`

### 3. Start Frontend

```bash
cd roleradar-frontend
npm install
npm run dev
```

App available at `http://localhost:5173`

---

## 🔧 Environment Variables

### Backend (`application-dev.yml`)
```yaml
spring.datasource.url: jdbc:postgresql://localhost:5432/roleradar
spring.redis.host: localhost
minio.endpoint: http://localhost:9000
openai.api-key: YOUR_OPENAI_KEY
jwt.secret: YOUR_JWT_SECRET
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8080/api/v1
```

---

## 📋 API Documentation

Once the backend is running, Swagger UI is available at:
```
http://localhost:8080/swagger-ui.html
```

---

## 🗺️ Roadmap

- [x] Phase 1: Project Scaffolding
- [ ] Phase 2: Authentication
- [ ] Phase 3: Resume Management
- [ ] Phase 4: Job Aggregation & Search
- [ ] Phase 5: Matching Engine
- [ ] Phase 6: Application Tracker & AI
- [ ] Phase 7: Analytics Dashboard & Polish

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

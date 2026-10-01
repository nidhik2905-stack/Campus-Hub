# Campus Hub

Campus Hub is a college information system prototype with a React web interface and a Spring Boot API.

## Current functionality

- The frontend includes student views for notices, events, timetable, examinations, documents, search, an AI assistant, and profile, plus dashboards for staff roles.
- The frontend currently displays local mock data. Login, role dashboards, search, and AI responses are demonstrator UI; they are not backed by authentication or live campus data.
- The backend currently provides `GET /api/health`. Although security and persistence dependencies are declared, their Spring Boot auto-configuration is disabled; authentication and database access are not implemented.
- Docker Compose can run a local MySQL 8.4 container, but the backend is not yet connected to it. There is no database schema or migration set in this repository.

## Technology

- Frontend: React 19, Vite 8, React Router 7, Tailwind CSS 4
- Backend: Java 21, Spring Boot 3.4, Maven
- Optional local database: MySQL 8.4 with Docker Compose

## Run locally

Prerequisites: Node.js/npm and Java 21/Maven. Docker is only needed for the optional MySQL container.

Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Start the backend in a second terminal:

```bash
cd backend
mvn spring-boot:run
```

The backend health endpoint is available at `http://localhost:8080/api/health`.

To start the optional MySQL container from the repository root:

```bash
docker compose up -d mysql
```

Docker Compose reads database settings from the root `.env` file, if present, or uses the defaults in `docker-compose.yml`. `.env.example` lists the available placeholders. Starting MySQL alone does not enable database access in the backend.

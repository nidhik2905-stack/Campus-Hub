# Campus Information Assistant

## Project Name
Campus Information Assistant

## Project Objective
Build a centralized, college-specific information platform that gives students and authorized staff a secure, role-aware view of notices, events, timetables, exam details, academic documents, and institutional information. The platform is designed to support role-based access and limit information exposure according to department and user permissions.

## Problem Statement
Colleges often distribute information across multiple informal channels, making it difficult for students and staff to find accurate, timely, and role-appropriate information. Users may miss deadlines, announcements, or academic updates because the data is fragmented and lacks centralized access control.

## Proposed Solution
A modular campus information system with a React frontend, a Spring Boot backend, and MySQL persistence layer. The architecture centralizes institutional data and exposes it through secure APIs, role-based authorization, and planned AI-powered search and assistant features.

## Technology Stack
- Frontend: React.js, Vite, JavaScript / JSX, Tailwind CSS, React Router
- Backend: Java 21, Spring Boot, Maven, Spring Web, Spring Data JPA, Hibernate, Spring Security, JWT, Bean Validation
- Database: MySQL
- AI: Gemini API via Spring Boot backend
- Documentation: Markdown, Postman, API docs
- Tooling: VS Code, IntelliJ, Git, GitHub, Docker Compose

## Architecture Overview
The current Phase 0 foundation follows this layered design:

User
 ↓
React + Vite
 ↓
Spring Boot REST API
 ↓
Spring Security / JWT
 ↓
Service Layer
 ↓
Repository Layer
 ↓
MySQL

AI Assistant and Smart Search will be integrated through the backend, using centralized college information and a controlled data access model.

## Team Responsibilities
- Frontend / UI: React app structure, layouts, dashboards, shared components, responsive design
- Java Backend: REST APIs, authentication, services, entities, repositories, DTOs, controllers
- Database & System Management: MySQL schema, seed data, migrations, ER diagrams, SQL documentation
- AI + Smart Search: AI assistant workflow, backend query processing, searching through authoritative college data, response handling

## Development Phases
1. Phase 0 — Foundation
2. Database design and schema planning
3. Backend authentication and RBAC
4. Student portal and staff dashboards
5. Notices, events, timetable, and exams
6. Documents and access controls
7. AI Assistant and Smart Search integration
8. Testing, optimization, and deployment readiness

## Local Setup Instructions
### Prerequisites
- Java 21
- Maven 3.9+
- Node.js 18+
- npm 9+
- MySQL 8+
- Docker Compose (optional for local MySQL)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Database
Create a local MySQL database named `campus_hub` and set the values in the environment file before enabling full JPA/database usage.

### Environment File
Copy `.env.example` to `.env` and update the placeholders.

## Current Project Status
PHASE 0 — FOUNDATION

This project is in the initial setup stage. The frontend foundation, backend foundation, project structure, docs, and environment placeholders have been created. Authentication, JWT, AI integration, dashboards, and advanced RBAC modules are not implemented yet.

## Notes
- No secrets are committed to source control.
- AI and search are planned to operate through the Spring Boot backend only.
- This project is intentionally being developed feature-by-feature, not as a full application in a single step.

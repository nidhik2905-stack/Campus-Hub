# Campus Information Assistant — System Architecture

## Overview
The application is designed as a layered campus information platform that centralizes academic and institutional data. The system is intended to support multiple user roles, department restrictions, and future AI-driven search and assistant capabilities.

## Core Architecture

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

## Frontend Layer
The React + Vite frontend provides a user-facing interface for campus information consumption and role-based navigation. It is responsible for rendering pages, layouts, forms, and dashboard components.

## Backend Layer
The Spring Boot backend exposes REST APIs, enforces security rules, and coordinates business logic. It is responsible for authenticating users, authorizing access based on role and department, and integrating with backend services and AI/search modules.

## Data Layer
MySQL stores the authoritative institutional data used by the campus system. The repository layer manages persistence, and service-level logic controls validation, authorization, and data access rules.

## AI Assistant Architecture

AI Assistant
      ↓
Spring Boot
      ↓
College Information
      ↓
AI API

The AI Assistant will not run as a separate backend service. Instead, it will be integrated through the Spring Boot application and will query college information only from approved institutional sources. The AI must avoid generating unverified institutional facts.

## Smart Search Architecture
Smart Search will operate through the Spring Boot backend and will use centralized college data to search notices, events, documents, timetables, and other approved information sources. It will not rely on independent, unsupervised external data sources.

## Security Model
- Role-based access control (RBAC) will be enforced by the backend.
- Department restrictions will limit what each user can access.
- JWT-based security is planned for authenticated API access.
- Sensitive configuration values must remain externalized in environment files and never committed to source control.

## Phase 0 Scope
This document is current for the foundation phase only. Authentication, RBAC enforcement, AI processing, and Smart Search modules are planned for future phases and are not yet implemented.

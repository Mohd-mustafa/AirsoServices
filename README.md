# ✈️ AirsoService – Travel & Visa Management Platform

**AirsoService** is a secure, role-based travel and visa management platform built using **Spring Boot** (backend) and **React** (frontend).  
It allows users to explore countries, book tickets, upload documents, and track visa approval workflows.

The backend follows **clean layered architecture** with stateless **JWT authentication**.

---

## 🏗 Architecture Overview

AirsoService follows a layered architecture pattern:

```bash
Controller → Service → Repository → Domain Model

```

### Layer Responsibilities

- Controller Layer – Handles HTTP requests and validation

- Service Layer – Contains business logic and workflow orchestration

- Repository Layer – Data persistence using Spring Data JPA

- Domain Model – Entity mapping and relationships

## 🔐 Security Implementation

- Spring Security configuration

- Stateless JWT authentication

- BCrypt password hashing

- Role-based authorization (USER / ADMIN)

- Custom JWT authentication filter

### Endpoint Access Control

- /api/auth/** → Public

- /api/user/** → ROLE_USER

- /api/admin/** → ROLE_ADMIN

## 📦 Core Functional Modules

### Authentication Module

- User registration and login

- JWT generation and validation

- Role-based access enforcement

### Country Management Module

- Admin CRUD operations

- Visa requirement configuration

- Ticket pricing management

- Pagination support for listing APIs

### Booking Workflow Module

- Booking creation by users

- Admin approval lifecycle

- Visa status transitions

- Booking status tracking

### Document Management

- Multipart file upload

- Booking-linked document storage

- Secure file handling

## 📑 API Design Principles

- RESTful endpoint structure

- Proper HTTP status codes

- Request & Response DTO abstraction

- Controller-level validation

- Global exception handling

- Pagination using Spring Pageable

## ⚙️ Global Exception Handling
### Implemented using:

- @ControllerAdvice

- Custom exception classes

- Standardized error response structure

## 📚 API Documentation

- Swagger (OpenAPI) integration for:

- Interactive API testing

- Endpoint documentation

- Request/Response schema visualization
### Accessible at:
 ```bash
/swagger-ui.html
```
## 🗄 Database Design
### Core Entities
- User

- Country

- Booking

- Document

  #### Relationships:

- One User → Many Bookings

- One Country → Many Bookings

- One Booking → Many Documents
## 📈 Scalability Considerations
- Stateless authentication for horizontal scaling

- Service layer isolation for maintainability

- DTO abstraction to prevent entity exposure

- Container-ready architecture
## 🚀 Running Locally
### Backend
```bash
mvn spring-boot:run
```
### Frontend

```bash
npm install
npm run dev
```

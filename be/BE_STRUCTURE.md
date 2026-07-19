# BACKEND STRUCTURE

## Tech Stack

- ASP.NET Core Web API (.NET 10)
- PostgreSQL
- Entity Framework Core
- JWT Authentication
- Refresh Token
- BCrypt
- Swagger
- Docker
- Repository Pattern
- Service Pattern

---

# Project Structure

```text
be/
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── README.md
├── DormitoryManagement.sln
│
└── src/
    └── DormitoryManagement.Api/
        │
        ├── Controllers/
        │   ├── AuthController.cs
        │   ├── UsersController.cs
        │   ├── BuildingsController.cs
        │   ├── RoomTypesController.cs
        │   ├── RoomsController.cs
        │   ├── BedsController.cs
        │   ├── TenantsController.cs
        │   ├── ContractsController.cs
        │   ├── UtilityServicesController.cs
        │   ├── MetersController.cs
        │   ├── MeterReadingsController.cs
        │   ├── InvoicesController.cs
        │   ├── PaymentsController.cs
        │   ├── AssetsController.cs
        │   ├── RoomAssetsController.cs
        │   ├── MaintenanceRequestsController.cs
        │   ├── NotificationsController.cs
        │   └── ReportsController.cs
        │
        ├── Data/
        │   ├── AppDbContext.cs
        │   ├── Configurations/
        │   ├── Migrations/
        │   └── Seed/
        │
        ├── Entities/
        │
        ├── DTOs/
        │   ├── Auth/
        │   ├── Users/
        │   ├── Buildings/
        │   ├── RoomTypes/
        │   ├── Rooms/
        │   ├── Beds/
        │   ├── Tenants/
        │   ├── Contracts/
        │   ├── Utilities/
        │   ├── Invoices/
        │   ├── Payments/
        │   ├── Assets/
        │   ├── Maintenance/
        │   ├── Notifications/
        │   └── Reports/
        │
        ├── Repositories/
        │   ├── Interfaces/
        │   └── Implementations/
        │
        ├── Services/
        │   ├── Interfaces/
        │   └── Implementations/
        │
        ├── Authentication/
        │   ├── JwtService.cs
        │   ├── PasswordHasher.cs
        │   └── CurrentUserService.cs
        │
        ├── Middleware/
        │
        ├── Exceptions/
        │
        ├── Common/
        │
        ├── Extensions/
        │
        ├── Enums/
        │
        ├── Properties/
        │
        ├── Program.cs
        ├── appsettings.json
        ├── appsettings.Development.json
        ├── Dockerfile
        └── DormitoryManagement.Api.csproj
```

---

# Architecture

```text
Client
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
AppDbContext
    │
    ▼
PostgreSQL
```

---

# Folder Responsibilities

## Controllers

- HTTP API
- Validation
- Authorization
- Return DTO

---

## Services

- Business Logic
- Transaction
- Call Repository

---

## Repositories

- CRUD
- LINQ
- EF Core Query

---

## DTOs

- Request DTO
- Response DTO

Không trả Entity trực tiếp.

---

## Entities

Chứa model của database.

Không chứa business logic.

---

## Configurations

Fluent API

- PK
- FK
- Index
- Precision
- Relationship

---

## Middleware

- Exception Handling
- Logging

---

## Authentication

- JWT
- Password Hash
- Current User

---

## Common

- ApiResponse
- Pagination
- Constants

---

## Enums

Toàn bộ enum của hệ thống.

---

# Coding Rules

- Controller không chứa business logic.
- Service xử lý nghiệp vụ.
- Repository chỉ truy cập database.
- Dùng async/await.
- Query đọc dùng AsNoTracking().
- Không trả Entity trực tiếp.
- Luôn dùng DTO.
- Không hard-code password.
- Hash password bằng BCrypt.
- JWT Authentication.
- Authorization bằng Role.
- Soft Delete với DeletedAt hoặc Status.
- Transaction cho các nghiệp vụ nhiều bước.
- Fluent API thay vì Data Annotation cho quan hệ.

---

# API Modules

Authentication

- Auth

System

- User
- Role

Building

- Building
- RoomType
- Room
- Bed

Tenant

- Tenant

Contract

- Contract
- ContractTenant

Utility

- UtilityService
- Meter
- MeterReading

Invoice

- Invoice
- InvoiceItem
- Payment

Asset

- Asset
- RoomAsset
- MaintenanceRequest

Notification

- Notification
- NotificationRecipient

Report

- Revenue
- Debt
- Occupancy
- Utilities

---

# Development Order

1. Authentication
2. Building
3. RoomType
4. Room
5. Bed
6. Tenant
7. Contract
8. Utility
9. Invoice
10. Payment
11. Asset
12. Maintenance
13. Notification
14. Report

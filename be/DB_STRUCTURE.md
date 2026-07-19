# DATABASE STRUCTURE

## Database

PostgreSQL

---

# Authentication

## Role

- Id
- Name
- Description
- CreatedAt
- UpdatedAt

Relationship

Role (1) ---- (N) User

---

## User

- Id
- RoleId
- Username
- PasswordHash
- FullName
- Email
- PhoneNumber
- AvatarUrl
- Status
- LastLoginAt
- CreatedAt
- UpdatedAt
- DeletedAt

Relationship

User (N) ---- (1) Role

User (1) ---- (N) RefreshToken

User (1) ---- (N) AuditLog

---

## RefreshToken

- Id
- UserId
- Token
- ExpiresAt
- RevokedAt
- CreatedAt

Relationship

RefreshToken (N) ---- (1) User

---

## AuditLog

- Id
- UserId
- Action
- EntityName
- EntityId
- OldValues
- NewValues
- CreatedAt

Relationship

AuditLog (N) ---- (1) User

---

# Building

## Building

- Id
- Code
- Name
- Address
- NumberOfFloors
- Description
- IsActive
- CreatedAt
- UpdatedAt

Relationship

Building (1) ---- (N) Room

---

## RoomType

- Id
- Code
- Name
- Capacity
- BasePrice
- Area
- Description
- IsActive
- CreatedAt
- UpdatedAt

Relationship

RoomType (1) ---- (N) Room

---

## Room

- Id
- BuildingId
- RoomTypeId
- Code
- FloorNumber
- Status
- CurrentRent
- Description
- CreatedAt
- UpdatedAt
- DeletedAt

Relationship

Room (N) ---- (1) Building

Room (N) ---- (1) RoomType

Room (1) ---- (N) Bed

Room (1) ---- (N) Contract

Room (1) ---- (N) Meter

Room (1) ---- (N) RoomAsset

Room (1) ---- (N) MaintenanceRequest

---

## Bed

- Id
- RoomId
- Code
- Status
- MonthlyPrice
- Description
- CreatedAt
- UpdatedAt

Relationship

Bed (N) ---- (1) Room

Bed (1) ---- (N) Contract

---

# Tenant

## Tenant

- Id
- TenantCode
- FullName
- DateOfBirth
- Gender
- IdentityNumber
- IdentityIssuedDate
- IdentityIssuedPlace
- PhoneNumber
- Email
- PermanentAddress
- CurrentAddress
- Occupation
- Workplace
- EmergencyContactName
- EmergencyContactPhone
- AvatarUrl
- Status
- CreatedAt
- UpdatedAt
- DeletedAt

Relationship

Tenant (1) ---- (N) Contract

Tenant (N) ---- (N) Contract
through ContractTenant

---

# Contract

## Contract

- Id
- ContractCode
- RoomId
- BedId
- PrimaryTenantId
- StartDate
- EndDate
- MonthlyRent
- DepositAmount
- PaymentDueDay
- Status
- SignedAt
- ActivatedAt
- TerminatedAt
- Note
- CreatedBy
- CreatedAt
- UpdatedAt

Relationship

Contract (N) ---- (1) Room

Contract (N) ---- (1) Bed

Contract (N) ---- (1) Tenant

Contract (1) ---- (N) Invoice

Contract (1) ---- (N) ContractTenant

---

## ContractTenant

Composite Key

- ContractId
- TenantId

Fields

- IsPrimary
- MoveInDate
- MoveOutDate
- Status

Relationship

Contract (N) ---- (N) Tenant

---

# Utility

## UtilityService

- Id
- Code
- Name
- Unit
- DefaultUnitPrice
- CalculationType
- CreatedAt
- UpdatedAt

Relationship

UtilityService (1) ---- (N) Meter

---

## Meter

- Id
- RoomId
- UtilityServiceId
- MeterCode
- InitialReading
- InstalledAt
- Status
- CreatedAt
- UpdatedAt

Relationship

Meter (N) ---- (1) Room

Meter (N) ---- (1) UtilityService

Meter (1) ---- (N) MeterReading

---

## MeterReading

- Id
- MeterId
- ReadingMonth
- PreviousReading
- CurrentReading
- Consumption
- UnitPrice
- Amount
- RecordedBy
- RecordedAt

Relationship

MeterReading (N) ---- (1) Meter

---

# Invoice

## Invoice

- Id
- InvoiceCode
- ContractId
- BillingMonth
- IssueDate
- DueDate
- Subtotal
- DiscountAmount
- LateFee
- TotalAmount
- PaidAmount
- Status
- Note
- CreatedBy
- CreatedAt
- UpdatedAt

Relationship

Invoice (N) ---- (1) Contract

Invoice (1) ---- (N) InvoiceItem

Invoice (1) ---- (N) Payment

---

## InvoiceItem

- Id
- InvoiceId
- MeterReadingId
- ItemType
- Description
- Quantity
- UnitPrice
- Amount

Relationship

InvoiceItem (N) ---- (1) Invoice

InvoiceItem (N) ---- (1) MeterReading

---

## Payment

- Id
- InvoiceId
- PaymentCode
- Amount
- PaymentMethod
- PaymentStatus
- TransactionReference
- PaidAt
- ReceivedBy
- CreatedAt

Relationship

Payment (N) ---- (1) Invoice

---

# Asset

## Asset

- Id
- AssetCode
- Name
- Category
- Unit
- DefaultValue
- Description
- IsActive
- CreatedAt
- UpdatedAt

Relationship

Asset (1) ---- (N) RoomAsset

---

## RoomAsset

- Id
- RoomId
- AssetId
- Quantity
- Condition
- AssignedAt
- PurchasePrice
- SerialNumber
- CreatedAt
- UpdatedAt

Relationship

RoomAsset (N) ---- (1) Room

RoomAsset (N) ---- (1) Asset

RoomAsset (1) ---- (N) MaintenanceRequest

---

## MaintenanceRequest

- Id
- RequestCode
- RoomId
- TenantId
- RoomAssetId
- Title
- Description
- Priority
- Status
- EstimatedCost
- ActualCost
- AssignedTo
- RequestedAt
- StartedAt
- CompletedAt
- ResolutionNote
- CreatedBy
- CreatedAt
- UpdatedAt

Relationship

MaintenanceRequest (N) ---- (1) Room

MaintenanceRequest (N) ---- (1) Tenant

MaintenanceRequest (N) ---- (1) RoomAsset

---

# Notification

## Notification

- Id
- Title
- Content
- NotificationType
- TargetType
- BuildingId
- RoomId
- Priority
- PublishedAt
- ExpiresAt
- Status
- CreatedBy
- CreatedAt
- UpdatedAt

Relationship

Notification (1) ---- (N) NotificationRecipient

---

## NotificationRecipient

- Id
- NotificationId
- UserId
- TenantId
- IsRead
- ReadAt
- CreatedAt

Relationship

NotificationRecipient (N) ---- (1) Notification

NotificationRecipient (N) ---- (1) User

NotificationRecipient (N) ---- (1) Tenant

---

# Summary

Total Tables

1. Roles
2. Users
3. RefreshTokens
4. AuditLogs
5. Buildings
6. RoomTypes
7. Rooms
8. Beds
9. Tenants
10. Contracts
11. ContractTenants
12. UtilityServices
13. Meters
14. MeterReadings
15. Invoices
16. InvoiceItems
17. Payments
18. Assets
19. RoomAssets
20. MaintenanceRequests
21. Notifications
22. NotificationRecipients
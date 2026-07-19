# HƯỚNG DẪN DÙNG GITHUB COPILOT ĐỂ TẠO BACKEND ASP.NET CORE

## 1. Thông tin dự án

Tên dự án:

```text
DormitoryManagement
```

Thư mục backend hiện tại:

```text
be/
```

Công nghệ sử dụng:

- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- PostgreSQL chạy bằng Docker
- JWT Access Token và Refresh Token
- BCrypt để hash mật khẩu
- Swagger/OpenAPI
- Ionic Angular làm frontend
- Kiến trúc Controller → Service → Repository → DbContext

Chức năng chính:

1. Đăng nhập và phân quyền
2. Quản lý tòa nhà
3. Quản lý loại phòng
4. Quản lý phòng
5. Quản lý giường
6. Quản lý người thuê
7. Quản lý hợp đồng
8. Quản lý điện nước
9. Quản lý hóa đơn
10. Quản lý thanh toán
11. Quản lý tài sản
12. Quản lý bảo trì
13. Quản lý thông báo
14. Báo cáo thống kê
15. Ghi lịch sử thao tác

---

# 2. Cách sử dụng file này với Copilot

Mở thư mục:

```text
be/
```

bằng VS Code.

Sau đó mở GitHub Copilot Chat và yêu cầu Copilot đọc file này:

```text
Hãy đọc toàn bộ file COPILOT_BACKEND_GUIDE.md và làm đúng các yêu cầu trong file.
Không tự ý thay đổi kiến trúc, tên project, database hoặc công nghệ.
Thực hiện từng giai đoạn, không tạo tất cả trong một lần.
```

Nên dùng Copilot theo từng giai đoạn để dễ kiểm tra lỗi.

Không nên yêu cầu:

```text
Hãy tạo toàn bộ backend cho tôi.
```

Vì Copilot có thể:

- Tạo thiếu file.
- Dùng sai namespace.
- Tạo quan hệ Entity Framework không chính xác.
- Dùng SQL Server thay vì PostgreSQL.
- Trộn business logic vào Controller.
- Tạo code không build được.

---

# 3. Nguyên tắc bắt buộc khi Copilot tạo code

Copilot phải tuân thủ các nguyên tắc sau:

1. Sử dụng ASP.NET Core Web API với Controller.
2. Sử dụng PostgreSQL thông qua `Npgsql.EntityFrameworkCore.PostgreSQL`.
3. Sử dụng Entity Framework Core Code First.
4. Không sử dụng SQL Server.
5. Không sử dụng Minimal API cho các module nghiệp vụ.
6. Controller không được chứa business logic phức tạp.
7. Controller chỉ:
   - Nhận request.
   - Gọi Service.
   - Trả response.
8. Service chịu trách nhiệm xử lý nghiệp vụ.
9. Repository chịu trách nhiệm truy vấn database.
10. Không trả Entity trực tiếp ra API.
11. Luôn sử dụng Request DTO và Response DTO.
12. Mọi thao tác database phải dùng async/await.
13. Các truy vấn chỉ đọc phải dùng `AsNoTracking()`.
14. Không lưu mật khẩu dạng plain text.
15. Mật khẩu phải hash bằng BCrypt.
16. JWT phải kiểm tra:
   - Issuer.
   - Audience.
   - Lifetime.
   - Signing key.
17. API phải phân quyền bằng `[Authorize]`.
18. Các API quản trị phải dùng role phù hợp.
19. Không hard-code mật khẩu database và JWT key trong code C#.
20. Dùng `appsettings.Development.json` hoặc environment variables.
21. Không xóa cứng dữ liệu quan trọng.
22. Sử dụng trạng thái hoặc `DeletedAt` để soft delete.
23. Các nghiệp vụ nhiều bước phải sử dụng transaction.
24. Tên class dùng PascalCase.
25. Tên biến và phương thức dùng camelCase/PascalCase đúng convention C#.
26. Mỗi class nằm trong một file riêng.
27. Namespace phải đúng theo vị trí project.
28. Code phải build được trước khi chuyển sang giai đoạn tiếp theo.
29. Không tự tạo dữ liệu giả không được yêu cầu.
30. Khi thiếu thông tin, Copilot phải hỏi hoặc thêm TODO rõ ràng, không được tự đoán.

---

# 4. Cấu trúc backend cần tạo

Sử dụng cấu trúc đơn giản, phù hợp đồ án:

```text
be/
├── DormitoryManagement.sln
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── README.md
│
└── src/
    └── DormitoryManagement.Api/
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
        │   ├── BaseEntity.cs
        │   ├── Role.cs
        │   ├── User.cs
        │   ├── RefreshToken.cs
        │   ├── AuditLog.cs
        │   ├── Building.cs
        │   ├── RoomType.cs
        │   ├── Room.cs
        │   ├── Bed.cs
        │   ├── Tenant.cs
        │   ├── Contract.cs
        │   ├── ContractTenant.cs
        │   ├── UtilityService.cs
        │   ├── Meter.cs
        │   ├── MeterReading.cs
        │   ├── Invoice.cs
        │   ├── InvoiceItem.cs
        │   ├── Payment.cs
        │   ├── Asset.cs
        │   ├── RoomAsset.cs
        │   ├── MaintenanceRequest.cs
        │   ├── Notification.cs
        │   └── NotificationRecipient.cs
        │
        ├── Enums/
        │   ├── UserStatus.cs
        │   ├── RoomStatus.cs
        │   ├── BedStatus.cs
        │   ├── ContractStatus.cs
        │   ├── InvoiceStatus.cs
        │   ├── PaymentMethod.cs
        │   ├── PaymentStatus.cs
        │   ├── MaintenanceStatus.cs
        │   └── NotificationStatus.cs
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
        │   ├── CurrentUserService.cs
        │   └── JwtSettings.cs
        │
        ├── Middleware/
        │   └── ExceptionHandlingMiddleware.cs
        │
        ├── Exceptions/
        │   ├── NotFoundException.cs
        │   ├── BadRequestException.cs
        │   ├── ConflictException.cs
        │   └── UnauthorizedException.cs
        │
        ├── Common/
        │   ├── ApiResponse.cs
        │   ├── PaginatedResult.cs
        │   └── PaginationParameters.cs
        │
        ├── Extensions/
        │   ├── ServiceCollectionExtensions.cs
        │   └── ApplicationBuilderExtensions.cs
        │
        ├── Properties/
        │   └── launchSettings.json
        │
        ├── Program.cs
        ├── appsettings.json
        ├── appsettings.Development.json
        ├── Dockerfile
        └── DormitoryManagement.Api.csproj
```

---

# 5. Database PostgreSQL

PostgreSQL chạy bằng Docker.

Tạo file:

```text
be/docker-compose.yml
```

Nội dung:

```yaml
services:
  postgres:
    image: postgres:17
    container_name: dormitory-postgres
    restart: unless-stopped

    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

    ports:
      - "${POSTGRES_PORT}:5432"

    volumes:
      - dormitory_postgres_data:/var/lib/postgresql/data

    healthcheck:
      test:
        [
          "CMD-SHELL",
          "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"
        ]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  dormitory_postgres_data:
```

Tạo file:

```text
be/.env
```

Nội dung dùng cho môi trường local:

```env
POSTGRES_DB=dormitory_db
POSTGRES_USER=dormitory_user
POSTGRES_PASSWORD=123456
POSTGRES_PORT=5432
```

Tạo file:

```text
be/.env.example
```

Nội dung:

```env
POSTGRES_DB=dormitory_db
POSTGRES_USER=dormitory_user
POSTGRES_PASSWORD=change_me
POSTGRES_PORT=5432
```

Thêm vào `.gitignore`:

```gitignore
.env
bin/
obj/
.vs/
.vscode/
*.user
*.suo
```

---

# 6. Connection string

Khi backend chạy trực tiếp trên máy:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=dormitory_db;Username=dormitory_user;Password=123456"
  }
}
```

Khi backend chạy trong Docker cùng PostgreSQL:

```text
Host=postgres;Port=5432;Database=dormitory_db;Username=dormitory_user;Password=123456
```

Không dùng `localhost` khi API và PostgreSQL đều chạy trong Docker Compose.

---

# 7. Danh sách Entity và quan hệ

## 7.1. Role

Thuộc tính:

```text
Id
Name
Description
CreatedAt
UpdatedAt
```

Quan hệ:

```text
Role 1 - N User
```

## 7.2. User

Thuộc tính:

```text
Id
RoleId
Username
PasswordHash
FullName
Email
PhoneNumber
AvatarUrl
Status
LastLoginAt
CreatedAt
UpdatedAt
DeletedAt
```

Quan hệ:

```text
User N - 1 Role
User 1 - N RefreshToken
User 1 - N AuditLog
```

## 7.3. RefreshToken

Thuộc tính:

```text
Id
UserId
Token
ExpiresAt
CreatedAt
RevokedAt
CreatedByIp
RevokedByIp
ReplacementToken
```

## 7.4. AuditLog

Thuộc tính:

```text
Id
UserId
Action
EntityName
EntityId
OldValues
NewValues
IpAddress
UserAgent
CreatedAt
```

`OldValues` và `NewValues` dùng kiểu JSONB trong PostgreSQL.

## 7.5. Building

Thuộc tính:

```text
Id
Code
Name
Address
NumberOfFloors
Description
IsActive
CreatedAt
UpdatedAt
```

Quan hệ:

```text
Building 1 - N Room
```

## 7.6. RoomType

Thuộc tính:

```text
Id
Code
Name
Capacity
BasePrice
Area
Description
IsActive
CreatedAt
UpdatedAt
```

Quan hệ:

```text
RoomType 1 - N Room
```

## 7.7. Room

Thuộc tính:

```text
Id
BuildingId
RoomTypeId
Code
FloorNumber
Status
CurrentRent
Description
CreatedAt
UpdatedAt
DeletedAt
```

Quan hệ:

```text
Room N - 1 Building
Room N - 1 RoomType
Room 1 - N Bed
Room 1 - N Contract
Room 1 - N Meter
Room 1 - N RoomAsset
Room 1 - N MaintenanceRequest
```

Ràng buộc:

```text
BuildingId + Code là duy nhất.
CurrentRent >= 0.
FloorNumber > 0.
```

## 7.8. Bed

Thuộc tính:

```text
Id
RoomId
Code
Status
MonthlyPrice
Description
CreatedAt
UpdatedAt
```

Quan hệ:

```text
Bed N - 1 Room
Bed 1 - N Contract
```

Ràng buộc:

```text
RoomId + Code là duy nhất.
```

## 7.9. Tenant

Thuộc tính:

```text
Id
TenantCode
FullName
DateOfBirth
Gender
IdentityNumber
IdentityIssuedDate
IdentityIssuedPlace
PhoneNumber
Email
PermanentAddress
CurrentAddress
Occupation
Workplace
EmergencyContactName
EmergencyContactPhone
EmergencyContactRelationship
AvatarUrl
IdentityFrontImageUrl
IdentityBackImageUrl
Status
CreatedAt
UpdatedAt
DeletedAt
```

Ràng buộc:

```text
TenantCode là duy nhất.
IdentityNumber là duy nhất.
```

## 7.10. Contract

Thuộc tính:

```text
Id
ContractCode
RoomId
BedId
PrimaryTenantId
StartDate
EndDate
MonthlyRent
DepositAmount
PaymentDueDay
Status
SignedAt
ActivatedAt
TerminatedAt
TerminationReason
Terms
Note
CreatedBy
CreatedAt
UpdatedAt
```

Quan hệ:

```text
Contract N - 1 Room
Contract N - 1 Bed
Contract N - 1 Tenant
Contract 1 - N ContractTenant
Contract 1 - N Invoice
```

Ràng buộc:

```text
EndDate >= StartDate.
MonthlyRent >= 0.
DepositAmount >= 0.
PaymentDueDay từ 1 đến 28.
Không cho phép một giường có nhiều hợp đồng Active cùng lúc.
```

## 7.11. ContractTenant

Khóa chính kết hợp:

```text
ContractId + TenantId
```

Thuộc tính:

```text
ContractId
TenantId
IsPrimary
MoveInDate
MoveOutDate
Status
Note
CreatedAt
UpdatedAt
```

## 7.12. UtilityService

Thuộc tính:

```text
Id
Code
Name
Unit
DefaultUnitPrice
CalculationType
Description
IsActive
CreatedAt
UpdatedAt
```

`CalculationType`:

```text
Meter
Fixed
PerPerson
PerRoom
```

## 7.13. Meter

Thuộc tính:

```text
Id
RoomId
UtilityServiceId
MeterCode
InitialReading
InstalledAt
Status
Description
CreatedAt
UpdatedAt
```

Ràng buộc:

```text
MeterCode là duy nhất.
RoomId + UtilityServiceId là duy nhất.
```

## 7.14. MeterReading

Thuộc tính:

```text
Id
MeterId
ReadingMonth
PreviousReading
CurrentReading
Consumption
UnitPrice
Amount
RecordedBy
RecordedAt
Note
```

Công thức:

```text
Consumption = CurrentReading - PreviousReading
Amount = Consumption * UnitPrice
```

Ràng buộc:

```text
CurrentReading >= PreviousReading.
MeterId + ReadingMonth là duy nhất.
ReadingMonth lưu ngày đầu tiên của tháng.
```

## 7.15. Invoice

Thuộc tính:

```text
Id
InvoiceCode
ContractId
BillingMonth
IssueDate
DueDate
Subtotal
DiscountAmount
LateFee
TotalAmount
PaidAmount
Status
Note
CreatedBy
CreatedAt
UpdatedAt
```

Ràng buộc:

```text
ContractId + BillingMonth là duy nhất.
PaidAmount không được lớn hơn TotalAmount.
```

## 7.16. InvoiceItem

Thuộc tính:

```text
Id
InvoiceId
MeterReadingId
ItemType
Description
Quantity
UnitPrice
Amount
CreatedAt
```

`ItemType`:

```text
RoomRent
Electricity
Water
Internet
Service
Parking
AssetDamage
Penalty
Other
```

## 7.17. Payment

Thuộc tính:

```text
Id
InvoiceId
PaymentCode
Amount
PaymentMethod
PaymentStatus
TransactionReference
PaidAt
ReceivedBy
Note
CreatedAt
```

## 7.18. Asset

Thuộc tính:

```text
Id
AssetCode
Name
Category
Unit
DefaultValue
Description
IsActive
CreatedAt
UpdatedAt
```

## 7.19. RoomAsset

Thuộc tính:

```text
Id
RoomId
AssetId
Quantity
Condition
AssignedAt
PurchasePrice
SerialNumber
Note
CreatedAt
UpdatedAt
```

## 7.20. MaintenanceRequest

Thuộc tính:

```text
Id
RequestCode
RoomId
TenantId
RoomAssetId
Title
Description
Priority
Status
EstimatedCost
ActualCost
AssignedTo
RequestedAt
StartedAt
CompletedAt
ResolutionNote
CreatedBy
CreatedAt
UpdatedAt
```

## 7.21. Notification

Thuộc tính:

```text
Id
Title
Content
NotificationType
TargetType
BuildingId
RoomId
Priority
PublishedAt
ExpiresAt
Status
CreatedBy
CreatedAt
UpdatedAt
```

## 7.22. NotificationRecipient

Thuộc tính:

```text
Id
NotificationId
UserId
TenantId
IsRead
ReadAt
CreatedAt
```

Ràng buộc:

```text
Chỉ một trong UserId hoặc TenantId được có giá trị.
```

---

# 8. Enum cần tạo

## UserStatus

```csharp
public enum UserStatus
{
    Active,
    Inactive,
    Locked
}
```

## RoomStatus

```csharp
public enum RoomStatus
{
    Available,
    PartiallyOccupied,
    Occupied,
    Maintenance,
    Inactive
}
```

## BedStatus

```csharp
public enum BedStatus
{
    Available,
    Occupied,
    Reserved,
    Maintenance,
    Inactive
}
```

## ContractStatus

```csharp
public enum ContractStatus
{
    Draft,
    Pending,
    Active,
    Expired,
    Terminated,
    Cancelled
}
```

## InvoiceStatus

```csharp
public enum InvoiceStatus
{
    Draft,
    Unpaid,
    PartiallyPaid,
    Paid,
    Overdue,
    Cancelled
}
```

## PaymentMethod

```csharp
public enum PaymentMethod
{
    Cash,
    BankTransfer,
    EWallet,
    Card,
    Other
}
```

## PaymentStatus

```csharp
public enum PaymentStatus
{
    Pending,
    Completed,
    Failed,
    Refunded,
    Cancelled
}
```

---

# 9. API Response chung

Tạo class:

```text
Common/ApiResponse.cs
```

Cấu trúc:

```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;

    public T? Data { get; set; }

    public object? Errors { get; set; }
}
```

Ví dụ response thành công:

```json
{
  "success": true,
  "message": "Lấy danh sách phòng thành công.",
  "data": [],
  "errors": null
}
```

Ví dụ response lỗi:

```json
{
  "success": false,
  "message": "Không tìm thấy phòng.",
  "data": null,
  "errors": null
}
```

---

# 10. Pagination

Các API danh sách phải hỗ trợ:

```text
pageNumber
pageSize
search
sortBy
sortDirection
```

Ví dụ:

```http
GET /api/rooms?pageNumber=1&pageSize=10&search=A101
```

Response:

```json
{
  "items": [],
  "pageNumber": 1,
  "pageSize": 10,
  "totalItems": 0,
  "totalPages": 0
}
```

Giới hạn:

```text
pageNumber tối thiểu là 1.
pageSize tối thiểu là 1.
pageSize tối đa là 100.
```

---

# 11. Các giai đoạn yêu cầu Copilot thực hiện

## Giai đoạn 1: Khởi tạo solution

Prompt gửi Copilot:

```text
Hãy thực hiện Giai đoạn 1 cho backend DormitoryManagement.

Yêu cầu:
- Thư mục hiện tại là be.
- Tạo solution DormitoryManagement.sln.
- Tạo project ASP.NET Core Web API dùng Controller tại:
  src/DormitoryManagement.Api
- Không dùng Minimal API cho module nghiệp vụ.
- Thêm project vào solution.
- Tạo docker-compose.yml chạy PostgreSQL 17.
- Tạo .env.example.
- Cập nhật .gitignore.
- Chưa tạo Entity.
- Sau khi hoàn thành, liệt kê các lệnh cần chạy.
- Không chạy lệnh xóa dữ liệu.
```

Lệnh dự kiến:

```bash
dotnet new sln -n DormitoryManagement

dotnet new webapi \
  -n DormitoryManagement.Api \
  -o src/DormitoryManagement.Api \
  --use-controllers

dotnet sln add \
  src/DormitoryManagement.Api/DormitoryManagement.Api.csproj
```

Kiểm tra:

```bash
dotnet build
```

---

## Giai đoạn 2: Cài package và cấu hình PostgreSQL

Prompt:

```text
Hãy thực hiện Giai đoạn 2.

Yêu cầu:
- Cài Npgsql.EntityFrameworkCore.PostgreSQL.
- Cài Microsoft.EntityFrameworkCore.Design.
- Cài Microsoft.EntityFrameworkCore.Tools nếu cần.
- Cài Microsoft.AspNetCore.Authentication.JwtBearer.
- Cài BCrypt.Net-Next.
- Cấu hình appsettings.json và appsettings.Development.json.
- Tạo AppDbContext rỗng.
- Đăng ký AppDbContext bằng UseNpgsql trong Program.cs.
- Cấu hình Swagger.
- Cấu hình CORS cho:
  http://localhost:8100
  http://localhost:4200
- Chưa tạo migration.
- Sau khi hoàn thành phải chạy dotnet build.
```

---

## Giai đoạn 3: Tạo BaseEntity, Enum và Entity

Prompt:

```text
Hãy thực hiện Giai đoạn 3.

Đọc danh sách Entity và quan hệ trong COPILOT_BACKEND_GUIDE.md.

Yêu cầu:
- Tạo BaseEntity.
- Tạo toàn bộ Enum.
- Tạo toàn bộ Entity.
- Mỗi Entity nằm trong một file riêng.
- Tạo đầy đủ navigation properties.
- Không dùng Data Annotation cho cấu hình quan hệ phức tạp.
- Chỉ dùng Fluent API trong thư mục Data/Configurations.
- Các trường tiền dùng decimal.
- Các trường thời gian dùng DateTime hoặc DateTime?.
- Các trường JSONB dùng string hoặc JsonDocument và cấu hình đúng PostgreSQL.
- Không tạo migration ở bước này.
- Sau khi tạo xong phải chạy dotnet build.
- Nếu build lỗi, sửa hoàn toàn trước khi kết thúc.
```

---

## Giai đoạn 4: Cấu hình Entity Framework Core

Prompt:

```text
Hãy thực hiện Giai đoạn 4.

Yêu cầu:
- Tạo IEntityTypeConfiguration<T> cho từng Entity cần cấu hình.
- Cấu hình tên bảng dạng snake_case.
- Cấu hình khóa chính.
- Cấu hình khóa ngoại.
- Cấu hình unique index.
- Cấu hình precision cho decimal.
- Cấu hình max length.
- Cấu hình enum lưu dạng string.
- Cấu hình DeleteBehavior phù hợp.
- Không cascade delete đối với:
  User
  Tenant
  Contract
  Invoice
  Payment
  Room
- Chỉ cascade delete đối với bảng phụ an toàn như:
  RefreshToken khi User bị xóa
  InvoiceItem khi Invoice bị xóa
  ContractTenant khi Contract bị xóa
  NotificationRecipient khi Notification bị xóa
- Cập nhật AppDbContext đầy đủ DbSet.
- AppDbContext phải tự apply configurations từ assembly.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 5: Seed dữ liệu

Prompt:

```text
Hãy thực hiện Giai đoạn 5.

Tạo seed dữ liệu cho:
- Role:
  Admin
  Manager
  Accountant
  Staff
  Tenant

- UtilityService:
  ELECTRICITY
  WATER
  INTERNET
  GARBAGE
  PARKING

Yêu cầu:
- Seed bằng HasData hoặc class seeder rõ ràng.
- Không seed mật khẩu plain text.
- Nếu tạo Admin mặc định, hash mật khẩu bằng BCrypt trong runtime seeder.
- Không hard-code mật khẩu Admin thật trong source.
- Đọc mật khẩu từ environment variable:
  DEFAULT_ADMIN_PASSWORD
- Nếu biến không tồn tại trong Development, sử dụng giá trị tạm và ghi warning.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 6: Tạo migration đầu tiên

Prompt:

```text
Hãy kiểm tra toàn bộ Entity và EF Configuration.

Sau đó:
- Build project.
- Tạo migration tên InitialCreate.
- Không tự động xóa database.
- Không tự chạy database update nếu chưa được tôi xác nhận.
- Hiển thị lệnh migration chính xác.
- Kiểm tra migration có dùng PostgreSQL, không chứa SQL Server type.
```

Lệnh:

```bash
dotnet ef migrations add InitialCreate \
  --project src/DormitoryManagement.Api \
  --startup-project src/DormitoryManagement.Api \
  --output-dir Data/Migrations
```

Cập nhật database:

```bash
dotnet ef database update \
  --project src/DormitoryManagement.Api \
  --startup-project src/DormitoryManagement.Api
```

---

## Giai đoạn 7: Middleware xử lý lỗi

Prompt:

```text
Hãy thực hiện Giai đoạn 7.

Tạo:
- NotFoundException
- BadRequestException
- ConflictException
- UnauthorizedException
- ExceptionHandlingMiddleware

Yêu cầu:
- Middleware trả JSON thống nhất theo ApiResponse.
- 400 cho BadRequestException.
- 401 cho UnauthorizedException.
- 404 cho NotFoundException.
- 409 cho ConflictException.
- 500 cho lỗi không xác định.
- Không trả stack trace trong Production.
- Ghi log lỗi bằng ILogger.
- Đăng ký middleware đúng thứ tự trong Program.cs.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 8: Authentication và JWT

Prompt:

```text
Hãy thực hiện Giai đoạn 8: Authentication.

Tạo:
- LoginRequest
- LoginResponse
- RefreshTokenRequest
- CurrentUserResponse
- IPasswordHasher
- PasswordHasher dùng BCrypt
- IJwtService
- JwtService
- IAuthService
- AuthService
- AuthController
- UserRepository
- RefreshTokenRepository nếu cần

API:
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
GET /api/auth/me

Yêu cầu:
- Access Token chứa:
  sub
  userId
  username
  fullName
  role
- Access Token có thời gian hết hạn ngắn.
- Refresh Token được tạo bằng random cryptographic bytes.
- Chỉ lưu hash của refresh token trong database nếu có thể.
- Refresh Token phải hỗ trợ revoke.
- Khi refresh, token cũ phải bị revoke.
- Kiểm tra trạng thái User phải là Active.
- Cập nhật LastLoginAt khi login thành công.
- Không tiết lộ người dùng sai username hay sai password.
- Thông báo chung:
  Tên đăng nhập hoặc mật khẩu không chính xác.
- Cấu hình JWT authentication trong Program.cs.
- Thêm Swagger Bearer authentication.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 9: Module Building và RoomType

Prompt:

```text
Hãy tạo module Building và RoomType theo kiến trúc:

Controller
Service
Repository
DbContext

Mỗi module cần:
- CreateRequest
- UpdateRequest
- Response
- QueryParameters
- Repository interface
- Repository implementation
- Service interface
- Service implementation
- Controller

API Building:
GET /api/buildings
GET /api/buildings/{id}
POST /api/buildings
PUT /api/buildings/{id}
PATCH /api/buildings/{id}/status

API RoomType:
GET /api/room-types
GET /api/room-types/{id}
POST /api/room-types
PUT /api/room-types/{id}
PATCH /api/room-types/{id}/status

Yêu cầu:
- Hỗ trợ pagination và search.
- Không trả Entity trực tiếp.
- Kiểm tra code trùng.
- Soft delete hoặc IsActive.
- GET dùng AsNoTracking.
- Chỉ Admin và Manager được tạo/sửa.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 10: Module Room và Bed

Prompt:

```text
Hãy tạo module Room và Bed.

API Room:
GET /api/rooms
GET /api/rooms/{id}
GET /api/rooms/available
POST /api/rooms
PUT /api/rooms/{id}
PATCH /api/rooms/{id}/status

API Bed:
GET /api/rooms/{roomId}/beds
GET /api/beds/{id}
POST /api/rooms/{roomId}/beds
PUT /api/beds/{id}
PATCH /api/beds/{id}/status

Yêu cầu:
- Room code chỉ duy nhất trong cùng Building.
- Bed code chỉ duy nhất trong cùng Room.
- Không cho Room chuyển sang Inactive nếu còn Contract Active.
- Không cho Bed chuyển sang Available nếu có Contract Active.
- Tính số chỗ đang sử dụng và số chỗ trống.
- Response Room phải có BuildingName và RoomTypeName.
- Dùng transaction khi cập nhật nhiều dữ liệu.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 11: Module Tenant

Prompt:

```text
Hãy tạo module Tenant.

API:
GET /api/tenants
GET /api/tenants/{id}
POST /api/tenants
PUT /api/tenants/{id}
PATCH /api/tenants/{id}/status

Yêu cầu:
- TenantCode duy nhất.
- IdentityNumber duy nhất.
- Validate email và phone cơ bản.
- Hỗ trợ search theo:
  TenantCode
  FullName
  PhoneNumber
  IdentityNumber
- Không xóa cứng Tenant.
- Không cho chuyển Tenant sang Inactive nếu đang có Contract Active.
- Không trả Entity trực tiếp.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 12: Module Contract

Prompt:

```text
Hãy tạo module Contract.

API:
GET /api/contracts
GET /api/contracts/{id}
POST /api/contracts
PUT /api/contracts/{id}
POST /api/contracts/{id}/activate
POST /api/contracts/{id}/terminate
POST /api/contracts/{id}/cancel
POST /api/contracts/{id}/tenants
DELETE /api/contracts/{id}/tenants/{tenantId}

Yêu cầu nghiệp vụ:
- EndDate phải lớn hơn hoặc bằng StartDate.
- PaymentDueDay từ 1 đến 28.
- Room phải hoạt động.
- Bed phải Available hoặc Reserved khi tạo hợp đồng.
- Không cho một Bed có nhiều Contract Active.
- Khi activate Contract:
  - Contract chuyển Active.
  - Bed chuyển Occupied.
  - Cập nhật Room thành PartiallyOccupied hoặc Occupied.
- Khi terminate hoặc expire:
  - Contract cập nhật trạng thái.
  - Bed chuyển Available.
  - Cập nhật lại Room status.
- Sử dụng transaction.
- PrimaryTenant phải có trong ContractTenant.
- Không cho chỉnh sửa thông tin quan trọng của Contract đã Terminated.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 13: Module điện nước

Prompt:

```text
Hãy tạo module UtilityService, Meter và MeterReading.

API:
GET /api/utility-services
POST /api/utility-services
PUT /api/utility-services/{id}

GET /api/meters
GET /api/meters/{id}
POST /api/meters
PUT /api/meters/{id}

GET /api/meter-readings
GET /api/rooms/{roomId}/meter-readings
POST /api/meter-readings
PUT /api/meter-readings/{id}

Yêu cầu:
- Room + UtilityService chỉ có một Meter đang hoạt động.
- MeterReading mỗi Meter mỗi tháng chỉ có một bản ghi.
- ReadingMonth chuẩn hóa về ngày đầu tháng.
- PreviousReading lấy từ CurrentReading của tháng trước nếu có.
- CurrentReading không nhỏ hơn PreviousReading.
- Consumption = CurrentReading - PreviousReading.
- Amount = Consumption * UnitPrice.
- Không cho sửa MeterReading nếu Invoice liên quan đã Paid.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 14: Module Invoice và Payment

Prompt:

```text
Hãy tạo module Invoice, InvoiceItem và Payment.

API:
GET /api/invoices
GET /api/invoices/{id}
POST /api/invoices
POST /api/invoices/generate-monthly
POST /api/invoices/{id}/cancel

GET /api/invoices/{invoiceId}/payments
POST /api/invoices/{invoiceId}/payments
POST /api/payments/{id}/refund

Yêu cầu tạo hóa đơn:
- Một Contract mỗi tháng chỉ có một Invoice.
- InvoiceItem gồm:
  RoomRent
  Electricity
  Water
  Internet
  Service
  Parking
  Other
- Subtotal bằng tổng InvoiceItem.
- TotalAmount = Subtotal - DiscountAmount + LateFee.
- PaidAmount bằng tổng Payment Completed trừ Payment Refunded.
- Status tự động:
  Unpaid
  PartiallyPaid
  Paid
  Overdue
- Không cho thanh toán vượt số tiền còn thiếu.
- Không cho Payment amount <= 0.
- Dùng transaction khi tạo Invoice cùng InvoiceItem.
- Dùng transaction khi tạo Payment và cập nhật Invoice.
- Không xóa cứng Payment.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 15: Module Asset và Maintenance

Prompt:

```text
Hãy tạo module Asset, RoomAsset và MaintenanceRequest.

API Asset:
GET /api/assets
GET /api/assets/{id}
POST /api/assets
PUT /api/assets/{id}
PATCH /api/assets/{id}/status

API RoomAsset:
GET /api/rooms/{roomId}/assets
POST /api/rooms/{roomId}/assets
PUT /api/room-assets/{id}
PATCH /api/room-assets/{id}/condition

API Maintenance:
GET /api/maintenance-requests
GET /api/maintenance-requests/{id}
POST /api/maintenance-requests
PATCH /api/maintenance-requests/{id}/assign
PATCH /api/maintenance-requests/{id}/status
PATCH /api/maintenance-requests/{id}/complete

Yêu cầu:
- Quantity phải lớn hơn 0.
- Cost không âm.
- Khi hoàn thành bảo trì phải lưu CompletedAt.
- Khi bắt đầu phải lưu StartedAt.
- Không cho Completed chuyển ngược về Pending.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 16: Notification

Prompt:

```text
Hãy tạo module Notification.

API:
GET /api/notifications
GET /api/notifications/{id}
POST /api/notifications
PUT /api/notifications/{id}
POST /api/notifications/{id}/publish
POST /api/notifications/{id}/cancel
GET /api/notifications/my-notifications
PATCH /api/notifications/{id}/read

Yêu cầu:
- Hỗ trợ gửi cho:
  All
  Building
  Room
  Tenant
  User
- Khi publish phải tạo NotificationRecipient phù hợp.
- Không tạo trùng recipient.
- Chỉ recipient mới được đánh dấu đã đọc.
- Khi đọc cập nhật IsRead và ReadAt.
- Sau khi hoàn thành chạy dotnet build.
```

---

## Giai đoạn 17: Reports

Prompt:

```text
Hãy tạo ReportsController và ReportService.

API:
GET /api/reports/occupancy
GET /api/reports/revenue
GET /api/reports/debt
GET /api/reports/utilities
GET /api/reports/expiring-contracts
GET /api/reports/available-rooms
GET /api/reports/maintenance

Yêu cầu:
- Báo cáo chỉ dùng truy vấn, không tạo bảng Report.
- Hỗ trợ fromDate và toDate khi phù hợp.
- Dùng AsNoTracking.
- Chỉ trả DTO.
- Tối ưu query, tránh N+1.
- Revenue chỉ tính Payment Completed.
- Debt là TotalAmount - PaidAmount của hóa đơn chưa thanh toán đủ.
- Occupancy gồm:
  TotalRooms
  AvailableRooms
  OccupiedRooms
  PartiallyOccupiedRooms
  MaintenanceRooms
  OccupancyRate
- Sau khi hoàn thành chạy dotnet build.
```

---

# 12. Prompt kiểm tra code sau mỗi giai đoạn

Sau mỗi giai đoạn, gửi Copilot:

```text
Hãy review toàn bộ code vừa tạo.

Kiểm tra:
1. Project có build được không.
2. Namespace có đúng không.
3. Thiếu using nào không.
4. Có trả Entity trực tiếp ra Controller không.
5. Có business logic trong Controller không.
6. Các method database đã dùng async chưa.
7. Query đọc đã dùng AsNoTracking chưa.
8. Có lỗi vòng lặp JSON navigation property không.
9. Có hard-code secret hay password không.
10. Quan hệ Entity Framework có đúng không.
11. DeleteBehavior có nguy cơ xóa dây chuyền dữ liệu quan trọng không.
12. API route có nhất quán không.
13. Authorization role có đúng không.
14. Response có dùng ApiResponse thống nhất không.
15. Có lỗi nullable reference type không.

Hãy sửa tất cả lỗi phát hiện được và chạy dotnet build.
Không chuyển sang module mới cho đến khi build thành công.
```

---

# 13. Prompt tạo test

Sau khi module chạy ổn:

```text
Hãy tạo Unit Test cho service của module Room.

Sử dụng:
- xUnit
- Moq
- FluentAssertions

Test các trường hợp:
- Tạo Room thành công.
- Building không tồn tại.
- RoomType không tồn tại.
- Trùng Room Code trong cùng Building.
- CurrentRent âm.
- Không cho đổi Room sang Inactive khi có Contract Active.

Không dùng database thật trong Unit Test.
```

Integration Test:

```text
Hãy tạo Integration Test cho AuthController và RoomsController.

Yêu cầu:
- Dùng WebApplicationFactory.
- Dùng PostgreSQL test container nếu có thể.
- Không dùng database production.
- Test login thành công.
- Test login sai mật khẩu.
- Test API không có token trả 401.
- Test role không hợp lệ trả 403.
- Test tạo Room thành công.
```

---

# 14. Lệnh chạy hệ thống

Chạy PostgreSQL:

```bash
docker compose up -d
```

Kiểm tra:

```bash
docker ps
```

Xem log:

```bash
docker logs -f dormitory-postgres
```

Build backend:

```bash
dotnet build
```

Chạy backend:

```bash
dotnet run \
  --project src/DormitoryManagement.Api
```

Chạy với hot reload:

```bash
dotnet watch \
  --project src/DormitoryManagement.Api
```

Tạo migration:

```bash
dotnet ef migrations add InitialCreate \
  --project src/DormitoryManagement.Api \
  --startup-project src/DormitoryManagement.Api \
  --output-dir Data/Migrations
```

Cập nhật database:

```bash
dotnet ef database update \
  --project src/DormitoryManagement.Api \
  --startup-project src/DormitoryManagement.Api
```

Truy cập PostgreSQL:

```bash
docker exec -it dormitory-postgres \
  psql \
  -U dormitory_user \
  -d dormitory_db
```

Xem bảng:

```sql
\dt
```

Thoát:

```sql
\q
```

---

# 15. Checklist hoàn thành backend

## Authentication

- [ ] Login hoạt động.
- [ ] JWT hợp lệ.
- [ ] Refresh Token hoạt động.
- [ ] Logout revoke token.
- [ ] Password đã hash.
- [ ] API kiểm tra role.

## Room

- [ ] CRUD Building.
- [ ] CRUD RoomType.
- [ ] CRUD Room.
- [ ] CRUD Bed.
- [ ] Room status cập nhật đúng.

## Tenant và Contract

- [ ] CRUD Tenant.
- [ ] Tạo Contract.
- [ ] Activate Contract.
- [ ] Terminate Contract.
- [ ] Cập nhật Room và Bed trong transaction.

## Utility

- [ ] Quản lý Meter.
- [ ] Nhập chỉ số điện nước.
- [ ] Tính Consumption.
- [ ] Tính Amount.
- [ ] Không trùng chỉ số theo tháng.

## Invoice

- [ ] Tạo hóa đơn tháng.
- [ ] Tạo chi tiết hóa đơn.
- [ ] Thanh toán một phần.
- [ ] Thanh toán đủ.
- [ ] Không thanh toán vượt.
- [ ] Cập nhật trạng thái hóa đơn.

## Asset

- [ ] CRUD Asset.
- [ ] Gán Asset cho Room.
- [ ] Quản lý tình trạng Asset.
- [ ] Tạo yêu cầu bảo trì.

## Notification

- [ ] Tạo thông báo.
- [ ] Publish.
- [ ] Tạo recipient.
- [ ] Đánh dấu đã đọc.

## Report

- [ ] Báo cáo doanh thu.
- [ ] Báo cáo công nợ.
- [ ] Báo cáo tỷ lệ lấp đầy.
- [ ] Báo cáo điện nước.
- [ ] Báo cáo hợp đồng sắp hết hạn.

## Chất lượng code

- [ ] `dotnet build` thành công.
- [ ] Không còn warning nghiêm trọng.
- [ ] Không hard-code secret.
- [ ] Không trả Entity trực tiếp.
- [ ] Không có business logic trong Controller.
- [ ] Các query đọc dùng `AsNoTracking`.
- [ ] Các thao tác nhiều bước dùng transaction.
- [ ] Có xử lý exception tập trung.
- [ ] Có phân trang cho API danh sách.
- [ ] Có Swagger Bearer authentication.

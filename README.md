# Hướng dẫn cài đặt và sử dụng hệ thống KTX Tây Đô

## 1. Thông tin source

- Tên sản phẩm: Hệ thống quản lý ký túc xá KTX Tây Đô
- GitHub: https://github.com/HuuNam3/ktx-management-system
- Frontend: Angular, Ionic, Tailwind CSS
- Backend: ASP.NET Core Web API, Entity Framework Core
- Database: PostgreSQL chạy bằng Docker

## 2. Clone source từ GitHub

```powershell
git clone https://github.com/HuuNam3/ktx-management-system.git
cd ktx-management-system
```

## 3. Tạo database bằng Docker Desktop

Tạo container PostgreSQL mới với cấu hình:

```txt
Container name: next_postgres
Host port: 5432
Container port: 5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=123456
POSTGRES_DB=nextdb
```

Nếu database cũ bị lỗi cấu trúc bảng, xóa container PostgreSQL và volume cũ rồi tạo lại container mới.

## 4. Chạy backend

```powershell
cd be\src\DormitoryManagement.Api
dotnet run
```

Backend chạy tại:

```txt
http://localhost:5177
```

Swagger:

```txt
http://localhost:5177/swagger/index.html
```

Kiểm tra kết nối database:

```txt
http://localhost:5177/api/reception-logs/stats
```

Nếu trả về JSON là backend đã kết nối PostgreSQL thành công.

## 5. Chạy frontend

```powershell
cd fe
npm install
npm run start -- --host 127.0.0.1 --port 4200
```

Frontend chạy tại:

```txt
http://127.0.0.1:4200/
```

## 6. Tài khoản đăng nhập

```txt
Username: admin
Password: admin
Role: Admin
```

## 7. Chức năng chính

- Đăng nhập hệ thống quản trị.
- Xem tổng quan số liệu ký túc xá.
- Quản lý lễ tân, check-in, check-out và quét QR.
- Quản lý phòng và trạng thái giường.
- Theo dõi nhật ký ra vào.
- Quản lý khách và sinh viên.
- Quản lý vé ăn, vé xe.
- Quản lý thanh toán và công nợ.
- Nhập chỉ số điện nước.
- Quản lý hồ sơ 238.
- In giấy tờ và tài liệu.
- Theo dõi checklist nhân viên.
- Quản lý sự cố và bồi thường.
- Quản lý nhà thầu/thợ.
- Quản lý phản hồi và khiếu nại.

## 8. Lỗi thường gặp

- Nếu backend báo `password authentication failed`, kiểm tra lại biến môi trường Docker PostgreSQL.
- Nếu Swagger báo `relation "user" does not exist`, xóa database/volume cũ rồi tạo lại database sạch.
- Nếu frontend vẫn hiển thị giao diện cũ, nhấn `Ctrl + F5`.
- Nếu port `5432`, `5177` hoặc `4200` bị chiếm, dừng process/container đang dùng port đó rồi chạy lại.

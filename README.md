# MEGO Interior — Landing page

Website giới thiệu **dịch vụ thiết kế và thi công nội thất trọn gói**. Hình bảng giá BASIC được dùng làm tham chiếu tiêu chuẩn UX/UI, không được đưa vào nội dung website.

## Công nghệ
- React + Vite: giao diện frontend.
- Node.js + Express: API nhận yêu cầu tư vấn.
- Lucide React: icon.
- Chưa dùng database. Form demo chỉ in yêu cầu vào terminal backend.

## Cài đặt
Cần Node.js LTS. Mở terminal tại thư mục chứa `package.json`:

```powershell
npm.cmd install
npm.cmd run dev
```

Nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd` như trên.

- Frontend: http://localhost:5173
- API health check: http://localhost:3001/api/health

Dừng bằng Ctrl+C.

## Build
```powershell
npm.cmd run build
npm.cmd run preview
```

## Nội dung và UX/UI
- Trang chủ: thông điệp chính và CTA tư vấn.
- Giới thiệu doanh nghiệp.
- Dịch vụ thiết kế, thi công, sản xuất nội thất, cải tạo.
- Dự án tham khảo.
- Lợi ích và cam kết làm việc.
- Quy trình 4 bước.
- Câu hỏi thường gặp dạng accordion.
- Form tư vấn có loại công trình, nhu cầu và xác thực trường bắt buộc.
- Responsive cho desktop, tablet, mobile; trạng thái focus dễ nhận biết; hỗ trợ reduced motion.
- Màu sắc trung tính, kiểu chữ có phân cấp, khoảng trắng và CTA rõ ràng.

## Trước khi xuất bản
1. Thay tên thương hiệu MEGO, điện thoại, email, địa chỉ mẫu trong `src/App.jsx`.
2. Thay ảnh Unsplash bằng ảnh công trình có quyền sử dụng; mô tả ảnh `alt` cũng cần cập nhật.
3. Cập nhật nội dung dịch vụ, quy trình, dự án theo thực tế.
4. Form hiện gửi đến `http://localhost:3001`; khi triển khai thật cần cấu hình API URL production và lưu dữ liệu hoặc gửi email an toàn.
5. Không công bố cam kết bảo hành, tiến độ hay chất lượng nếu chưa có chính sách doanh nghiệp tương ứng.

## Cấu trúc
```text
mego-interior-landing-v2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── styles.css
└── server/
    └── index.js
```

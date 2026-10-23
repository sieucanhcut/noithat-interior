import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Interior website API is running.' });
});

app.post('/api/contact', (req, res) => {
  const { name, phone, propertyType, service, message } = req.body ?? {};
  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ message: 'Vui lòng nhập họ tên và số điện thoại.' });
  }

  // Demo không có database: dữ liệu chỉ được in ra terminal.
  const lead = {
    name: String(name).trim(),
    phone: String(phone).trim(),
    propertyType: String(propertyType || '').trim(),
    service: String(service || '').trim(),
    message: String(message || '').trim(),
    receivedAt: new Date().toISOString()
  };

  console.log('\\n--- YÊU CẦU TƯ VẤN NỘI THẤT ---');
  console.log(JSON.stringify(lead, null, 2));
  console.log('--------------------------------\\n');

  res.status(201).json({ message: 'Cảm ơn bạn! Yêu cầu tư vấn đã được tiếp nhận.' });
});

app.listen(PORT, () => console.log(`API đang chạy tại http://localhost:${PORT}`));
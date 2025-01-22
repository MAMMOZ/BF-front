# ใช้ Node.js เป็น base image
FROM node:18-alpine

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดในโปรเจกต์ไปยัง container
COPY . .

# สร้างไฟล์ build
RUN npm run build

# เปิดพอร์ตสำหรับใช้งาน
EXPOSE 4173

# รันคำสั่ง preview
CMD ["npm", "run", "dev"]

Media Streaming Backend

A backend project built with Node.js (Express), MongoDB (Mongoose), and JWT authentication.
This API allows admins to upload media metadata (video/audio), generate secure 10-minute streaming URLs, and log media views.

🚀 Features

User authentication with JWT
Password hashing with bcrypt
Media metadata management (title, type, file URL)
Secure streaming URL generation (expires in 10 minutes)
View logging with IP tracking
MVC architecture (Controllers, Routes, Models)

backend/
│── config/
│   └── db.js
│── controllers/
│   ├── authControllers.js
│   └── mediaControllers.js
│── models/
│   ├── adminUserModel.js
│   ├── mediaAssetModel.js
│   └── mediaViewModel.js
│── routes/
│   ├── authRoute.js
│   └── mediaRoute.js
│── server.js
│── .env
│── package.json

.env content
PORT
BASE_URL=http://localhost:5000
DATABASE_URL= ""
SECRET_KEY = ""
NODE_ENV = "development"

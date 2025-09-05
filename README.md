
Media Streaming Backend: 

A Node.js (Express) backend for managing and streaming media assets.
Features include authentication, secure streaming URLs, analytics, Redis caching, rate limiting, and Docker support.

Features

User authentication with JWT (Signup/Login)
Upload and manage media metadata
Secure 10-min streaming URLs
Media view logging with IP & timestamp
Analytics (total views, unique IPs, views per day)
Redis caching for analytics
Rate limiting on view logging
Dockerized setup for easy deployment
Jest test cases included

Tech Stack

Node.js (Express)
MongoDB (Mongoose ODM)
Redis (for caching & rate limiting)
JWT (for authentication)
Jest (for testing)
Docker + Docker Compose (for containerization)

backend/
│── config/        
│── models/        
│── routes/        
│── controllers/   
│── middleware/     
│── tests/         
│── server.js      
│── Dockerfile     
│── docker-compose.yml
│── .env.example

Setup Instructions

Clone the repository
https://github.com/kansari1904/Media-Streaming-Backend.git

cd backend

Configure environment:
cp .env.example .env

Run Locally:

Make sure you have MongoDB and Redis running locally.
npm install
npm start

App will run at: http://localhost:5000

Run with Docker:

docker-compose up --build
This will start:
Backend on port 5000
MongoDB on port 27017
Redis on port 6379

 Run Tests:

npm test

API Endpoints

Auth

POST /auth/signup → Register user
POST /auth/login → Login & get JWT

Media

POST /media → Add media metadata (JWT required)
GET /media/:id/stream-url → Get secure 10-min streaming link (JWT required)
POST /media/:id/view → Log a media view (IP + timestamp) (rate-limited)
GET /media/:id/analytics → Get analytics (cached with Redis)

Example Analytics Response
{
  "total_views": 174,
  "unique_ips": 122,
  "views_per_day": {
    "2025-08-01": 34,
    "2025-08-02": 56
  }
}

Notes

All routes except signup/login require JWT token

Redis is required for caching & rate limiting

Use Docker for quick setup



# Auth App

A simple authentication system built with Node.js, Express,
MongoDB (Mongoose), JWT, and EJS. Includes an Admin Dashboard
for managing users (block/unblock) with forced logout handling.


## Screenshots

![Dashboard Screenshot](https://res.cloudinary.com/drha2z2qr/image/upload/v1764774050/Screenshot_2025-12-03_203022_cquohk.png)

![User List Screenshot](https://res.cloudinary.com/drha2z2qr/image/upload/v1764774049/Screenshot_2025-12-03_203036_cqcio2.png)

# Features

## User Features
- User signup and login
- JWT-based authentication stored in cookies
- Protected routes using middleware
- User is automatically logged out when blocked
- Clean EJS UI pages

## Admin Features
- Admin login (email + password from .env)
- View all users
- Block a user
- Unblock a user
- Blocked users cannot log in and are forced logout instantly


## Tech Stack

Node.js
Express.js
MongoDB with Mongoose
JWT (jsonwebtoken)
Cookie-parser
Bcrypt
EJS Templates


# Project Structure

```
AuthApp/
│── server.js
│── package.json
│── .env
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── AdminController.js
│   └── AuthController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   ├── auth.js
│   └── adminRoutes.js
│
└── views/
    ├── admin/
    │   ├── login.ejs
    │   └── dashboard.ejs
    └── user/
        ├── landingPage.ejs
        ├── login.ejs
        ├── signUp.ejs
        └── home.ejs

```
## Installation and Setup


# 1. Clone this repository
```
git clone https://github.com/yourusername/auth-app.git
```
```
cd auth-app
```

# 2. Install dependencies
```
npm install
```
# 3. Create a .env file with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```
## 4. Start the server
```
npm start
```

## App runs at:
```
 http://localhost:5000/
```

## Available Routes


## User Routes
```
GET  /              -> Landing page
GET  /user/login    -> User login page
GET  /user/signup   -> Register page
POST /user/login
POST /user/signup
GET  /user/home     -> Protected home page
POST /user/logout
```

## Admin Routes
```
GET  /admin/login
POST /admin/adminLogin
GET  /admin/dashboard
POST /admin/block/:id
POST /admin/unblock/:id
POST /admin/logout
```

# Notes

- JWT token is stored in an HTTP cookie.
- When a user is blocked, middleware detects it and logs them out.
- Admin credentials are NOT stored in the database; they come from .env.

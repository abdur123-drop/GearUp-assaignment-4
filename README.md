# 🏋️ GearUp
### Rent Sports & Outdoor Gear Instantly

GearUp is a backend API for a sports and outdoor equipment rental platform.
Customers can browse gears, create rental orders, make payments through Stripe,
and leave reviews. Providers can manage inventory, while admins manage users
and platform activities.



## 🔗 Project Links

Backend API:
https://assaignment-4-level-2.vercel.app/

API Documentation:
https://documenter.getpostman.com/view/54736451/2sBY4Jy3xA

GitHub Repository:
https://github.com/abdur123-drop/GearUp-assaignment-4

Demo Video: 
https://drive.google.com/drive/folders/1GUfjaMq0ANkTtsR7xyVpUtzFP1BOQy0h?usp=sharing


## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT Authentication
- Role Based Authorization

### Validation
- Zod

### Payment
- Stripe Checkout Session

### Deployment
- Vercel
- NeonDB

## ✨ Features

### Authentication
- User registration and login
- JWT based authentication
- Role based access control

### Customer Features
- Browse available gear
- Search and filter gears
- Create rental orders
- Make payments using Stripe
- Track rental status
- Submit reviews

### Provider Features
- Add new gear
- Update gear information
- Delete gear
- Manage inventory
- View rental requests
- Update rental status

### Admin Features
- Manage users
- Suspend/activate users
- View all gears
- View all rental orders
- Manage categories

## 👥 User Roles

| Role | Permission |
|------|------------|
| CUSTOMER | Browse gear, rent equipment, payment, review |
| PROVIDER | Manage gear inventory and rental orders |
| ADMIN | Manage users, gears and rentals |

## 💳 Payment Integration

GearUp uses Stripe Checkout Session for payment processing.

Payment Flow:

1. Customer creates rental order
2. Customer creates Stripe checkout session
3. Payment status remains PENDING
4. Stripe payment completion is verified
5. Customer Confirm Payment
6. Payment status updates to COMPLETED
7. Rental order status updates to PAID


## 🧪 Validation & Error Handling

- Zod is used for request validation
- Prisma errors are handled globally
- All errors return structured JSON response

Example:

{
 success:false,
 message:"Validation failed",
 errorDetails:[]
 error: Here showing error stack
}


## 🔄 Rental Workflow


Customer:
Register
 ↓
Browse Gear
 ↓
Create Rental
 ↓
Payment
 ↓
Pick Up Gear
 ↓
Return Gear
 ↓
Review


Provider:

Register
 ↓
Add Gear
 ↓
Receive Order
 ↓
Confirm Order
 ↓
Update Status

Admin:
Manage Users
Manage Gear
Manage Rentals
Create Category


## 📌 Main API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me


Gear

POST /api/gear
GET /api/gear
GET /api/gear/:id
PATCH /api/gear/:id
DELETE /api/gear/:id


Rental

POST /api/rental
GET /api/rental
GET /api/rental/:id
PATCH /api/rental/status/:id


Payment

POST /api/payment/create
POST /api/payment/confirm
GET /api/payment
GET /api/payment/:id


Review

POST /api/reviews


Category

POST api/categories
GET api/categories
GET api/categories/:id
PATCH api/categories/:id
DELETE api/categories/:id

Admin

GET api/admin/users
PATCH api/admin/users/:id
GET api/admin/gear
GET api/admin/rentals

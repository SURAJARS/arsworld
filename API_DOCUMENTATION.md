# ARS Electronics World - API Documentation

Complete REST API reference for the backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Authentication Endpoints

### POST /auth/register

Register a new user

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "role": "user"
  }
}
```

---

### POST /auth/login

Login user

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "role": "user",
    "language": "en"
  }
}
```

---

### GET /auth/profile

Get logged-in user profile (Protected)

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "role": "user",
  "language": "en",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### PUT /auth/profile

Update user profile (Protected)

**Request:**

```json
{
  "name": "John Updated",
  "phone": "+91-9999999999"
}
```

---

### PUT /auth/update-language

Update language preference (Protected)

**Request:**

```json
{
  "language": "ta"
}
```

---

## Product Endpoints

### GET /products

Get all products with optional filters

**Query Parameters:**

- `useCase` - Filter by use case (small_families, large_families, energy_saving, premium)
- `search` - Search by name or description

**Example:**

```
GET /products?useCase=large_families&search=TV
```

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": {
      "en": "55 inch Smart TV",
      "ta": "55 இஞ்ச் ஸ்மார்ட் டிவி"
    },
    "description": {
      "en": "Latest 4K Smart TV",
      "ta": "சமீபத்திய 4K ஸ்மார்ட் டிவி"
    },
    "price": 35000,
    "useCases": ["large_families", "premium"],
    "images": ["https://example.com/image1.jpg"],
    "isPopular": true,
    "isEnabled": true,
    "specifications": {
      "Screen Size": "55 inch",
      "Resolution": "4K"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### GET /products/:id

Get product by ID

**Response:** (Single product object)

---

### GET /products/use-case/:useCase

Get products by use case

**Example:**

```
GET /products/use-case/energy_saving
```

---

### GET /products/popular

Get popular products

**Response:** (Array of popular products)

---

### POST /products/compare

Compare up to 3 products

**Request:**

```json
{
  "productIds": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013"
  ]
}
```

**Response:** (Array of 1-3 products)

---

### POST /products

Create new product (Admin Only)

**Request:**

```json
{
  "name": { "en": "New Product", "ta": "புதிய பொருள்" },
  "description": { "en": "Description", "ta": "விவரணை" },
  "price": 15000,
  "useCases": ["large_families"],
  "images": ["https://image.jpg"],
  "specifications": {
    "Feature": "Value"
  },
  "isPopular": false,
  "isEnabled": true
}
```

---

### PUT /products/:id

Update product (Admin Only)

**Request:** (Same as POST /products)

---

### DELETE /products/:id

Delete product (Admin Only)

---

## Order Endpoints

### POST /orders/create

Create new order

**Request:**

```json
{
  "products": [
    {
      "product": "507f1f77bcf86cd799439011",
      "quantity": 1,
      "price": 35000
    }
  ],
  "totalAmount": 35000,
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "address": "123 Main St, City"
  }
}
```

**Response:**

```json
{
  "orderId": "507f1f77bcf86cd799439011",
  "razorpayOrderId": "order_9A33XWu170gUtm",
  "amount": 35000,
  "key": "rzp_test_xxxxx"
}
```

---

### POST /orders/verify

Verify payment (Razorpay)

**Request:**

```json
{
  "razorpay_order_id": "order_9A33XWu170gUtm",
  "razorpay_payment_id": "pay_9A33XWu170gUtm",
  "razorpay_signature": "signature...",
  "orderId": "507f1f77bcf86cd799439011"
}
```

---

### GET /orders/my-orders

Get user's orders (Protected)

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "orderId": "ORD-1705329000123",
    "user": "507f1f77bcf86cd799439010",
    "products": [
      {
        "product": {...},
        "quantity": 1,
        "price": 35000
      }
    ],
    "totalAmount": 35000,
    "paymentStatus": "success",
    "orderStatus": "confirmed",
    "customerDetails": {...},
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### GET /orders/all-orders

Get all orders (Admin Only)

---

### GET /orders/:id

Get order details (Protected)

---

### PUT /orders/:id/status

Update order status (Admin Only)

**Request:**

```json
{
  "orderStatus": "shipped"
}
```

**Valid statuses:** placed, confirmed, shipped, delivered, cancelled

---

## Enquiry Endpoints

### POST /enquiries/create

Create enquiry

**Request:**

```json
{
  "productId": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "message": "Can I get a discount?",
  "enquiryType": "whatsapp"
}
```

---

### GET /enquiries

Get all enquiries (Admin Only)

---

### PUT /enquiries/:id/status

Update enquiry status (Admin Only)

**Request:**

```json
{
  "status": "contacted"
}
```

**Valid statuses:** pending, contacted, resolved

---

### DELETE /enquiries/:id

Delete enquiry (Admin Only)

---

## Settings Endpoints

### GET /settings

Get store settings (Public)

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "festivalBannerEnabled": true,
  "festivalBannerText": {
    "en": "Celebrate with us!",
    "ta": "எங்களுடன் கொண்டாடவும்!"
  },
  "shopName": "ARS Electronics World",
  "shopPhone": "+91-9876543210",
  "shopWhatsapp": "+91-9876543210",
  "shopLocation": "Krishnagiri",
  "googleAnalyticsId": "G-XXXXXXXXXX"
}
```

---

### PUT /settings

Update settings (Admin Only)

**Request:**

```json
{
  "festivalBannerEnabled": true,
  "festivalBannerText": {
    "en": "New Banner Text",
    "ta": "புதிய பொலிவு உரை"
  },
  "shopPhone": "+91-9999999999",
  "shopWhatsapp": "+91-9999999999",
  "googleAnalyticsId": "G-NEWID"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized

```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden

```json
{
  "message": "Admin access required"
}
```

### 404 Not Found

```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

---

## Testing with cURL

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "password": "password123"
  }'
```

### Get Products

```bash
curl http://localhost:5000/api/products
```

### Create Order (Requires Auth)

```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "products": [{"product": "ID", "quantity": 1, "price": 35000}],
    "totalAmount": 35000,
    "customerDetails": {...}
  }'
```

---

## Rate Limiting

Currently no rate limiting. Add in production:

- 100 requests per minute per IP for public endpoints
- 50 requests per minute per user for authenticated endpoints

---

## API Versioning

Current version: v1 (base path)

Future: `/api/v2/products` etc.

---

**Last Updated:** January 2024

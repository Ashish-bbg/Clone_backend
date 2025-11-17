# Amazon Clone

A full-stack e-commerce application inspired by Amazon, built with **Node.js**, **Express**, **MongoDB**, and **React (frontend planned)**. This project supports user authentication, product listing, cart management, and order placement.

---

## 🚀 Live Demo

- API (Products endpoint): [https://clone-production-8d54.up.railway.app/api/products](https://clone-production-8d54.up.railway.app/api/products)

> **Note:** Endpoints like `/api/cart`, `/api/orders`, `/api/address` and `/api/users` are **protected** and require authentication.

---

## 📦 Features

- **User Authentication**

  - Register and login users
  - JWT-based stateless authentication
  - Protected routes for cart, orders, and user details

- **Product Management**

  - View all products
  - Get details for a single product

- **Cart Management**

  - Add items to cart
  - Update or remove cart items
  - Protected for logged-in users

- **Order Management**

  - Place orders from cart
  - View order history
  - Tracks order status (pending, shipped, delivered, cancelled)

- **Address Management**

  - Add new Address
  - Get All saved address

- **Middleware**
  - Authentication middleware to protect routes

---

## 📂 Project Structure

```
controllers/
    addressControllers.js
    authControllers.js
    cartController.js
    ordersControllers.js
    productControllers.js
middleware/
    authMiddleware.js
models/
    addressModel.js
    cartModel.js
    orderModel.js
    productModel.js
    reviewModel.js
    userModel.js
routes/
    addressRoutes.js
    authRoutes.js
    cartRoutes.js
    ordersRoutes.js
    productRoutes.js

utils/
    generateTokenResponse.js
server.js
.env
```

---

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/Ashish-bbg/Clone
cd amazon-clone
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=8000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

4. Start the server:

```bash
npm start
```

---

## 🛠 API Endpoints

### Public

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/products`        | List all products            |
| GET    | `/api/products/:id`    | Get a single product by ID   |
| GET    | `/api/products/search` | Get product by search filter |

### Protected (require JWT token)

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| GET    | `/api/cart`            | Get user's cart       |
| POST   | `/api/cart/add`        | Add item to cart      |
| PUT    | `/api/cart/:productId` | Update cart item      |
| DELETE | `/api/cart/:productId` | Remove item from cart |
| POST   | `/api/orders`          | Place order           |
| GET    | `/api/orders/my`       | Get user orders       |
| POST   | `/api/users/register`  | Register user         |
| POST   | `/api/users/login`     | Login user            |
| POST   | `/api/address`         | Create address        |
| GET    | `/api/address`         | Get all addresses     |

> **Note:** Access protected routes with an `Authorization` cookie-based:  
> `Authorization: Cookie-Based`

---

## 🔐 Authentication Flow (Cookie-Based)

1. User logs in → server sends a JWT inside a secure HTTP-only cookie
2. Frontend cannot read or modify the token
3. Browser auto-sends cookie with every request
4. Server validates the token via `authMiddleware.js`.

## 📌 License

This project is open-source and free to use for learning purposes.

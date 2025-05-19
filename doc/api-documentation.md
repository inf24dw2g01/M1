# API Documentation

## Authentication System

The API uses JWT (JSON Web Token) for authentication. There are two levels of access:

- **Regular Users**: Can access their own data
- **Admin Users**: Have additional privileges to manage all users and products

### Default Credentials

For testing purposes, use these credentials:

- **Regular User**:
  - Email: (use any valid email in Users table)
  - Password: `password123`
- **Admin User**:
  - Email: (use any valid email in Users table with admin role)
  - Password: `admin123`

### Authentication Headers

For protected endpoints, include this header with your requests:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Authentication

| Endpoint                | Method | Description                 | Auth Required | Admin Required |
| ----------------------- | ------ | --------------------------- | ------------- | -------------- |
| `/auth/register`        | POST   | Register a new user         | No            | No             |
| `/auth/login`           | POST   | Login and get JWT token     | No            | No             |
| `/auth/google`          | GET    | Initiate Google OAuth login | No            | No             |
| `/auth/google/callback` | GET    | Google OAuth callback URL   | No            | No             |

### Users Management

| Endpoint     | Method | Description             | Auth Required | Admin Required |
| ------------ | ------ | ----------------------- | ------------- | -------------- |
| `/users`     | GET    | Get all users           | Yes           | Yes            |
| `/users/:id` | GET    | Get specific user by ID | Yes           | Yes            |
| `/users/:id` | PUT    | Update user information | Yes           | No\*           |
| `/users/:id` | DELETE | Delete a user           | Yes           | Yes            |

\*Regular users can only update their own profile

### Products

| Endpoint        | Method | Description          | Auth Required | Admin Required |
| --------------- | ------ | -------------------- | ------------- | -------------- |
| `/products`     | GET    | Get all products     | Yes           | No             |
| `/products/:id` | GET    | Get product by ID    | Yes           | No             |
| `/products`     | POST   | Create a new product | Yes           | Yes            |
| `/products/:id` | PUT    | Update a product     | Yes           | Yes            |
| `/products/:id` | DELETE | Delete a product     | Yes           | Yes            |

### Orders

| Endpoint             | Method | Description        | Auth Required | Admin Required |
| -------------------- | ------ | ------------------ | ------------- | -------------- |
| `/orders`            | GET    | Get all orders     | Yes           | No\*           |
| `/orders/:id`        | GET    | Get order by ID    | Yes           | No\*           |
| `/orders/add`        | POST   | Create a new order | Yes           | No             |
| `/orders/update/:id` | PUT    | Update an order    | Yes           | No\*           |
| `/orders/delete/:id` | DELETE | Delete an order    | Yes           | No\*           |

\*Regular users can only access their own orders

## Authentication Flow

1. **Register or Login**:

   - Use `/auth/register` to create a new account
   - Use `/auth/login` to receive a JWT token
   - Alternatively, use Google OAuth with `/auth/google`

2. **Use the JWT Token**:

   - Include the token in the Authorization header for all protected requests
   - Format: `Authorization: Bearer YOUR_JWT_TOKEN`

3. **Authorization Levels**:
   - Regular users can manage their own orders and view products
   - Admin users have full access to all endpoints, including user management and product CRUD operations

## Error Responses

| Status Code | Description                                               |
| ----------- | --------------------------------------------------------- |
| 401         | Unauthorized - No token provided or invalid token         |
| 403         | Forbidden - Not enough privileges (admin rights required) |
| 404         | Not Found - Resource doesn't exist                        |
| 500         | Server Error                                              |

## Database Structure

The API interacts with the following database tables:

- **Users**: User accounts and authentication information
- **Products**: Product catalog information
- **Orders**: Order header information linked to users
- **OrderItems**: Individual items within an order linked to products

## Data Relationships

### Orders, OrderItems, and Products Relationships

The system uses a common e-commerce data model with the following relationships:

1. **Orders to OrderItems (One-to-Many)**

   - One Order can contain multiple OrderItems
   - Each OrderItem belongs to exactly one Order
   - When an Order is deleted, all its OrderItems are automatically deleted (CASCADE)
   - The OrderId in the OrderItems table is a foreign key referencing the id in Orders table

2. **OrderItems to Products (Many-to-One)**

   - Multiple OrderItems can reference the same Product
   - Each OrderItem refers to exactly one Product
   - The ProductId in OrderItems table is a foreign key referencing the id in Products table
   - This relationship tracks which products were purchased in each order

3. **Orders to Users (Many-to-One)**
   - A User can have multiple Orders
   - Each Order belongs to exactly one User (the customer)
   - The CustomerID in Orders table is a foreign key referencing the id in Users table

### Simple Example:

When a customer places an order:

- One record is created in the Orders table with the customer's ID
- For each product in their shopping cart, one record is created in the OrderItems table
- Each OrderItem record contains:
  - Which order it belongs to (OrderId)
  - Which product was ordered (ProductId)
  - The quantity ordered
  - The price at time of purchase

This structure allows the system to:

- Show a user all their orders
- Display all items within a specific order
- Maintain product information separately from orders

## Notes

- All authenticated endpoints require a valid JWT token
- Admin-only endpoints require both authentication AND admin role
- Regular users can only access and modify their own data
- The token contains user information including the role (admin or user)

# Shop API

A RESTful API for managing products, users, and orders with authentication.

## Docker Setup

This project includes Docker configuration for both the Node.js application and MySQL database.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker Compose

1. Copy the environment variables template:

   ```
   cp .env.example .env

   fill in desired values for .env
   ```

2. Start the containers:

   ```
   docker-compose up -d
   ```

3. The API will be available at:

   ```
   http://localhost:3000
   ```

4. API Documentation can be accessed at:
   ```
   http://localhost:3000/api-docs
   ```

### Stopping the containers

```
docker-compose down
```

### Data Persistence

MySQL data is persisted in a Docker volume named `mysql-data`. To completely reset the database:

```
docker-compose down -v
```

## Environment Variables

The following environment variables can be configured in `.env`:

- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: MySQL database name
- `DB_HOST`: localhost
- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `SESSION_SECRET`: Secret key for session management
- `JWT_SECRET`: Secret key for JWT authentication
- `GOOGLE_CLIENT_ID`: Client_ID for google authentication
- `GOOGLE_CLIENT_SECRET`: Secret Key for google web client

# ShopInf

This project demonstrates the practical application of the contents of the Web Development II course, showcasing access control implementation with secure authentication and efficient resource management in a real application. ShopInf is a full-stack e-commerce web application for browsing products, managing carts, placing orders, and handling admin operations with user authentication.


Group 01
Pedro Miguel Soares Venda PedroVenda,
Ephraim Chukwuwike Gibson Ephraim Gibson,
Carolina Barbosa Fernandes Carolina Fernandes,


## Introduction
ShopInf is a modern, full-stack shop application featuring a React-based frontend and a Node.js/Express backend, connected to a MySQL database. The entire application is containerized using Docker, and orchestrated with Docker Compose. When you run `docker compose up`, three separate containers are started: one for the frontend, one for the backend API, and one for the SQL database. This setup ensures each service runs in its own isolated environment, making local development, testing, and deployment consistent and straightforward.

# 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

# 🚀 Installation

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v9 or later)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Quick Start (with Docker Compose)
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd ShopInf
   ```
2. Create a `.env` file in the project root and set required environment variables (see sample in backend_M1/README.md).
3. Build and start all services:
   ```sh
   docker compose up --build
   ```
4. Access the app:
   - Frontend: [http://localhost:4830](http://localhost:4830)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## Manual Setup (Run Without Docker)
1. **You must have a running MySQL instance.**
   - Create a database and user as needed.
   - Set the following environment variables for the backend:
     - `DB_HOST` (MySQL host)
     - `DB_NAME` (database name)
     - `MYSQL_ROOT_PASSWORD` (MySQL root password)
     - Any other required variables (see backend_M1/README.md or backend docs)
2. **Backend:**
   ```sh
   cd backend_M1/src
   npm install
   npm start
   ```
3. **Frontend:**
   ```sh
   cd ../../frontend_M2
   npm install
   npm start
   ```

---

# 👩‍💻 Developer Instructions
- **Environment Variables:** See backend docs (`backend_M1/doc/`) for full details on required environment variables and configuration.
- **Testing:**
  - Frontend: `cd frontend_M2 && npm test`
- **API Documentation:** Available at `/api/docs` when the backend is running.
- **Code Structure:**
  - `backend_M1/` — Node.js/Express backend
  - `frontend_M2/` — React frontend

---

For more details, see the documentation in the `backend_M1/doc/` and `frontend_M2/doc/` folders.

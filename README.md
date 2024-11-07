# User Auth && HASH Creation and Docs

![Node.js](https://img.shields.io/badge/Node.js-v18.x-green.svg)
![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14.x-blue.svg)

#### Building a login and register endpoint whiles hashing the password and validating the requests built with Nodejs Expressjs (For the backend), and PostgreSQL (For database manupulation).
- It follows the MVC structure and uses an ORM.

## Prerequisites

Install:

- Node.js (v18.x or higher)
- PostgreSQL (v14.x or higher)
- npm (v9.x or higher)

## Project Structure

```
project/
├── config/
│   └── DB.js         
├── controllers/
│   └── userAuthController.js
├── models/
│   └── user.js
├── router/
│   └── web.js
├── seeder/
│   └── seed.js
├── .env.example      
├── .gitignore
├── index.js           
└── package.json
└── validate.js
```

## Getting Started

Follow the steps below to clone with repo:

1. **Clone the repository**
   ```bash
   git clone https://github.com/OforiAlexander/User-Auth-Task.git
   cd user-auth-task
   ```

2. **Install dependencies**
   ```bash
   npm install 
   or npm update 
   # If Applicable or you're asked to update some dependencies, run the update command
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Then edit `.env` with your configuration
   ```

4. **Set up the database**
   ```bash
   psql -U postgres
   CREATE DATABASE users;
   \c users

   # You can use tableplus or pgAdmin to manage the database
   ```
   - sql
   A seeder js file has been added to test your db
   run or change the directory if you please
   __
   ```bash
   node ./seeder/seed.js
   ```


5. **Start the server**
   ```bash
   npm start
   # We are using nodemon to automate starting our server
   ```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a User |
| POST | `/login` | Login a user |
---
NTC Users Auth Task completed
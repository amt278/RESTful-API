# RESTful API for Student Management System
This project is a RESTful API built using Node.js and Express, designed to manage student records. It provides endpoints to create, read, update, and delete student information stored in a MongoDB database.

## Features

  - Create Student: Add a new student record.
  - Fetch All Students: Retrieve a list of all student records.
  - Get Student by ID: Fetch a specific student record using their ID.
  - Update Student: Modify an existing student record.
  - Delete Student: Remove a student record from the system.
  - User Authentication: Register and log in users with JWT-based authentication.

## Technologies Used

  - Node.js
  - Express.js
  - MongoDB (via Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - AJV for data validation
    
## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

  - Node.js
  - MongoDB

### Installation

  1. Clone the repository:
  
  ```bash
  git clone <repository-url>
  ```
    
  2. Navigate to the project directory:
  
  ```bash
  cd <project-directory>
  ```

  3. Install the required dependencies:
  
  ```bash
  npm install
  ```

### Configuration
Before running the application, ensure that you have a MongoDB instance running locally or modify the connection string in index.js to point to your MongoDB server.

### Usage
  1. Start the server:
  ```bash
  npm start
  ```

  The server will start and listen on port 3000 (or the port specified in the environment variable).

  2. API Endpoints:
     
  - Create Student: POST `/api/students`
    - Request body: { "name": "Student Name", "id": 1 }
  
  - Fetch All Students: GET `/api/students`
  
  - Get Student by ID: GET `/api/students/:id`
  
  - Update Student: PUT `/api/students/:id`
    - Request body: { "name": "Updated Name" }
  
  - Delete Student: DELETE `/api/students/:id`
  
  - User Registration: POST `/api/users`
    - Request body: { "name": "User Name", "email": "user@example.com", "password": "password" }
  
  - User Login: POST `/api/login`
    - Request body: { "email": "user@example.com", "password": "password" }
    - Response: Returns a JWT token for authenticated requests.

### Data Storage
Student records are stored in a MongoDB database. Ensure that your MongoDB server is running and accessible.

## Middleware
The API uses various middleware for logging, error handling, and validation:
  - Logging: Middleware for logging requests.
  - Error Handling: Centralized error handling middleware.
  - Validation: Input validation for student and user data using AJV.

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

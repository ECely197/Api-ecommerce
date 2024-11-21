# E-commerce Backend API

This project is the backend of an e-commerce system built using **Node.js** and **MongoDB**. It handles the business logic for **users**, **products**, **orders**, and **categories**. The project is structured using the **Model-View-Controller (MVC)** pattern and leverages **Express.js** to create a RESTful API. The database management is handled by **Mongoose**, which provides a straightforward schema-based solution for MongoDB.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The backend of the e-commerce platform is built to manage different aspects of an online store, including user registration, product catalog, order processing, and category management. The API provides endpoints to allow the following operations:

- User authentication (using JWT tokens)
- CRUD operations for products, users, orders, and categories
- File uploading for product images using **Multer**
- Soft deletion of records for logical data retention
- Secure password storage using **bcrypt.js**
- Request validation using **express-validator**

## Features

- **User Management**: Register, login, and manage users.
- **Product Management**: CRUD operations for products, including adding, updating, and deleting products.
- **Order Management**: Handle customer orders.
- **Category Management**: Organize products by categories.
- **Authentication**: Secured routes with JWT authentication.
- **File Uploading**: Upload product images and store them securely.
- **Data Validation**: Validate incoming requests using **express-validator**.
- **Environment Configurations**: Load environment-specific configurations with **dotenv**.

## Technologies

- **Node.js**: JavaScript runtime used for server-side scripting.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB to simplify data modeling.
- **JWT (JsonWebToken)**: For user authentication and authorization.
- **Bcrypt.js**: Hash passwords securely.
- **Multer**: Middleware for file uploading.
- **Express-Validator**: Middleware for validating and sanitizing inputs.

## Dependencies

The project uses the following dependencies:

- **bcryptjs**: Hashing and salting passwords.
- **dotenv**: Load environment variables from `.env` file.
- **express**: Web framework to handle routing and middleware.
- **express-jwt**: Middleware to protect routes with JWT tokens.
- **express-validator**: Middleware for input validation.
- **jsonwebtoken**: For creating and verifying JWT tokens.
- **mongoose**: MongoDB object modeling tool.
- **multer**: Middleware for handling multipart/form-data (file uploads).

The full list of dependencies can be found in the `package.json` file.

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14.x or higher).
- **MongoDB**: Ensure you have MongoDB installed and running locally or use a cloud-based MongoDB service like MongoDB Atlas.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo-url/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file at the root of the project and define your environment variables (see the [Environment Variables](#environment-variables) section).

4. **Run the server**:
   ```bash
   npm start
   ```

   The API will run at [http://localhost:3000](http://localhost:3000).

## Environment Variables

You'll need a `.env` file to configure your environment. Below is a sample `.env.example`:

```bash
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/ecommerce

# JWT Secret key
JWT_SECRET=your_secret_key

# Port for the server
PORT=3000

# Other environment-specific variables can go here
```

Make sure to rename `.env.example` to `.env` and fill in your MongoDB URI and other configurations.

## Error Handling

All API responses follow a consistent error-handling format. On errors, the API returns a JSON response with an appropriate status code and error message:

```json
{
  "error": "Error description here"
}
```

Common errors include:

- `400 Bad Request`: Invalid inputs or missing required fields.
- `401 Unauthorized`: Missing or invalid JWT token.
- `404 Not Found`: Resource not found (product, user, order, etc.).
- `500 Internal Server Error`: General server error.

## Contributing

We welcome contributions! To contribute, please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes (`git commit -m 'Add awesome feature'`).
4. Push to the branch (`git push origin feature/awesome-feature`).
5. Open a pull request.

## Product Seeder

The Product Seeder script is designed to populate the database with initial product data for the eCommerce API. Here's a brief overview of its functionality:

1. **Database Connection**: Establishes a connection to the MongoDB database using the `connectDB` function.
2. **Delete Existing Products**: (Optional) Clears the existing product data to prevent duplicates or outdated entries.
3. **Insert New Products**: Inserts a predefined list of products into the database using `insertMany`.
4. **Logging**: Outputs the details of the seeded products to the console for confirmation.
5. **Error Handling**: Captures any errors that occur during the process and logs them, exiting the script with a failure status if necessary.

To run the seeder, execute the following command in your terminal:
```bash
node seeders/productSeeder.js


## License

This project is licensed under the BIT License. See the [LICENSE](LICENSE) file for details.

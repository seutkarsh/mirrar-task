# MIRRAR TASK REST API Documentation

This documentation provides information on how to run the REST API locally, make API requests, and outlines key architectural decisions and assumptions made during development.

## Local Setup

To run the project locally, follow these steps:

1. Ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

2. Clone the Git repository:

   ```bash
   git clone https://github.com/seutkarsh/mirrar-task.git
   ```

3. Navigate to the project directory:

   ```bash
   cd mirrar-task
   ```

4. Install project dependencies:

   ```bash
   npm install
   ```

5. Create a `.env` file in the root directory with the following content:

   ```env
   MONGODB_CONNECTION_URI=[your_mongodb_uri]
   POST=[your_preferred_port]
   ```

   Note: If `MONGODB_CONNECTION_URI` is not provided, the project will use the default localhost URI.

6. Build the project:

   ```bash
   npm run build
   ```

7. Start the server:

   ```bash
   npm start
   ```

The API will be accessible at `http://localhost:[your_preferred_port]/api`.

## API Interactions

API interactions are documented in the provided [Postman Collection](https://github.com/seutkarsh/mirrar-task/blob/master/Mirrar%20Task.postman_collection.json). Import this collection into Postman to explore and test different API endpoints.

## Assumptions Made

1. No product will be without a variant since SKU is at the variant level.
2. When a product is deleted, all variants of that product are also deleted.

## Architectural Decisions

1. Embedding is used to keep variants and products together to avoid performing operations on different collections, reducing the number of DB calls.
2. Variants are stored as a Map instead of an array for increased efficiency while querying the data, particularly in scaled projects.

## Important Note

Ensure you have a `.env` file with `MONGODB_CONNECTION_URI` set. If not provided, the project will use the default localhost URI, which may result in MongoDB connection errors.

By default, the API runs on port 7000, but you can change it using the `POST` variable in the `.env` file.

The API is also hosted at [https://mirrar-task-api.onrender.com/api](https://mirrar-task-api.onrender.com/api).

For any issues or inquiries, please contact Utkarsh Sharma at seutkarsh@gmail.com.

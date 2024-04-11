# Express App with MongoDB Connection

This is a simple Express.js application that connects to a MongoDB database using Mongoose. It exposes an API endpoint through the route defined in `routes/route.mjs`.

## Code Explanation

### `index.mjs`

```javascript
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/route.mjs'

const app = express();

app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://ilyaasmis17:8080gruug@cluster0.wumbsod.mongodb.net/BooksLib')
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

// Use router for defining routes
app.use('/', router);

// Start the server
app.listen(8000, () => console.log("Server connected at localhost:", 8000));
```

### Explanation:

1. **Importing Dependencies**: The code uses ES6 `import` syntax to import necessary modules. `express` is imported to create the web server, and `mongoose` is imported to connect to the MongoDB database. Additionally, the router module is imported from `./routes/route.mjs`.

2. **Express App Setup**: An instance of the Express application is created and stored in the variable `app`.

3. **Middleware**: `express.json()` middleware is used to parse incoming JSON requests.

4. **MongoDB Connection**: The `mongoose.connect()` method is called to establish a connection to the MongoDB database hosted on MongoDB Atlas. The connection string contains the necessary credentials and database name.

5. **Routes**: The application uses the router defined in `route.mjs` for defining its routes. The router handles incoming requests and directs them to the appropriate controller functions.

6. **Server Initialization**: The `app.listen()` method starts the Express server on port `8000`. A callback function is provided to log a message to the console once the server is successfully started.

Below is the README file explaining the provided code snippet:

---

# Express Router Configuration

This is a module responsible for configuring routes in an Express.js application. It defines API endpoints for CRUD operations on books, using controller functions imported from `../controllers/bookController.mjs`.

## Code Explanation

### `route.mjs`

```javascript
import express from 'express';
import { createBook, findBook, deleteBook, updateBook } from '../controllers/bookController.mjs';

const router = express.Router();

// GET endpoint to retrieve all books
router.get('/api/books', findBook);

// POST endpoint to add a new book
router.post('/api/books/add', createBook);

// DELETE endpoint to remove a book by ID
router.delete('/api/books/delete/:id', deleteBook);

// PUT endpoint to update a book by ID
router.put('/api/books/update/:id', updateBook);

export default router;
```

## Explanation:

1. **Importing Dependencies**: The code uses ES6 `import` syntax to import necessary modules. `express` is imported to create a router, and controller functions (`createBook`, `findBook`, `deleteBook`, `updateBook`) are imported from `../controllers/bookController.mjs`.

2. **Router Setup**: An instance of the Express router is created and stored in the variable `router`.

3. **Route Definitions**: The router defines HTTP endpoints for various CRUD operations on books:
   - `GET /api/books`: Retrieves all books.
   - `POST /api/books/add`: Adds a new book.
   - `DELETE /api/books/delete/:id`: Deletes a book by its ID.
   - `PUT /api/books/update/:id`: Updates a book by its ID.

4. **Exporting Router**: The router object is exported as the default export of the module, making it available for use in other parts of the application.

Here's the README file explaining the provided code snippet:

---

# Mongoose Schema and Model Definition

This module defines a Mongoose schema and model for managing books in a MongoDB database.

## Code Explanation

### `bookModel.mjs`

```javascript
import mongoose from "mongoose";

// Define the schema for books
const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        genre: String,
        ISBN: String,
        availability: Boolean
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a Mongoose model based on the schema
const BookDbModel = mongoose.model("bookDatabase", bookSchema);

export default BookDbModel;
```

## Explanation:

1. **Importing Mongoose**: The code imports the `mongoose` library, which is used for working with MongoDB.

2. **Defining Schema**: A Mongoose schema (`bookSchema`) is defined to specify the structure of book documents in the database. It includes fields such as `title`, `author`, `genre`, `ISBN`, and `availability`, each with their respective data types.

3. **Timestamps**: The schema option `{ timestamps: true }` adds two additional fields (`createdAt` and `updatedAt`) to track when documents are created and updated.

4. **Creating Model**: Using `mongoose.model()`, a Mongoose model named `BookDbModel` is created based on the defined schema. This model represents the collection of books in the MongoDB database.

5. **Exporting Model**: The model is exported as the default export of the module, making it available for use in other parts of the application.

Here's the concise explanation for the provided code snippet:

---

# Book Controller Functions

This module defines controller functions for CRUD operations on books. These functions interact with the `BookDbModel` imported from the `bookModel.mjs` module to perform database operations.

## Code Explanation

```javascript
import BookDbModel from "../models/bookModel.mjs";

const createBook = async (req, res) => {
  // Create a new book document using data from the request body
  const createdField = await BookDbModel.create(req.body).catch(err => console.log(err));
  // Send a success response with the created book data
  return res.send({
    status: 201,
    message: "Book added successfully",
    msg: createdField,
  });
};

const findBook = async (req, res) => {
  // Retrieve books based on query parameters
  const searchData = await BookDbModel.find(req.query).catch(err => res.status(400).send({
    status: "Failure",
    message: err
  }));
  // Send response with search results or no books found message
  return res.send(searchData.length === 0 ? {
    Status: 200,
    alertMsg: "No books found according to the search criteria"
  } : {
    Status: 200,
    alertMsg: "Array of books matching the search criteria",
    message: searchData
  });
};

const deleteBook = async (req, res) => {
  // Delete a book by ID
  await BookDbModel.findByIdAndDelete(req.params.id).then(() => res.status(200).send({
    status: "Success",
    message: "Book Deleted Successfully",
  })).catch((e) => res.send({
    status: 404,
    message: "Book Not Found",
    error: e
  }));
};

const updateBook = async (req, res) => {
  // Update a book by ID with data from the request body
  await BookDbModel.updateOne({ _id: req.params.id }, { $set: req.body }).catch(err => res.status(404).send({
    status: "Failure",
    message: "Book Not Found",
    error: err
  }));
  // Retrieve and send updated book data
  const updatedData = await BookDbModel.find({ _id: req.params.id });
  return res.send({
    status: 200,
    message: "Book Updated Successfully",
    updatedQuery: updatedData,
  });
};

export { createBook, findBook, deleteBook, updateBook };
```

## Explanation:

- **Create Book**: `createBook` function creates a new book document in the database using data from the request body and sends a success response with the created book data.

- **Find Book**: `findBook` function retrieves books based on query parameters, sending either search results or a message indicating no books were found.

- **Delete Book**: `deleteBook` function deletes a book by its ID and sends a success message or an error message if the book is not found.

- **Update Book**: `updateBook` function updates a book by its ID with data from the request body, sending a success message and the updated book data.

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19702979&assignment_repo_type=AssignmentRepo)

# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:

1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

#### To Create a product

- Request:

```
Method: POST

URL: http://localhost:3000/api/products

Headers:

Content-Type: application/json

Authorization: Bearer secrettoken

Body (select raw > JSON):

{
  "name": "Toaster",
  "description": "A nice toaster",
  "price": 35,
  "category": "kitchen",
  "inStock": true
}

```

- Response:

```
{
    "id": "4",
    "name": "Kitchen Organizer",
    "description": "Help you properly arrange and organize your kitchen",
    "price": 30,
    "category": "kitchen",
    "inStock": false
}
```

#### To Get (Read) All Product

- Request:

```
Method: GET

URL: http://localhost:3000/api/products

Headers:

Authorization: Bearer secrettoken
```

- Response:

```
[
    {
        "id": "1",
        "name": "Updated Laptop",
        "description": "New description",
        "price": 1500,
        "category": "electronics",
        "inStock": false
    },
    {
        "id": "2",
        "name": "Smartphone",
        "description": "Latest model with 128GB storage",
        "price": 800,
        "category": "electronics",
        "inStock": true
    },
    {
        "id": "3",
        "name": "Coffee Maker",
        "description": "Programmable coffee maker with timer",
        "price": 50,
        "category": "kitchen",
        "inStock": false
    },
    {
        "id": "4",
        "name": "Kitchen Organizer",
        "description": "Help you properly arrange and organize your kitchen",
        "price": 30,
        "category": "kitchen",
        "inStock": false
    }
]
```

#### To Update a Product

- Request

```
Method: PUT

URL: http://localhost:3000/api/products/1

Headers:

Authorization: Bearer secrettoken

Content-Type: application/json

Body:
{
  "name": "Updated Laptop",
  "description": "New description",
  "price": 1500,
  "category": "electronics",
  "inStock": false
}

```

- Response:

```
{
    "id": "1",
    "name": "Updated Laptop",
    "description": "New description",
    "price": 1500,
    "category": "electronics",
    "inStock": false
}
```

#### To DELETE a product

- Request:

```
Method: DELETE

URL: http://localhost:3000/api/products/4

Headers:

Authorization: Bearer secrettoken


```

- Response:

```
1
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

```

```

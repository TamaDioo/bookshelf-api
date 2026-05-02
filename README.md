# 📚 Bookshelf API

A simple yet powerful REST API for managing your personal book collection. Built with **Express.js** and **Node.js**, this API allows you to create, read, update, and delete books with advanced filtering capabilities.

---

## ✨ Features

- ✅ **CRUD Operations** - Create, read, update, and delete books
- 🔍 **Advanced Filtering** - Search books by name, reading status, and completion status
- 🆔 **Unique IDs** - Automatic ID generation using nanoid
- 📅 **Timestamps** - Automatic tracking of creation and update times
- 🚀 **CORS Enabled** - Cross-Origin Resource Sharing support
- 🐳 **Docker Ready** - Easily deployable with Docker
- ✔️ **Input Validation** - Comprehensive data validation
- 🧪 **Testing** - Jest test suite included
- 📝 **Code Quality** - ESLint configuration for code consistency

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js 5.2.1
- **Utilities**: nanoid, CORS
- **Development**: nodemon, ESLint, Jest
- **Container**: Docker (Alpine Linux)

---

## 📋 Prerequisites

- Node.js 20 or higher
- npm or yarn
- (Optional) Docker for containerization

---

## 🚀 Installation

### Using npm

```bash
# Clone the repository
git clone https://github.com/TamaDioo/bookshelf-api

# Navigate to project directory
cd bookshelf-api

# Install dependencies
npm install
```

### Using Docker

```bash
# Build the image
docker build -t bookshelf-api .

# Run the container
docker run -p 9000:9000 bookshelf-api
```

---

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
npm run start-dev
```

### Production Mode

```bash
npm start
```

The API will be available at: **http://localhost:9000**

---

## 📖 API Endpoints

### Welcome Endpoint

```http
GET /
```

**Response:**

```json
{
  "message": "Welcome to the Bookshelf API",
  "appName": "Bookshelf API"
}
```

### Create a Book

```http
POST /books
Content-Type: application/json

{
  "name": "Book Title",
  "year": 2024,
  "author": "Author Name",
  "summary": "Book summary",
  "publisher": "Publisher Name",
  "pageCount": 300,
  "readPage": 150,
  "reading": true
}
```

**Response (201 Created):**

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "unique-book-id"
  }
}
```

### Get All Books

```http
GET /books
```

**Query Parameters:**

- `name` (optional) - Filter by book name (case-insensitive)
- `reading` (optional) - Filter by reading status (0 or 1)
- `finished` (optional) - Filter by completion status (0 or 1)

**Examples:**

```http
GET /books?name=Harry
GET /books?reading=1
GET /books?finished=1
GET /books?name=Potter&reading=1
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "book-id-1",
        "name": "Harry Potter",
        "publisher": "Bloomsbury"
      }
    ]
  }
}
```

### Get Book by ID

```http
GET /books/:id
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "book": {
      "id": "book-id-1",
      "name": "Harry Potter",
      "year": 1997,
      "author": "J.K. Rowling",
      "summary": "A young wizard's journey",
      "publisher": "Bloomsbury",
      "pageCount": 309,
      "readPage": 309,
      "reading": false,
      "finished": true,
      "insertedAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Update a Book

```http
PUT /books/:id
Content-Type: application/json

{
  "name": "Updated Title",
  "readPage": 200
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "message": "Buku berhasil diperbarui"
}
```

### Delete a Book

```http
DELETE /books/:id
```

**Response (200 OK):**

```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run ESLint to check code quality:

```bash
npm run lint
```

---

## 📁 Project Structure

```
bookshelf-api/
├── src/
│   ├── server.js          # Express server setup
│   ├── routes.js          # API route definitions
│   ├── controller.js      # Request handlers
│   └── books.js           # In-memory data store
├── test/
│   └── book.test.js       # Test suite
├── Dockerfile             # Docker configuration
├── package.json           # Project dependencies
├── eslint.config.js       # ESLint configuration
└── README.md              # This file
```

---

## 📝 Request/Response Notes

### Book Object Properties

| Property     | Type    | Description                         |
| ------------ | ------- | ----------------------------------- |
| `id`         | string  | Unique identifier (auto-generated)  |
| `name`       | string  | **Required** - Book title           |
| `year`       | number  | Publication year                    |
| `author`     | string  | Author name                         |
| `summary`    | string  | Book summary                        |
| `publisher`  | string  | Publisher name                      |
| `pageCount`  | number  | Total pages                         |
| `readPage`   | number  | Pages read                          |
| `reading`    | boolean | Currently reading?                  |
| `finished`   | boolean | Finished reading? (auto-calculated) |
| `insertedAt` | string  | Creation timestamp (ISO 8601)       |
| `updatedAt`  | string  | Last update timestamp (ISO 8601)    |

### Validation Rules

- **Book name** is required (cannot be empty)
- **readPage** cannot exceed **pageCount**
- **finished** is automatically set based on `readPage === pageCount`

---

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "status": "fail",
  "message": "Error description"
}
```

### Common Error Codes

| Status | Scenario                                         |
| ------ | ------------------------------------------------ |
| 400    | Bad request (missing name, readPage > pageCount) |
| 404    | Book not found                                   |
| 500    | Server error                                     |

---

## 🔧 Environment Variables

- `PORT` - Server port (default: 9000)
- `APP_NAME` - Application name (default: 'Nama App belum diset')

**Example:**

```bash
PORT=3000 npm start
```

---

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t bookshelf-api:latest .
```

### Run Container

```bash
docker run -d \
  -p 9000:9000 \
  -e PORT=9000 \
  -e APP_NAME="My Bookshelf" \
  --name bookshelf \
  bookshelf-api:latest
```

---

## 📦 Dependencies

### Production

- **express** (5.2.1) - Web framework
- **cors** (2.8.6) - Cross-origin resource sharing
- **nanoid** (5.1.6) - ID generator

### Development

- **nodemon** (3.1.11) - Auto-reload development server
- **jest** (30.3.0) - Testing framework
- **eslint** (9.39.2) - Code quality tool
- **eslint-config-dicodingacademy** (0.9.5) - ESLint rules

---

## 📄 License

ISC License - feel free to use this project!

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

---

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Happy reading! 📚**

# To-Do List API

A modern, AI-powered To-Do List REST API built with Next.js 15, featuring automatic task categorization using OpenAI GPT or a keyword-based fallback system.

## 🚀 Features

- **CRUD Operations**: Complete Create, Read, Update, Delete operations for tasks
- **AI-Powered Categorization**: Automatic task categorization using OpenAI GPT API with keyword-based fallback
- **In-Memory Storage**: Fast, lightweight data store (perfect for development and testing)
- **RESTful API**: Clean, intuitive API endpoints following REST principles
- **TypeScript**: Fully typed codebase for better developer experience
- **Comprehensive Testing**: Jest and Supertest test suite with high coverage
- **Next.js 15**: Built on the latest Next.js with App Router

## 📋 Task Model

Each task contains the following fields:

```typescript
{
  id: string;              // Unique identifier (auto-generated)
  title: string;           // Task title (required)
  description: string;     // Task description (required)
  status: 'pending' | 'completed';  // Task status
  category?: string;       // Auto-categorized or manual category
  createdAt: string;       // ISO 8601 timestamp
  updatedAt: string;       // ISO 8601 timestamp
}
```

## 🎯 Task Categories

The AI automatically categorizes tasks into:

- **work**: Meetings, projects, deadlines, presentations
- **personal**: Family, friends, birthdays, hobbies
- **shopping**: Groceries, purchases, orders
- **finance**: Bills, payments, taxes, budgets
- **health**: Doctor visits, exercise, medical appointments
- **education**: Study, courses, homework, exams
- **home**: Cleaning, repairs, maintenance, cooking
- **entertainment**: Movies, games, books, concerts
- **general**: Default for uncategorized tasks

## 🔧 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Get All Tasks
```http
GET /api/tasks
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": "task_1",
      "title": "Complete project report",
      "description": "Finish the Q4 project report for client presentation",
      "status": "pending",
      "category": "work",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### 2. Create Task
```http
POST /api/tasks
Content-Type: application/json
```

**Request Body**
```json
{
  "title": "Buy groceries",
  "description": "Get milk, eggs, and bread from the supermarket",
  "status": "pending",  // optional, defaults to "pending"
  "category": "shopping"  // optional, auto-categorized if not provided
}
```

**Response (201 Created)**
```json
{
  "success": true,
  "data": {
    "id": "task_2",
    "title": "Buy groceries",
    "description": "Get milk, eggs, and bread from the supermarket",
    "status": "pending",
    "category": "shopping",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  },
  "message": "Task created successfully"
}
```

**Validation Errors (400 Bad Request)**
```json
{
  "success": false,
  "error": "Title is required and must be a string"
}
```

#### 3. Get Task by ID
```http
GET /api/tasks/:id
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": "task_1",
    "title": "Complete project report",
    "description": "Finish the Q4 project report",
    "status": "pending",
    "category": "work",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Not Found (404)**
```json
{
  "success": false,
  "error": "Task not found"
}
```

#### 4. Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json
```

**Request Body** (all fields optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "category": "work"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": "task_1",
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "category": "work",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  },
  "message": "Task updated successfully"
}
```

#### 5. Delete Task
```http
DELETE /api/tasks/:id
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ or Bun
- OpenAI API Key (optional, for AI categorization)

### Installation

1. **Clone and install dependencies**
```bash
npm install
# or
bun install
```

2. **Set up environment variables** (optional)

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

> **Note**: If you don't provide an OpenAI API key, the system will automatically fall back to keyword-based categorization.

3. **Start the development server**
```bash
npm run dev
# or
bun dev
```

The API will be available at `http://localhost:3000/api/tasks`

## 🧪 Testing

### Run Tests
```bash
npm test
# or
bun test
```

### Run Tests with Coverage
```bash
npm run test:coverage
# or
bun test -- --coverage
```

### Test Structure

- `tests/taskStore.test.ts` - Tests for in-memory task storage
- `tests/aiCategorization.test.ts` - Tests for AI categorization logic
- `tests/api.test.ts` - Integration tests for all API endpoints

## 📦 Project Structure

```
├── src/
│   ├── app/
│   │   └── api/
│   │       └── tasks/
│   │           ├── route.ts         # GET /tasks, POST /tasks
│   │           └── [id]/
│   │               └── route.ts     # GET, PUT, DELETE /tasks/:id
│   └── lib/
│       ├── taskStore.ts             # In-memory data store
│       └── aiCategorization.ts      # AI categorization service
├── tests/
│   ├── setup.ts                     # Test configuration
│   ├── taskStore.test.ts           # Task store tests
│   ├── aiCategorization.test.ts    # AI categorization tests
│   └── api.test.ts                 # API endpoint tests
├── jest.config.js                   # Jest configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## 📝 NPM Scripts

```json
{
  "dev": "next dev --turbopack",      // Start development server
  "build": "next build",              // Build for production
  "start": "next start",              // Start production server
  "lint": "next lint",                // Run ESLint
  "test": "jest",                     // Run tests
  "test:watch": "jest --watch",       // Run tests in watch mode
  "test:coverage": "jest --coverage"  // Run tests with coverage
}
```

## 🤖 AI Categorization

### With OpenAI (Recommended)

When an OpenAI API key is provided, the system uses GPT-3.5-turbo to intelligently categorize tasks based on context and semantics.

**Example:**
```json
{
  "title": "Team Standup",
  "description": "Daily sync with engineering team to discuss sprint progress"
}
// Categorized as: "work"
```

### Keyword-Based Fallback

Without an OpenAI API key, the system uses a keyword matching algorithm to categorize tasks. It analyzes the title and description for specific keywords associated with each category.

**Example:**
```json
{
  "title": "Grocery Shopping",
  "description": "Buy vegetables and fruits from the market"
}
// Categorized as: "shopping"
```

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for GPT-based categorization. If not provided, falls back to keyword-based categorization. |

## 📊 Response Format

All API responses follow a consistent format:

**Success Response**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

**Error Response**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## 🚧 Limitations

- **In-Memory Storage**: Data is stored in memory and will be lost when the server restarts. For production use, integrate with a database (PostgreSQL, MongoDB, etc.)
- **No Authentication**: This is a basic API without authentication. Add authentication middleware for production use.
- **Rate Limiting**: No rate limiting implemented. Consider adding rate limiting for production.

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Task filtering and search
- [ ] Task due dates and reminders
- [ ] Task priorities
- [ ] Subtasks and task dependencies
- [ ] File attachments
- [ ] Task sharing and collaboration
- [ ] WebSocket support for real-time updates

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using Next.js 15, TypeScript, and OpenAI
# Library Management System

## Project Overview
This is a full-stack web application for managing a library system. The system allows users to manage books, members, and borrowing records.

## Technologies Used

### Backend
- ASP.NET Core Web API (.NET 8.0)
- Entity Framework Core
- SQLite Database
- C#

### Frontend
- React.js
- JavaScript
- HTML/CSS
- Axios (for API calls)

## Database Design

### Tables

**Books Table**
- Id (Primary Key)
- Title
- Author
- ISBN
- PublishedYear
- AvailableCopies

**Members Table**
- Id (Primary Key)
- Name
- Email
- PhoneNumber
- MembershipDate

**BorrowRecords Table**
- Id (Primary Key)
- BookId (Foreign Key)
- MemberId (Foreign Key)
- BorrowDate
- ReturnDate

## Project Structure

```
library_management_system/
├── backend/
│   └── LibraryApi/
│       ├── Controllers/
│       ├── Models/
│       ├── Data/
│       ├── Migrations/
│       └── Program.cs
├── frontend/
│   └── src/
│       ├── components/
│       ├── services/
│       └── App.js
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to backend folder
   ```
   cd backend/LibraryApi
   ```

2. Restore dependencies
   ```
   dotnet restore
   ```

3. Run database migrations
   ```
   dotnet ef database update
   ```

4. Run the application
   ```
   dotnet run
   ```
   Backend will run on: http://localhost:5000

### Frontend Setup
1. Navigate to frontend folder
   ```
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the application
   ```
   npm start
   ```
   Frontend will run on: http://localhost:3000

## Features Implemented

### Book Management
- Add new books
- View all books
- Update book details
- Delete books
- Track available copies

### Member Management
- Register new members
- View all members
- Update member information
- Delete members

### Borrowing System
- Borrow books
- Return books
- View borrowing history
- Track due dates

## API Endpoints

### Books
- GET /api/books - Get all books
- GET /api/books/{id} - Get book by ID
- POST /api/books - Add new book
- PUT /api/books/{id} - Update book
- DELETE /api/books/{id} - Delete book

### Members
- GET /api/members - Get all members
- GET /api/members/{id} - Get member by ID
- POST /api/members - Add new member
- PUT /api/members/{id} - Update member
- DELETE /api/members/{id} - Delete member

### Borrow Records
- GET /api/borrowrecords - Get all records
- POST /api/borrowrecords - Create borrow record
- PUT /api/borrowrecords/{id} - Update record (for returns)

## Challenges Faced

1. **CORS Configuration**: Had to configure CORS properly to allow frontend (React) to communicate with backend API.

2. **Database Relationships**: Setting up foreign key relationships between Books, Members, and BorrowRecords required careful planning.



## Future Improvements

- Add user authentication and authorization
- Implement search and filter functionality
- Add email notifications for due dates
- Generate reports for library statistics
- Add fine calculation for late returns

## How to Use

1. Start both backend and frontend servers
2. Open browser and go to http://localhost:3000
3. Use the interface to:
   - Add books to the library
   - Register members
   - Create borrow records when members take books
   - Mark books as returned

## Notes

- Database file (library.db) is created automatically on first run
- Make sure both backend and frontend are running simultaneously
- Backend must be running before starting frontend


# Digital Journal/Diary

A Digital Journal/Diary application built with Node.js that allows users to securely log their daily thoughts, track their mood, and categorize entries. The app features a RESTful API backend and in a future an optional frontend interface built using React.

## Table of Contents
- Features
- Tech Stack
- Project Structure
- Setup Instructions
- Backend
- Frontend
- API Documentation
- Contributing
- License

## Features

### User Authentication: 
Secure sign-up and login using JWT tokens.

### CRUD Operations: 
Create, read, update, and delete journal entries.

### Mood Tracking: 
Track your mood with each entry and visualize mood trends over time.

### Search: 
Full-text search for journal entries by title, content, or tags.

### Tags/Categories: 
Organize entries by custom tags or categories.


## Tech Stack

### Backend:
- Node.js with Express.js for building the API.
- Database for storing journal entries and user data
- JWT for authentication.

### Frontend: (NOT AVAILABLE IN FIRST VERSION)
- React for building the user interface.
- TypeScript for type checking and code organization.

## Project Structure

### Backend Structure
```
digital-journal-backend/
├── http/               # Directory for storing HTTP request files
├── src/
│   ├── controllers/    # Logic for authentication and CRUD operations
│   ├── models/         # Models to connect to Database
│   ├── routes/         # API route definitions
│   ├── middlewares/    # Authentication and error-handling middleware
│   ├── services/       # Optional services like encrypt or database connection
│   ├── utils/          # Utility functions
│   └── app.js          # Main Express app setup
├── .env                # Environment variables (e.g., DB_URL, JWT_SECRET)
└── package.json        # Project metadata and dependencies
```

## Setup Instructions

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/digital-journal.git
cd Digital-Journal-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with environment variables:

```bash
DATABASE_URl=databse_url
DATABASE_TOKEN=database_token 
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the server:

```bash
npm run dev
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to suggest improvements or report bugs.
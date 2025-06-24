# The Tasker - Frontend

A modern task management application built with React, Redux, and Vite.

## Overview

The Tasker is a full-featured task management application inspired by Trello. It allows users to create boards, lists, cards, and checklists to organize their tasks efficiently. The frontend is built with React and uses Redux for state management.

## Features

- **User Authentication**: Register, login, and protected routes
- **Boards Management**: Create, view, and delete boards
- **Lists Management**: Create, view, and delete lists within boards
- **Cards Management**: Create, view, and delete cards within lists
- **Checklists**: Create, view, and delete checklists within cards
- **Check Items**: Create, toggle completion, and delete check items within checklists
- **Responsive Design**: Modern UI that works on various screen sizes

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see the backend README for setup instructions)

## Installation

1. Clone the repository (if not already done):
   ```bash
   git clone https://github.com/yourusername/todo_app.git
   cd todo_app/todo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
   Adjust the URL if your backend is running on a different port or host.

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Building for Production

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Project Structure

```
todo/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # React components
│   │   ├── BoardView.jsx  # Board view component
│   │   ├── Boards.jsx     # Boards list component
│   │   ├── CardModal.jsx  # Card modal component
│   │   ├── Cards.jsx      # Cards component
│   │   ├── Checkitems.jsx # Check items component
│   │   ├── Checklists.jsx # Checklists component
│   │   ├── Dashboard.jsx  # Dashboard component
│   │   ├── Lists.jsx      # Lists component
│   │   ├── Login.jsx      # Login component
│   │   ├── Navbar.jsx     # Navigation bar component
│   │   ├── ProtectedRoute.jsx # Protected route component
│   │   └── Register.jsx   # Registration component
│   ├── store/             # Redux store
│   │   ├── authSlice.js   # Authentication slice
│   │   ├── boardsSlice.js # Boards slice
│   │   ├── cardsSlice.js  # Cards slice
│   │   ├── checkitemsSlice.js # Check items slice
│   │   ├── checklistsSlice.js # Checklists slice
│   │   ├── index.js       # Store configuration
│   │   └── listsSlice.js  # Lists slice
│   ├── utils/             # Utility functions
│   │   └── axiosConfig.js # Axios configuration
│   ├── App.css            # Application styles
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
└── vite.config.js         # Vite configuration
```

## Technologies Used

- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Routing
- **Axios**: HTTP client
- **Vite**: Build tool

## API Integration

The frontend communicates with the backend API using Axios. The API base URL is configured in `src/utils/axiosConfig.js`. Authentication tokens are automatically included in API requests using Axios interceptors.

## Authentication Flow

1. User registers or logs in
2. Backend returns a JWT token
3. Token is stored in localStorage
4. Protected routes check for token validity
5. Logout removes the token from localStorage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

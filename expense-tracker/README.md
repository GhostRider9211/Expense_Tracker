# Expense Tracker Application

A modern, full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to track their income and expenses, view financial insights through a dashboard, and manage their personal finances effectively.

## Features

*   **User Authentication:** Secure sign-up and sign-in functionality.
*   **Dashboard:** Visual overview of total balance, income, and expenses.
*   **Expense Management:** Add, view, and delete expenses.
*   **Categorization:** Categorize expenses (Food, Transport, Entertainment, etc.) for better tracking.
*   **Financial Profile:** Set and update initial balance and income.
*   **Demo Mode:** Explore the application features with mock data without signing in.
*   **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Tech Stack

### Client
*   **React:** Frontend library for building user interfaces.
*   **Vite:** Fast build tool and development server.
*   **TypeScript:** Static type checking for better code quality.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Recharts:** Composable charting library for React.
*   **React Router:** Declarative routing for React applications.
*   **Lucid React:** Beautiful & consistent icons.

### Server
*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web application framework for Node.js.
*   **MongoDB:** NoSQL database for storing application data.
*   **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **Cors:** Middleware to enable Cross-Origin Resource Sharing.
*   **Dotenv:** Module to load environment variables.

## Prerequisites

Before running the application, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager)
*   [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd expense-tracker
    ```

2.  **Install dependencies:**
    You can install dependencies for both client and server using the root script:
    ```bash
    npm run install-all
    ```
    Or install them individually:
    ```bash
    # Client
    cd client
    npm install

    # Server
    cd ../server
    npm install
    ```

## Configuration

1.  **Backend Environment Variables:**
    Create a `.env` file in the `server` directory:
    ```bash
    cd server
    touch .env
    ```
    Add the following variables to `server/.env`:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/expense-tracker # Or your MongoDB Atlas URI
    ```

## Running the Application

1.  **Start both Client and Server:**
    From the root directory, run:
    ```bash
    npm start
    ```
    This command uses `concurrently` to run both the backend server (port 5000) and the frontend client (port 5173).

2.  **Access the Application:**
    Open your browser and navigate to `http://localhost:5173`.

## Project Structure

```
expense-tracker/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context for state management
│   │   ├── pages/          # Application pages (Dashboard, SignIn, etc.)
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Backend Node.js/Express application
│   ├── models/             # Mongoose models (User, Expense)
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   └── package.json
├── package.json            # Root package.json for managing both apps
└── README.md               # Project documentation
```

## Scripts

*   `npm start`: Runs both client and server concurrently.
*   `npm run server`: Runs only the backend server.
*   `npm run client`: Runs only the frontend client.
*   `npm run install-all`: Installs dependencies for both client and server.

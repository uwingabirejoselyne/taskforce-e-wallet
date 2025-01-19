# taskforce-wallet-project

# Overview

Eric, an employee of Code of Africa GmbH, has difficulty managing his income and expenses across multiple accounts, including bank accounts, mobile money, and cash. This web application offers a solution to track, manage, and visualize all financial transactions effectively.

Features

1. Transaction Management

Add income and expense transactions.

Track transactions across multiple accounts (e.g., bank, mobile money, cash).

2. Report Generation

Generate detailed reports based on custom time gaps .

Filter reports by account, category, or subcategory.

3. Budget Management

Set a maximum budget for expenses.

Receive notifications when expenses exceed the set budget.

4. Categories and Subcategories

Create and manage categories and subcategories for expenses (e.g., Food, Transportation, Entertainment).

Link transactions to categories or subcategories for better organization.

5. Data Visualization

Visualize income and expense summaries using graphs and charts.

Analyze trends in financial activity.

6. User Authentication

Secure registration and login.

JWT-based authentication for secure access and token-based session management.



# Prerequisites

Ensure you have the following installed:

Node.js (v16 or higher)

MongoDB (local or cloud, e.g., MongoDB Atlas)

A package manager (npm or yarn)

# Hosted link 
frontend: ` https://taskforce-e-wallet-1.onrender.com/`
api: `https://taskforce-e-wallet.onrender.com`

# Setup Instructions

Clone the Repository
`https://github.com/uwingabirejoselyne/taskforce-e-wallet`
make `cd api` for backend
make `cd frontend` for frontend

# Install Dependencies

`npm install`

# Environment Variables for backend
Create a .env file in the project root and include the following variables in backend folder:

# PORT=5000
# MONGO_URI=
# JWT_SECRET=

# Environment Variables for fronted
Create a .env file in the project root and include the following variables in frontend folder:
`REACT_APP_API_BASE_URL=http://localhost:5000`

# Start the Application

`npm run start`

The server will run at `http://localhost:5000`.
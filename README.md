# ☕ Coffee Menu App

A full-stack CRUD application to manage a cozy coffee shop menu with Clerk-powered authentication and MongoDB storage.


## ✨ Features

- 🔐 **Clerk Authentication**: Only signed-in users can add, edit, or delete items.
- ☕ **CRUD** operations for coffee menu items:
  - Create: Add new drinks
  - Read: Browse all drinks
  - Update: Modify existing items
  - Delete: Remove items
- 📦 **MongoDB** database (via Mongoose)
- ⚛️ **React** frontend with Clerk session support
- 🚀 **Express.js** backend with route protection

## 🧱 Tech Stack

| Layer       | Stack                        |
|-------------|------------------------------|
| Frontend    | React, Clerk React SDK       |
| Backend     | Express.js, Clerk Express SDK |
| Database    | MongoDB (via Mongoose)       |
| Auth        | Clerk                         |
| Dev Tools   | Axios, Concurrently, Dotenv   |

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone git@github.com:talhaqudsi/coffee-menu-app.git
cd coffee-menu-app
```

### 2. Install Dependencies
The following command will install all required dependencies when ran from the root directory:
```bash
# At root directory
npm run install-all
```

### 3. Environment Setup

#### Create a `.env` file in `/backend`:

```env
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
MONGODB_URI=mongodb://localhost:27017/coffee_menu
```
#### Create a `.env` file in `/frontend`:

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
REACT_APP_BACKEND_URL=http://localhost:5001
```

### 4. Seed Sample Data

(Optional) Seed dummy menu items into MongoDB:

```bash
cd backend
node seed.js
```

### 5. Run the App (Dev Mode)

```bash
# At root directory
npm run start
```

This runs both backend and frontend concurrently:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## 🔐 Clerk-Protected Routes

Routes like `POST /api/menu`, `PUT /api/menu/:id`, and `DELETE /api/menu/:id` require a valid Clerk Bearer token.

## 🧪 Testing with Postman

To test protected routes:

1. Get a token from Clerk via your frontend session (console: `await window.Clerk.session.getToken()`)
2. In Postman:
   - Authorization tab → Bearer Token
   - Paste your token
3. Send `POST`, `PUT`, `DELETE` requests to:
   ```
   http://localhost:5001/api/menu
   ```
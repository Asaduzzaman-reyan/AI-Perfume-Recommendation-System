# AI Perfume Recommendation System

Scentra is a full-stack perfume discovery and shopping application. Users can explore fragrance notes, find perfumes, read blog posts, manage profiles, and place orders through the web interface.

## Features

- Perfume discovery and recommendation flow
- Fragrance note browsing
- Perfume catalog and shopping cart
- User registration, login, and profile management
- Blog content and product reviews
- Orders and wishlist support
- Express REST API with SQLite persistence

## Technology

- React 18 and Vite
- Tailwind CSS
- Express.js
- SQLite with `sqlite3`
- JWT authentication

## Requirements

- Node.js 18 or newer
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root. Keep this file private; it is excluded from Git.

   ```env
   PORT=3001
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=replace-with-a-long-random-secret
   DB_PATH=./server/database/perfume_finder.db
   UPLOAD_DIR=./server/uploads
   MAX_FILE_SIZE=10485760
   ```

3. Start the API server in one terminal:

   ```bash
   node server/index.js
   ```

4. Start the Vite frontend in another terminal:

   ```bash
   npm run dev
   ```

Open the URL shown by Vite, normally `http://localhost:5173`.

The API health endpoint is available at `http://localhost:3001/api/health`.

## Production Build

Build the frontend with:

```bash
npm run build
```

The generated files are written to `dist/` and are excluded from Git.

## Project Structure

```text
server/                 Express API, routes, middleware, and SQLite setup
src/                    React application and UI components
src/components/         Feature components for the main user flows
index.html              Vite entry point
```

## Security Notes

- Do not commit `.env`, JWT secrets, database files, or uploaded files.
- Use a unique, strong `JWT_SECRET` outside local development.
- Configure `CLIENT_URL` to the deployed frontend origin in production.

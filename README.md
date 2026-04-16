# Assetly

Assetly is a full-stack asset watchlist application built to explore a modern product workflow across frontend and backend development. It allows users to create an account, sign in securely, browse financial assets, and manage a protected personal watchlist.

The project began as a technical assessment and evolved into a personal portfolio project focused on clean architecture, strong typing, and a polished full-stack developer experience.

## Overview

Assetly combines a React single-page application with an Express API and a PostgreSQL database. The frontend is designed for responsive, state-driven UI flows, while the backend handles authentication, validation, and watchlist persistence.

This repository is organized as two applications:

- `client/` for the React frontend
- `server/` for the Express API and Prisma data layer

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- TanStack Query
- React Router
- Material UI (MUI)

### Backend

- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT authentication
- Zod validation

## Features

- User signup and login
- JWT-based authentication
- Protected watchlist routes and user-specific data
- Asset listing with a dedicated frontend data layer
- Add assets to watchlist
- Remove assets from watchlist
- Full-stack TypeScript architecture

## App Architecture

### Frontend

The frontend follows a feature-oriented structure inside `client/src/`, separating shared UI, layouts, app wiring, and domain logic.

```text
client/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── features/
│   │   ├── assets/
│   │   ├── auth/
│   │   ├── assetFilters/
│   │   └── watchlist/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── theme/
└── package.json
```

### Backend

The backend is split into routes, services, middleware, schemas, and Prisma models to keep request handling, business logic, and validation clearly separated.

```text
server/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── lib/
│   ├── middleware/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   ├── app.ts
│   └── server.ts
└── package.json
```

## Local Setup

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

### 2. Install dependencies

Install dependencies in both applications:

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

Create local env files from the examples and fill in your values.

Frontend:

```bash
cp client/.env.example client/.env
```

Backend:

```bash
cp server/.env.example server/.env
```

### 4. Prepare the database

Make sure PostgreSQL is running and your `DATABASE_URL` points to a valid database.

Then run Prisma commands from the `server/` directory:

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. Start the apps

In one terminal:

```bash
cd server
npm run dev
```

In another terminal:

```bash
cd client
npm run dev
```

The frontend expects the API base URL configured through the frontend env file.

## Environment Variables

### Frontend

Defined in `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### Backend

Defined in `server/.env`:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=<your_jwt_secret>
PORT=3001
```

## Available Scripts

### Frontend (`client/package.json`)

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run preview` previews the production build locally

### Backend (`server/package.json`)

- `npm run dev` starts the Express API in development mode
- `npm run build` compiles the backend with TypeScript
- `npm run start` runs the compiled backend from `dist`
- `npx prisma migrate dev` runs local database migrations
- `npx prisma db seed` seeds the database

## Future Improvements

- Add automated tests across frontend and backend
- Improve watchlist and asset filtering UX with pagination or sorting
- Introduce refresh tokens or more advanced auth/session handling
- Add deployment configuration for a production-ready setup
- Expand asset metadata and portfolio-style tracking features
- Add CI workflows for linting, type-checking, and builds

## Portfolio Note

Assetly started as an initial technical exercise and grew into a personal full-stack project. It now serves as a portfolio piece that reflects both implementation detail and broader architectural thinking across the frontend, API, and database layers.

## Links

- Repository: <https://github.com/tuo-username/assetly>
- Live demo: deployment in progress

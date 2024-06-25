# Inplace
A website that helps you find the right apartment

# Prerequisites

## Required Tools
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en)

## Pre-commit hooks:
This will automatically format the staged files when creating a new commit.
```bash
cd backend
npm run setup-pre-commit-hooks
```

## Environment variables
- Rename `backend/.env-example` to `backend/.env`
- fill in the missing environment variables.

# Basic Commands
The following commands are available in the root of the project:
```bash
docker compose build    # to build images (you'll need to do this once every time backend/package.json changes)
docker compose up       # to start containers
docker compose down -v  # to delete containers and erases all volumes (including the database contents)
```

The following commands are available in the `backend` directory:
```bash
npm run format          # to format the backend source files
```

# Ports
```
Backend (Node.js)               -> 3000
Database (PostgreSQL)           -> 5432
Mailhog SMTP                    -> 1025
Mailhog Web UI                  -> 8025
MKDocs internal documentation   -> 8000
```

# Important endpoints
```
Health check                    -> /
Swagger UI                      -> /api-docs
```

# Inplace
A website that helps you find the right apartment

# Dependencies
- Docker
- Docker Compose

# Run

First, you need to rename `backend/.env-example` to `backend/.env` and fill in the missing environment variables.

Then run the following commands to start the backend and database containers
```bash
docker compose build # to build images
docker compose up # to start containers
```

# Erase volumes
If you want to drop the database for example, run `docker compose down -v`

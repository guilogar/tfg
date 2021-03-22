# tfg
Repository for make final degree project

## Create a .env for environment variables
### backend/.env
```
DATABASE_NAME=smartrural
DATABASE_USERNAME=smartrural@smartrural
DATABASE_PASSWORD=smartrural
DATABASE_HOST=localhost
DATABASE_DIALECT=postgres
ENVIRONMENT=develop
```

### frontend/.env
```
BACKEND_URL=...
```

## Database Posgresql
```
The database must be a postgresql database, also see the docker-composer.yml
```
[docker-compose.yml](./docker-compose.yml)

### Connect to local database
```
psql postgres://smartrural:smartrural@127.0.0.1:5432/smartrural
```

## Start backend
```
cd backend
node .
```

## Start frontend
```
cd frontend
ionic serve
```

## Build frontend and server it
```
cd frontend
ionic build
npx serve -s build
```
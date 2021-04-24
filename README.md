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
REACT_APP_BACKEND_HOST=http://localhost:3000
```
The environment variables of frontend must always start with "REACT_APP_" prefix

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
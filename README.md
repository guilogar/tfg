# tfg
Repository for make final degree project

## To Compile new Stream Analytic Job's
```
Install dotnet

https://dotnet.microsoft.com/download
https://dotnet.microsoft.com/download/dotnet/3.0/runtime/?utm_source=getdotnetcore&utm_medium=referral
```

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

## Firebase support
### backend/firebaseServiceAccount.json
```
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```
Complete with your info in the file

### frontend/android/app/google-services.json
```
{
  "project_info": {
    "project_number": "",
    "project_id": "",
    "storage_bucket": ""
  },
  "client": [...],
  "configuration_version": ""
}
```
Complete with your info in the file

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

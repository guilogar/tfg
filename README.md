# tfg
Repository for make final degree project

## To Create and Compile new Stream Analytic Job's (Optional)
```
Install dotnet:
https://dotnet.microsoft.com/download/dotnet/thank-you/sdk-3.1.408-windows-x64-installer
https://dotnet.microsoft.com/download/dotnet/3.0/runtime/?utm_source=getdotnetcore&utm_medium=referral

See this guide:
https://docs.microsoft.com/en-us/azure/stream-analytics/quick-create-visual-studio-code
```

## Create a .env for environment variables
### backend/.env
```
DATABASE_NAME=smartrural
DATABASE_USERNAME=smartrural
DATABASE_PASSWORD=smartrural
DATABASE_HOST=localhost
DATABASE_DIALECT=postgres
ENVIRONMENT=develop

COSMOS_ENDPOINT=...
COSMOS_KEY=...
COSMOS_DATABASE=...
COSMOS_CONTAINER_ID=...
```

### frontend/.env
```
REACT_APP_BACKEND_HOST=http://localhost:3000
REACT_APP_CHECK_SESSION_TIME=1000000
```
The environment variables of frontend must always start with "REACT_APP_" prefix

## Database Posgresql
```
The database must be a postgresql database, also see the docker-composer.yml
```
[docker-compose.yml](https://github.com/guilogar/tfg/blob/main/docker-compose.yml)

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

### frontend/src/firebase-credentials.json
```
{
  "apiKey": ...,
  "authDomain": ...,
  "projectId": ...,
  "storageBucket": ...,
  "messagingSenderId": ...,
  "appId": ...,
  "measurementId": ...
}
```

### frontend/public/firebase-credentials.json
```
{
  "apiKey": ...,
  "authDomain": ...,
  "projectId": ...,
  "storageBucket": ...,
  "messagingSenderId": ...,
  "appId": ...,
  "measurementId": ...
}
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

## Build frontend for android
```
cd frontend
ionic build
ionic capacitor build android
ionic capacitor run android
```

## Compile docs with vscode and docker
```
docker pull feverch/texlive:2018
code --install-extension james-yu.latex-workshop
add 'tfg/documentation' path to sharing folder to docker
open main.text, pulse compile and enjoy
```

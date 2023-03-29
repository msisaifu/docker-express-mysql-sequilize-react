# docker-express-mysql-sequilize-react

## Running the API Shell

To execute the API shell, use the following command:
`docker exec -it todo-api sh`

## Migration command

### Migration generation

To create a new migration, run the following command:
`npx sequelize-cli model:generate --name {ModelName} --attributes {field_name}:string`

###Alter Migrations

`npx sequelize-cli migration:generate --name migration-skeleton`

###Running Migrations

`npm run migrate:up`

###Rollback Migrations

`npm run migrate:undo`

## Api testing

To test the API, use the following command:
`docker compose run -e NODE_ENV=test api npm run test`

For the token testing:
`docker compose run -e NODE_ENV=test -e KEEP_TOKEN_TESTING=true -e JWT_ACCESS_TOKEN_LIFETIME=5s -e JWT_REFRESH_TOKEN_LIFETIME=8s api npm run test`

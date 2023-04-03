# docker-express-mysql-sequilize-react

## Overview

This is a starter project for building web applications with Docker, Express, MySQL, Sequelize and React. This project provides an easy-to-use template for creating scalable and robust web applications.

## Setup

- Clone the repository and rename `.env.example` to `.env`
- Run `docker-compose up` to start the Docker container.

## Database Setup

- To enter the API shell, run `docker exec -it todo-api sh`
- Run the migration command with `npm run migrate:up`

## App Setup

- In the app directory, run `npm i` to install dependencies.
- Run `npm run dev` to start the app. It will be accessible at `http://localhost:5173/`

## Running the API Shell

To execute the API shell, use the following command:
`docker exec -it todo-api sh`

## Migration command

### Migration generation

To create a new migration, run the following command:
`docker exec -it todo-api sh`
`cd src`
`npx sequelize-cli model:generate --name {ModelName} --attributes {field_name1}:string,{field_name2}:string`

### Alter Migrations

`docker exec -it todo-api sh`
`npm run migration:generate`

### Running Migrations

`docker exec -it todo-api sh`
`npm run migrate:up`

### Rollback Migrations

`docker exec -it todo-api sh`
`npm run migrate:undo`

## Api testing

To test the API, use the following command:
`docker compose run -e NODE_ENV=test api npm run test`

For the token testing:
`docker compose run -e NODE_ENV=test -e KEEP_TOKEN_TESTING=true -e JWT_ACCESS_TOKEN_LIFETIME=5s -e JWT_REFRESH_TOKEN_LIFETIME=8s api npm run test`

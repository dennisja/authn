# API

## Setup

### Setup

- Installation

```bash
yarn
```

- Create a `.env` file in `packages/api` based on the [.env.example](/packages/api/.env.example)
- Setup a postgres database and add the connection URL to your .env file. You can read more about the connection URL format [here](https://www.prisma.io/docs/reference/database-reference/connection-urls#postgresql)

## Development

### Running

- Starting the server

```bash
yarn lerna dev:api
```

### Prisma

- Creating a migration

> Replace `{migration-name}` with the name of your migration

```bash
yarn lerna exec "npx prisma migrate dev --name {migration-name}" --scope=api
```

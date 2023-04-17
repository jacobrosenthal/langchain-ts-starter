# [langchain-ts-starter](https://github.com/domeccleston/langchain-ts-starter)

Boilerplate to get started quickly with the [Langchain Typescript SDK](https://github.com/hwchase17/langchainjs).

This uses the same tsconfig and build setup as the [examples repo](https://github.com/hwchase17/langchainjs/tree/main/examples), to ensure it's in sync with the official docs.

# What's included

- Typescript
- .env file configuration
- ESLint and Prettier for formatting
- Turborepo to quickly run build scripts
- `tsx` to quickly run compiled code

# How to use

- Clone this repository
- `yarn`
- `cp .env.example .env` and provide all values
- Write your code in `src`
- `yarn start` to run your program
- `yarn test` to test

# ingest

This doesnt need to be done unless you're creating/replacing the embedding data in supabase. Supabase was one time set up like described in the langchain documentation.

- `yarn ingest` to ingest data into vector store

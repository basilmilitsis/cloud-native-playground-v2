# Setup
- ensure local-stack is already running
- `npm i`

# New Demo Domain
## Create & Sync DB Tables
- `builder api pg example-db-init`
  - created and example set of tables and dummy data
- `npm run db:init`
  - adds tables to postgres
  - adds data to postgres 
- `npm run db:introspect`
  - starts postgraphile server
  - introspects graphql schema
  - writes schema to `./src/db/.generated/schema/db.gql` 
  - stops server
## Add DB Queries & Commands
- `builder api pg example-db-query`
  - creates an example DB query
- `builder api pg example-db-mutation`
  - creates an example DB mutation
- `npm run generate:db:code`
  - generates typescript code to call DB queries
## Add Domain Queries & Commands
- `builder api pg example-api-query`
  - creates an example domain query
- `builder api pg example-api-command`
  - creates an example domain command
## Build & Run
- `npm run generate:api:code:api-builder`
  - creates file with resolvers for all domain queries and commands
- `npm run start:dev`


# Existing Domain
## Create & Sync DB Tables
- `npm run db:init`
  - adds tables to postgres
  - adds data to postgres 
- `npm run db:introspect`
  - introspects graphql schema
  - writes schema to `./src/db/.generated/schema/db.gql`
- `npm run generate:db:code`
  - generates typescript code to call DB queries
- `npm run generate:api:code:api-builder`
  - creates file with resolvers for all domain queries and commands
- `npm run start:dev`
  - emits `./src/api/.generated/schema/api.graphql`
  - starts server



# Existing Domain
## Build
## Run






----
### Steps:
- **prerequisites**
  - `npm i`
  - ensure local-stack is already running
- **Postgres table & data initialization**
  - **Setup**
    - `src/initDb/models`
      - ...
    - `src/initDb/data`
      - contains `.csv` files, with table initialisation data
      - filenames must match the table names
    - builder api pg example-db-init
  - **Run:** `npm run db:init`
    - adds tables to postgres
    - adds data to postgres
- **sync with postgres**
  - **Run:** `npm run db:introspect`
    - starts postgraphile server
    - introspects graphql schema
    - writes schema to `./src/db/.generated/schema/db.gql` 
    - stops server
  
- **add queries & mutations you want to call against postgres**
  - Add db queries needed to `./src/db/queries/` as .ts files
    - e.g. file structure
      - ```
        import { gql } from 'graphile-utils';
        export const agentById = gql`
            query agentById( $id: Int!) {
                agentById(id: $id) {
                    id,
                    fullname
                }
            }
        `;
        ```
      - *note: intellisense is against the types generated in `./src/db/.generated/schema/db.gql`, and the vs-code plugin `graphql` is needed*
    - **OR**, run `builder api pg example-db-query` to auto-generate a similar example
  - Add db mutations needed to `./src/db/mutations/` as .ts files
      - ```
        import { gql } from 'graphile-utils';
        export const createAgent = gql`
            mutation createAgent( $input: CreateAgentInput!) {
                createAgent(input: $input) {
                    agent {
                        id,
                        fullname
                    }
                }
            }
        `;
        ```
      - *note: intellisense is against the types generated in `./src/db/.generated/schema/db.gql`, and the vs-code plugin `graphql` is needed*
    - **OR**, run `builder api pg example-db-mutation` to auto-generate a similar example

- **(re)generate db code**
  - **Run:** `npm run generate:db:code`
    - it calls `generate:db:code:typings`
      - generate typings in `./src/db/.generated/typings/DbTypes.ts` using `./src/db/.generated/schema/db.gql`
      - AND adds queries to end of file based on queries/mutations in:
        - `./src/db/queries/**/*.ts`
          - e.g. `export type ListingByIdQuery`
        - `./src/db/mutations/**/*.ts`
          - e.g. `export type CreateListingMutation`
    - it calls `generate:db:code:queries`
      - generates typesafe code to execute queries and emits to `./src/db/.generated/queries/`
    - it calls `generate:db:code:mutations`
      - generates typesafe code to execute mutations and emits to `./src/db/.generated/mutations/`

- **business logic**
  - **queries**
    - **Run:** `builder api pg add-api-query <name>`
      - creates stub API query to `./src/api/queries/<name>`
      - it calls `generate:api:code:api-builder`
        - this rebuilds framework code to allow the new query to be imported when the service is run
    - **Then add your business logic**
      - *note: use generated queries from `./src/db/.generated/queries/`*
      - e.g.
        - run `builder api pg example-api-query` for example code

  - **commands**
    - **Run:** `builder api pg add-api-command <name>`
      - creates stub API command to `./src/api/commands/<name>`
        - it calls `generate:api:code:api-builder`
        - this rebuilds framework code to allow the new command to be imported when the service is run
    - **Then add your business logic**
      - *note: use generated mutations from `./src/db/.generated/mutations/`*
      - e.g.
        - run `builder api pg example-api-command` for example code
  
- **start service**
  - **Run:** `npm run start:dev`
    - postgraphile
      - starts postgraphile server
    - graphql api
      - builder api schema using Resolvers (using `type-graphql`)
      - write schema to `./src/api/.generated/api.gql`
      - starts graphql api server

---

### Notes:
####GQL intellisense
  - Using GraphQL plugin
    - config in solution root folder: `graphql.config.yml`
    - checks against `db.gql` and `api.gql`

---
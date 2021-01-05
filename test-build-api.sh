apiName=${1}
portNum=${2}

# Create the API
build api pg create ${apiName} ${portNum}

# Change to api directory
cd ./apis/${apiName}

# Install node modules 
npm i

# Init DB
build api pg example-db-init
npm run init:db

# Sync DB Schema
npm run sync:db-schema

# Generate example DB Query and Mutation
build api pg example-db-query
build api pg example-db-mutation

# Generate DB Code
npm run generate:db:code

# Query
build api pg add-api-query findAgent
build api pg example-api-query


# Command
build api pg add-api-command createAgent
build api pg example-api-command


# Start Service
npm run start:dev
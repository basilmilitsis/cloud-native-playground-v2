apiName=${1}
portNum=${2}

# Create the API
builder api pg create ${apiName} ${portNum}

# Change to api directory
cd ./apis/${apiName}

# Install node modules 
npm i

# Init DB
builder api pg example-db-init
npm run db:init

# Sync DB Schema
npm run db:introspect

# Generate example DB Query and Mutation
builder api pg example-db-query
builder api pg example-db-mutation

# Generate DB Code
npm run generate:db:code

# Query
builder api pg add-api-query findAgent
builder api pg example-api-query


# Command
builder api pg add-api-command createAgent
builder api pg example-api-command


# Start Service
npm run start:dev
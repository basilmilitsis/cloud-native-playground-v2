# use the latest LTS (long term support) version 10 of node available from the Docker Hub
FROM node:lts-alpine

# Next we create a directory to hold the application code inside the image, this will be the working directory for your application
WORKDIR /usr/src/app

# This image comes with Node.js and NPM already installed so the next thing we need to do is to install your app dependencies using the npm binary.
# NOTE - Note that, rather than copying the entire working directory, we are only copying the package.json file. This allows us to take advantage of cached Docker layers
#        http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# NOTE - A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# NOTE - npm ci command helps provide faster, reliable, reproducible builds for production environments.
#        https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable
# RUN npm ci --only=production
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Run tsc IN the container
RUN npm run build

# The app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime.
# Here we will use node server.js to start your server
CMD [ "node", "./dist/index.js" ]
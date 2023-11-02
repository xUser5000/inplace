FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies:
# Note that, rather than copying the entire working directory,
# we are only copying the package.json file.
# This allows us to take advantage of cached Docker layers.
# source: https://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install dependencies
RUN npm install

# install nodemon globally for hot reloading
RUN npm install -g nodemon

# Copy Source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "run", "dev" ]

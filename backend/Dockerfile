FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies:
# Note we are installing nodemon and copying package.json first.
# This allows us to take advantage of cached Docker layers.
# source: https://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/

# install nodemon globally for hot reloading
RUN npm install -g nodemon

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install dependencies
RUN npm install

# Copy Source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "run", "dev" ]

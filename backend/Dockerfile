FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy Source code
COPY . .

# install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]

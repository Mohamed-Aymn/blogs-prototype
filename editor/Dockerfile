# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install

# Copy application code
COPY . .

# build application
RUN npm run build 

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

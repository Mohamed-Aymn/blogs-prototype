# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including devDependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev:fullstack"]

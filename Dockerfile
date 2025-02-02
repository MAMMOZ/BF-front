# Use an official Node runtime as the base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Svelte application for production
RUN npm run build

# Expose the correct port for production
EXPOSE 4173

# Run the application in production mode
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host", "0.0.0.0"]

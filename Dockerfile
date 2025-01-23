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

# Create a .env file with placeholder values
RUN echo "BASE_API_URl=http://localhost:3000" > .env
RUN echo "JWT_SECRET=mammoz" >> .env

# Build the Svelte application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "preview"]
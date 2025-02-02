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
RUN echo "BASE_API_URL=http://localhost:3000" > .env
RUN echo "JWT_SECRET=mammoz" >> .env

# Build the Svelte application for production
RUN npm run build

# Expose the correct port for production
EXPOSE 4173

# Run the application in production mode
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host", "0.0.0.0"]

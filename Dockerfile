# Use official Node.js image from Docker Hub (slim version for smaller footprint)
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install dependencies with latest security patches
RUN apt-get update && apt-get upgrade -y

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port and run app
EXPOSE 5173
CMD ["npm", "run", "dev"]

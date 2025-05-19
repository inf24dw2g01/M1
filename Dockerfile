FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json from src
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the app source
COPY src/ ./

# Expose the port the app runs on
EXPOSE 3000

# Install curl if not present
RUN apt-get update && apt-get install -y curl

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


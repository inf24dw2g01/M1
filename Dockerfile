FROM node:18-alpine

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

# alpine apk
RUN apk update && apk add --no-cache curl bash

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


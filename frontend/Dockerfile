# Use the official Node.js slim image as a base
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of your application
COPY . .

# Build the application
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
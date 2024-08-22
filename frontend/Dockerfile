# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./

# Install dependencies first
RUN npm install --production

# Copy the rest of your application
COPY . .

# Build the application
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]

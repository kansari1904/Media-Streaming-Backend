# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the app port (same as in server.js, usually 5000)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]

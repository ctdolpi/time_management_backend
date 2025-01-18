# Use the official Node.js image from the Docker Hub
FROM node:22

# Create and change to the app directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 41280

# Define the command to run the app
CMD ["npm", "run", "dev"]

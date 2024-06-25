# Use the official Node.js image from the Docker Hub
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React application for production
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Specify the command to run the application using serve
CMD ["serve", "-s", "build"]

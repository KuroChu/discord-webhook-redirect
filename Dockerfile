# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package*.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port 4000 available outside this container
EXPOSE 4000

# Run the application when the container launches
CMD ["node", "app.js"]

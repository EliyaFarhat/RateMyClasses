FROM node:20.11.1

# Set working directory
WORKDIR /RATEMYCLASSES/server

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies, nodemon globally, and dotenv
RUN npm install --no-optional && \
    npm install -g nodemon && \
    npm install dotenv

# Copy the rest of the application code
COPY . .

# Install nodemon as a local dependency (optional, for local use within the app)
RUN npm install --save-dev nodemon

# Expose the application port
EXPOSE 5000

# Command to run the application using nodemon
CMD ["nodemon", "index.js"]
# Node.js base image
FROM node:6.10.0

# Create directory to hold application
RUN mkdir -p /usr/src/kg-ms
WORKDIR /usr/src/kg-ms

# Install app dependencies
COPY package.json /usr/src/kg-ms
RUN npm install

# Bundle app source
COPY . /usr/src/kg-ms

# Expose the port the app listens on
EXPOSE 4001

# Run node server
CMD ["npm", "start"]

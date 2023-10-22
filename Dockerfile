# Use an official Node runtime as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /opt/app

# Set environment variables
ENV NODE_ENV production

# Install only the production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy the local package files to the container
COPY . .

# Build the Next.js app
RUN yarn build

# Start the application
CMD [ "yarn", "start" ]

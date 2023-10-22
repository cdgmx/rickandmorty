![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/cdgmx/rickandmorty/nextjs.yml) [![codecov](https://codecov.io/gh/cdgmx/rickandmorty/branch/main/graph/badge.svg?token=CODECOV_TOKEN)](https://codecov.io/gh/cdgmx/rickandmorty) ![GitHub last commit](https://img.shields.io/github/last-commit/cdgmx/rickandmorty) ![Next.js](https://img.shields.io/badge/Next.js-13.5.6-blue) ![Apollo Client](https://img.shields.io/badge/Apollo%20Client-3.8.6-blue) ![MUI](https://img.shields.io/badge/MUI-5.14.14-blue) ![Zustand](https://img.shields.io/badge/Zustand-4.4.3-blue)

## Overview

This project is built using Next.js and integrates Material-UI (MUI), Zustand for state management, and Apollo Client for handling GraphQL queries.

## Features

- **Next.js**: For server-rendered React applications
- **Material-UI (MUI)**: For styling the application
- **Zustand**: For state management
- **Apollo Client**: For data fetching, caching, and state management of GraphQL data

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run start`: Starts a production server
- `npm run lint`: Lints the codebase
- `npm run test`: Runs Jest tests
- `npm run test:watch`: Runs Jest in watch mode
- `npm run type-check`: Runs TypeScript type checking

## Codegen

To generate types for your GraphQL queries, run:

```bash
npm run codegen
```

This will generate TypeScript types based on your GraphQL schema and queries, ensuring type safety.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Material-UI Documentation](https://mui.com/getting-started/usage/) - Learn how to style your app with MUI.
- [Zustand Documentation](https://github.com/pmndrs/zustand) - Learn about Zustand for state management.
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/) - Learn how to use Apollo Client with React.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Certainly, here's a comprehensive Markdown documentation specifically for setting up and running your "rickandmorty" Next.js project in a Docker environment. This guide assumes that Docker is already installed on the machine. If not, the user can download and install Docker from [Docker's official website](https://docs.docker.com/get-docker/).

````markdown
# Rick and Morty Next.js App - Docker Setup Guide

## Prerequisites

- Docker installed on your machine. If not, download and install from [here](https://docs.docker.com/get-docker/).

## Steps to Setup and Run the Project

### Step 1: Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/yourusername/rickandmorty.git
```
````

### Step 2: Navigate to Project Directory

Navigate to the project directory where the `Dockerfile` is located.

```bash
cd rickandmorty
```

### Step 3: Build the Docker Image

Run the following command to build the Docker image. Replace `rickandmorty-image` with the name you want to give to the Docker image.

```bash
docker build -t rickandmorty-image .
```

### Step 4: Run the Docker Container

After the image is built, run the following command to start a container. This will also start the Next.js app inside the container.

```bash
docker run -p 3000:3000 rickandmorty-image
```

### Step 5: Access the App

Open your web browser and navigate to `http://localhost:3000` to see the application running.

## Troubleshooting

- **Docker Daemon Not Running**: If you encounter an error that says "Cannot connect to the Docker daemon", make sure the Docker service is running. You can refer to [this guide](https://docs.docker.com/config/daemon/#start-the-daemon-manually) for more details.

- **Port Already in Use**: If you see an error like "port is already allocated", make sure no other services are running on port 3000 or run the container on a different port by changing the `-p` flag like so: `docker run -p 3001:3000 rickandmorty-image`.

## Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)

```

```

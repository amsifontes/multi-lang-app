# Stage 1: Build the React application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React application using an Express server
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
COPY --from=build /app/build /app/build
EXPOSE 5000
CMD ["node", "server.js"]

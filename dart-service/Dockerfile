# Use the official Dart image as the base image
FROM dart:latest

# Set the working directory
WORKDIR /app

# Copy the Dart project files
COPY . .

# Ensure all dependencies are installed
RUN dart pub get

# Expose the port that the server will run on
EXPOSE 8082

# Run the server
CMD ["dart", "bin/server.dart"]



# # Below is for use when wanting to leverage Ahead-of-Time (AOT) compilation
# # for performance improvements in production.
# # Stage 1: Build the Dart application
# FROM dart:latest AS build

# # Set the working directory
# WORKDIR /app

# # Copy the Dart project files
# COPY . .

# # Ensure all dependencies are installed
# RUN dart pub get

# # Compile the Dart application to a native executable
# RUN dart compile exe bin/server.dart -o bin/server

# # Stage 2: Create the runtime image
# FROM debian:buster-slim

# # Set the working directory
# WORKDIR /app

# # Copy the compiled executable from the build stage
# COPY --from=build /app/bin/server /app/bin/server

# # Expose the port that the server will run on
# EXPOSE 8082

# # Run the server
# CMD ["/app/bin/server"]

# Stage 1: Build the Rust application
FROM ubuntu:22.04 as build

# Install required packages
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    libssl-dev \
    pkg-config \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH=/root/.cargo/bin:$PATH

# Create a new empty shell project
RUN USER=root cargo new --bin rust-service
WORKDIR /rust-service

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# # Build the project to cache the dependencies
# RUN cargo build --release
# RUN rm src/*.rs

# Copy the source code
COPY src ./src

# Build the project
RUN cargo build --release

# # Stage 2: Use the same base image for the runtime environment
# FROM ubuntu:22.04

# # Install necessary runtime packages
# RUN apt-get update && apt-get install -y \
#     libssl-dev \
#     && rm -rf /var/lib/apt/lists/*

# # Copy the binary from the build environment
# COPY --from=build /rust-service/target/release/rust-service /usr/local/bin

# Expose the port
EXPOSE 8081
CMD ["./target/release/rust-service"]
# CMD ["cargo", "run", "--release"]
# CMD cargo run --release
# CMD echo "foo" && ./target/release/rust-service
# CMD /usr/local/bin/rust-service
# Run the binary
# CMD ["rust-service"]

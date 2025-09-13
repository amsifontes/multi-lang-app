# Multi-Language Microservices Application

This is a polyglot microservices application demonstrating communication between services written in different programming languages (React, Node.js, Java, Rust, Dart) deployed on Kubernetes.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Environment Setup
- Install Node.js v20+ and npm
- Install Java 17+ and Maven 3.6+
- Install Rust 1.70+ with Cargo
- Install Dart SDK 3.6+:
  ```bash
  cd /tmp
  wget https://storage.googleapis.com/dart-archive/channels/stable/release/3.6.0/sdk/dartsdk-linux-x64-release.zip
  unzip dartsdk-linux-x64-release.zip
  sudo mv dart-sdk /opt/dart
  export PATH="$PATH:/opt/dart/bin"
  ```
- Install Docker for containerization

### Build and Test Commands
**CRITICAL**: NEVER CANCEL long-running builds. Set timeouts to 5+ minutes for safety.

#### Frontend (React App)
- **Setup**: `cd frontend && npm install` -- takes 60 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
- **Build**: `npm run build` -- takes 10 seconds. Creates optimized production build.
- **Dev Server**: `npm start` -- takes 20 seconds to start. Opens on http://localhost:3000
- **Test**: `npm test -- --watchAll=false` -- takes 5 seconds. Note: default test expects "learn react" but app shows different content.

#### Backend (Express.js API Gateway) 
- **Setup**: `cd backend && npm install` -- takes 5 seconds
- **Run**: `node server.js` -- starts immediately on port 5000
- **Note**: Backend expects services at `java-service:8080`, `rust-service:8081`, `dart-service:8082` hostnames (Kubernetes DNS). For local testing, individual services work at localhost:PORT.

#### Java Service (Spring Boot)
- **Build**: `cd java-service && mvn clean package -DskipTests` -- takes 40-60 seconds on first run (downloads dependencies). NEVER CANCEL. Set timeout to 180+ seconds.
- **Run**: `mvn spring-boot:run` -- takes 15 seconds to start on port 8080
- **Test**: `mvn test` -- takes 3 seconds (no actual tests)
- **Endpoint**: `GET http://localhost:8080/` returns `{"message":"Hello from Java"}`

#### Rust Service (Actix-web)
- **Build**: `cd rust-service && cargo build --release` -- takes 90-120 seconds (compiles many crates). NEVER CANCEL. Set timeout to 240+ seconds.
- **Run**: `./target/release/rust-service` -- starts immediately on port 8081
- **Test**: `cargo test` -- takes 30 seconds (no actual tests but compiles dependencies)
- **Endpoint**: `GET http://localhost:8081/` returns `{"message":"Hello from Rust"}`

#### Dart Service (HTTP Server)
- **Setup**: `cd dart-service && /opt/dart/bin/dart pub get` -- takes 10 seconds
- **Build**: `/opt/dart/bin/dart compile exe bin/server.dart -o bin/server` -- takes 2 seconds
- **Run**: `/opt/dart/bin/dart bin/server.dart` -- starts immediately on port 8082
- **Test**: `/opt/dart/bin/dart test` -- takes 5 seconds (test fails due to missing function)
- **Endpoint**: `GET http://localhost:8082/` returns `{"message": "Hello from Dart"}`

### Docker Containerization
- **Frontend**: `docker build -t frontend-service .` -- may fail due to npm registry network issues in restricted environments
- **Backend**: `docker build -t backend-service .`
- **Java**: `docker build -t java-service .`
- **Rust**: `docker build -t rust-service .`
- **Dart**: `docker build -t dart-service .`

### Kubernetes Deployment
- Deployment manifests in `/kubernetes/` directory
- Services configured for inter-service communication via Kubernetes DNS
- Terraform infrastructure in `/terraform/` for GCP deployment

## Validation

### Manual Testing Workflow
ALWAYS run through this complete validation after making changes:

1. **Build all services** (measure and expect these times):
   ```bash
   # Frontend (~60s)
   cd frontend && npm install && npm run build
   
   # Backend (~5s)  
   cd ../backend && npm install
   
   # Java (~45s)
   cd ../java-service && mvn clean package -DskipTests
   
   # Rust (~100s) - LONGEST BUILD
   cd ../rust-service && cargo build --release
   
   # Dart (~10s)
   cd ../dart-service && /opt/dart/bin/dart pub get && /opt/dart/bin/dart compile exe bin/server.dart -o bin/server
   ```

2. **Start all services** (in separate terminals):
   ```bash
   # Terminal 1: Java service
   cd java-service && mvn spring-boot:run
   
   # Terminal 2: Rust service  
   cd rust-service && ./target/release/rust-service
   
   # Terminal 3: Dart service
   cd dart-service && /opt/dart/bin/dart bin/server.dart
   
   # Terminal 4: Backend API gateway
   cd backend && node server.js
   
   # Terminal 5: Frontend dev server
   cd frontend && npm start
   ```

3. **Test individual service endpoints**:
   ```bash
   curl http://localhost:8080/  # Java: {"message":"Hello from Java"}
   curl http://localhost:8081/  # Rust: {"message":"Hello from Rust"}  
   curl http://localhost:8082/  # Dart: {"message": "Hello from Dart"}
   curl http://localhost:3000   # Frontend: HTML page with title "Multi-Language App"
   ```

4. **Test frontend functionality**:
   - Open http://localhost:3000 in browser
   - Verify page shows "Hello World from React! - 5" and three buttons
   - Click each button to test API calls (note: will fail in local setup due to hostname resolution)

### Known Issues and Workarounds
- **Frontend missing public/index.html**: Create basic HTML file with `<div id="root"></div>`
- **Backend hardcoded Kubernetes hostnames**: Services work individually but backend integration requires Kubernetes or manual hostname mapping
- **Tests mostly broken**: Focus on manual service validation rather than automated tests
- **Docker builds may fail**: Network restrictions can prevent npm package downloads
- **Rust build time**: Longest build at 90+ seconds - always set adequate timeouts

### Common Tasks
After making changes to any service:
1. Rebuild the specific service using commands above
2. Restart the service 
3. Test the individual endpoint
4. If changing API contracts, test integration with backend/frontend

### Repository Structure
```
.
├── frontend/          # React app (port 3000 dev, 5000 prod)
├── backend/           # Express.js API gateway (port 5000)  
├── java-service/      # Spring Boot service (port 8080)
├── rust-service/      # Actix-web service (port 8081)
├── dart-service/      # Dart HTTP server (port 8082)
├── kubernetes/        # K8s deployment manifests
└── terraform/         # GCP infrastructure as code
```

## Critical Reminders
- **NEVER CANCEL** any build command, especially Rust which takes 90+ seconds
- Always set timeouts to 3+ minutes for build commands, 5+ minutes for Rust builds
- Test services individually before attempting integration testing
- Use manual validation scenarios rather than relying on broken automated tests
- Remember that backend expects Kubernetes DNS names, not localhost, for service-to-service communication
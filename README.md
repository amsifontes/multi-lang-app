# Multi-Language App

A Kubernetes practice application demonstrating polyglot microservices architecture using multiple programming language runtimes including Node.js, Java, Rust, and Dart.

## Project Description

This project is a distributed microservices application designed to showcase the deployment and orchestration of services written in different programming languages within a Kubernetes environment. The application consists of:

- **Frontend**: React.js web application providing a user interface
- **Backend**: Node.js/Express.js API gateway that routes requests to various language services
- **Java Service**: Spring Boot microservice
- **Rust Service**: Actix-web based microservice
- **Dart Service**: Dart-based microservice

### Features

- Multi-language microservices architecture
- Kubernetes-native deployment
- Docker containerization for all services
- Infrastructure as Code with Terraform
- Service-to-service communication
- API gateway pattern implementation

## Prerequisites

Before running this application, ensure you have the following tools installed:

### Required Tools

- **Node.js** (v14 or higher) - for frontend and backend services
- **Java** (JDK 11 or higher) - for the Java Spring Boot service
- **Maven** (v3.6 or higher) - for building the Java service
- **Rust** (latest stable) - for the Rust service
- **Dart SDK** (v3.4.4 or higher) - for the Dart service
- **Docker** (v20.0 or higher) - for containerization
- **kubectl** - for Kubernetes cluster management
- **Git** - for cloning the repository

### Kubernetes Cluster

You'll need access to a Kubernetes cluster. Options include:

- **Local Development**: Minikube, kind, or Docker Desktop with Kubernetes
- **Cloud Providers**: Google GKE, AWS EKS, Azure AKS
- **On-premises**: Any Kubernetes distribution

### Optional Tools

- **Terraform** (v1.0 or higher) - for infrastructure provisioning
- **Helm** - for advanced Kubernetes package management

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/amsifontes/multi-lang-app.git
cd multi-lang-app
```

### 2. Install Dependencies

#### Frontend (React.js)
```bash
cd frontend
npm install
cd ..
```

#### Backend (Node.js/Express.js)
```bash
cd backend
npm install
cd ..
```

#### Java Service
```bash
cd java-service
# Build the project first
mvn clean compile
# Dependencies will be downloaded automatically by Maven during build
cd ..
```

#### Rust Service
```bash
cd rust-service
cargo build
cd ..
```

#### Dart Service
```bash
cd dart-service
dart pub get
cd ..
```

## Running the Application

### Option 1: Local Development (Individual Services)

#### Start each service individually:

1. **Java Service** (Port 8080):
```bash
cd java-service
mvn spring-boot:run
```

3. **Rust Service** (Port 8081):
```bash
cd rust-service
cargo run
```

4. **Dart Service** (Port 8082):
```bash
cd dart-service
dart run bin/server.dart
```

5. **Backend API Gateway** (Port 5000):
```bash
cd backend
npm start
```

6. **Frontend** (Port 3000):
```bash
cd frontend
npm start
```

Access the application at `http://localhost:3000`

### Option 2: Docker Containers

#### Build Docker images for each service:

```bash
# Frontend
docker build -t multi-lang-app/frontend ./frontend

# Backend
docker build -t multi-lang-app/backend ./backend

# Java Service
docker build -t multi-lang-app/java-service ./java-service

# Rust Service
docker build -t multi-lang-app/rust-service ./rust-service

# Dart Service
docker build -t multi-lang-app/dart-service ./dart-service
```

#### Run containers:

```bash
# Create a network for service communication
docker network create multi-lang-network

# Run services
docker run -d --name java-service --network multi-lang-network -p 8080:8080 multi-lang-app/java-service
docker run -d --name rust-service --network multi-lang-network -p 8081:8081 multi-lang-app/rust-service
docker run -d --name dart-service --network multi-lang-network -p 8082:8082 multi-lang-app/dart-service
docker run -d --name backend-service --network multi-lang-network -p 5000:5000 multi-lang-app/backend
docker run -d --name frontend --network multi-lang-network -p 3000:3000 multi-lang-app/frontend
```

### Option 3: Kubernetes Deployment

#### Prerequisites:
- Ensure your Kubernetes cluster is running
- Configure `kubectl` to point to your cluster

#### Deploy to Kubernetes:

1. **Apply Kubernetes manifests**:
```bash
kubectl apply -f kubernetes/
```

2. **Verify deployments**:
```bash
kubectl get pods
kubectl get services
```

3. **Access the application**:
```bash
# Get the frontend service details
kubectl get service frontend-service

# If using LoadBalancer type:
kubectl get service frontend-service --output wide

# If using NodePort or port-forwarding:
kubectl port-forward service/frontend-service 3000:3000
```

#### Clean up Kubernetes resources:
```bash
kubectl delete -f kubernetes/
```

## Application Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   (React.js)    │────▶   (Node.js)     │
│   Port: 3000    │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
         ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
         │ Java Service │ │ Rust Service │ │ Dart Service │
         │ (Spring Boot)│ │ (Actix-web)  │ │ (Dart)       │
         │ Port: 8080   │ │ Port: 8081   │ │ Port: 8082   │
         └──────────────┘ └──────────────┘ └──────────────┘
```

## API Endpoints

The backend service exposes the following endpoints:

- `GET /duncan` - Routes to Java service
- `GET /favio` - Routes to Rust service  
- `GET /zaib` - Routes to Dart service

## Development

### Making Changes

1. Make changes to the relevant service
2. Rebuild the Docker image if using containers
3. Redeploy to Kubernetes if testing in cluster

### Testing

Each service can be tested individually:

```bash
# Test Java service
curl http://localhost:8080/

# Test Rust service  
curl http://localhost:8081/

# Test Dart service
curl http://localhost:8082/

# Test backend API gateway
curl http://localhost:5000/duncan
curl http://localhost:5000/favio  
curl http://localhost:5000/zaib
```

## Infrastructure as Code

This project includes Terraform configuration for infrastructure provisioning. See the `terraform/` directory for infrastructure definitions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 5000, 8080, 8081, 8082 are available
2. **Service communication**: Check that all services are running and accessible
3. **Kubernetes issues**: Verify cluster connectivity and resource availability

### Logs

```bash
# Docker logs
docker logs <container-name>

# Kubernetes logs
kubectl logs <pod-name>
```

## License

This project is for educational and practice purposes.
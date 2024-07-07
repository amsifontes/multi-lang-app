terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = "k8s-polyglot-test-1"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

resource "google_artifact_registry_repository" "frontend-service" {
  location      = "us-central1"
  repository_id = "frontend-service"
  description   = "GCR repository for frontend service of the multi-lang app"
  format        = "docker"
}

resource "google_artifact_registry_repository" "backend-service" {
  location      = "us-central1"
  repository_id = "backend-service"
  description   = "GCR repository for backend service of the multi-lang app"
  format        = "docker"
}

resource "google_artifact_registry_repository" "java-service" {
  location      = "us-central1"
  repository_id = "java-service"
  description   = "GCR repository for Java service of the multi-lang app"
  format        = "docker"
}




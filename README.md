# DevOps Project: CI/CD Pipeline on AWS EKS with Jenkins and Kubernetes

## Overview

This project demonstrates a **complete CI/CD pipeline** using:

- **Jenkins** for automation
- **Docker** for containerization
- **AWS EKS** for Kubernetes deployment
- **AWS ECR** for Docker image registry
- **Prometheus & Grafana** for monitoring
- **Trivy** for container security scanning

The pipeline automatically builds Docker images, pushes them to AWS ECR, and deploys them to EKS.  
The application is publicly accessible through a Kubernetes LoadBalancer service.

---

## Features

- Automated **CI/CD** pipeline using Jenkins
- **Docker image build and push** to AWS ECR
- Deployment to **Kubernetes pods**
- Container image tagging with short Git commit hash
- **Container vulnerability scanning** using Trivy
- Observability using **Prometheus and Grafana**
- Jenkins workspace cleanup after each run

---

## Architecture

## [GitHub] --push--> [Jenkins Pipeline] --build & scan--> [ECR] --deploy--> [EKS Cluster] --metrics--> [Prometheus + Grafana]


- Jenkins polls GitHub via **webhook**
- Docker image built and tagged as `short-Git-hash`
- Image pushed to **AWS ECR**
- Kubernetes deployment updated with new image
- Prometheus monitors cluster, Grafana visualizes metrics

---

## Pre-requisites

- AWS Account with:
  - EKS Cluster
  - IAM user with access to ECR, EKS, and EC2
- Jenkins installed and configured
- Kubernetes CLI (`kubectl`) configured
- Helm (optional, for Prometheus/Grafana)
- GitHub repository

---

## Instructions to Run Pipeline

1. **Configure Jenkins**

   - Install required plugins:
     - GitHub Integration
     - Docker Pipeline
     - Kubernetes CLI
     - AWS Credentials Plugin
     
- Add **AWS credentials**:
     - Manage Jenkins → Credentials → Global → Add Credentials → `AWS Access Key` / `Secret Key`  
       - ID example: `aws-access-secret-key`
   - Create a **pipeline job** and add the provided `Jenkins`.

2. **Pipeline Execution**

   - [Jenkins Pipeline]  {http://13.234.10.132:8080/}

   

3. **Prometheus & Grafana Setup**

   - Apply manifests:
     ```bash
     kubectl apply -f prometheus-pvc.yaml
     kubectl apply -f prometheus-deployment.yaml
     kubectl apply -f grafana-deployment.yaml
     ```

   - Access Grafana:
     - URL: `http://aff9e1820101845a397e1cb654d76a1b-152516336.ap-south-1.elb.amazonaws.com/login`  
       Username: `admin`  
       Password: `admin123`
   - Add Prometheus as a data source in Grafana

4. **Trivy Security Scan**

   - Run Trivy in pipeline:
     ```bash   ```
   - Pipeline will fail if vulnerabilities are found

---

## Design Choices

- **GitHub + Jenkins** for CI/CD automation
- **Docker + ECR** for container registry
- **EKS** for scalable Kubernetes deployment
- **Trivy** for lightweight vulnerability scanning
- **Prometheus + Grafana** for monitoring cluster & app metrics
- **PersistentVolumeClaims** for Prometheus storage

---

## Live Application

- Deployed on AWS EKS
- Access via Kubernetes LoadBalancer URL:  http://aff0b0348bf87403f994801197e0fec9-364297335.ap-south-1.elb.amazonaws.com/

---

## Workspace Cleanup

- Jenkins pipeline uses `cleanWs()` to clear workspace after each build
- Ensures no leftover files or images

---

## Notes / Tips

- If PVCs stay `Pending`, ensure:
- Enough nodes in the cluster
- PVC storage class matches EKS AZs
- Use short Git commit hash for **image tagging**
- Prometheus + Grafana may require **ephemeral storage** for small test clusters

---

## References

- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html & LLM https://ChatGPT, https://claude.ai/)






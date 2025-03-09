# CI/CD Pipeline for Node.js Application using Jenkins

This repository includes a complete CI/CD pipeline, automated using Jenkins, to build, test, and deploy a Node.js application.

## Pipeline Stages

* **Code Checkout:**
    * Retrieves the application's source code from the version control system (e.g., Git).
* **Dependency Installation:**
    * Installs the necessary Node.js dependencies using `npm install`.
* **Testing:**
    * Executes unit tests using `npm test` to ensure code functionality.
* **Code Quality Checks:**
    * Performs static code analysis using ESLint to maintain code quality and consistency.
* **Docker Image Building:**
    * Builds a Docker image of the application, ready for deployment.
* **Deployment:**
    * Stops and removes any existing container, and then deploys the new Docker image as a container.
* **Health Verification:**
    * Verifies the application's health after deployment by checking its availability and logs.

## Jenkinsfile

The pipeline is defined in the `Jenkinsfile` located in the root of the repository.

```groovy
pipeline {
    agent any

    environment {
        // Define environment variables
        DOCKER_IMAGE = 'nodejs-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'nodejs-app-container'
    }
    
    tools {
        nodejs 'nodejs18'  // Use the NodeJS installation configured in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Get code from the repository
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Run unit tests
                sh 'npm test'
            }
        }
        
        stage('Code Quality Check') {
            steps {
                sh '''
                # Run ESLint using the existing eslint.config.js
                npx eslint . || echo "ESLint issues found but continuing pipeline"
                '''
            }    
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                // Stop and remove existing container if it exists
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                
                // Run the new container
                sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }        
        
        stage('Health Check') {
            steps {
                // Wait for the application to start
                sh 'sleep 10'

                // Print container logs to debug
                sh "docker logs ${CONTAINER_NAME}"
                
                // Check if the application is healthy using the VM's IP
        	sh 'curl -f http://192.168.178.129:3000/health || exit 1'            
		}
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded! Application is deployed and running.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
        always {
            // Clean up old Docker images to prevent disk space issues
            sh 'docker image prune -f'
        }
    }
}
```

## Prerequisites
* **Jenkins installed and configured.**
* **Docker installed on the Jenkins agent.**
* **Node.js and npm installed.**
* **A Git repository containing the Node.js application.**

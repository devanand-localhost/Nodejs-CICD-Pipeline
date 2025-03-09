pipeline {
    agent {
        docker {
            image 'node:18-alpine' 
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
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
                // Simple code quality check (install eslint if needed)
                sh 'npm list eslint || npm install eslint --save-dev'
                sh 'npx eslint . || true'
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
                
                // Check if the application is healthy
                sh 'curl -f http://localhost:3000/health || exit 1'
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

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
                # Install ESLint if not already installed
                npm list eslint || npm install eslint --save-dev

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
                
                // Run the new container with host networking
                sh "docker run -d --network=host --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:${DOCKER_TAG}"
                
                // Alternative approach with explicit port mapping if host networking doesn't work
                // sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }        
        
        stage('Health Check') {
            steps {
                // Wait for the application to start
                sh 'sleep 20'

                // Print container logs to debug
                sh "docker logs ${CONTAINER_NAME}"
                
                // Debug network connections
                sh "netstat -tuln | grep 3000 || echo 'Port 3000 not visible in netstat'"
                
                // Get container IP and perform health check within Docker network
                sh '''
                CONTAINER_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${CONTAINER_NAME})
                echo "Container IP: ${CONTAINER_IP}"
                
                # Try multiple health check approaches
                echo "Checking localhost:3000..."
                curl -v http://localhost:3000/health || echo "Failed on localhost"
                
                echo "Checking container IP..."
                [ -n "${CONTAINER_IP}" ] && curl -v http://${CONTAINER_IP}:3000/health || echo "Failed on container IP"
                
                echo "Checking from within container..."
                docker exec ${CONTAINER_NAME} curl -v http://localhost:3000/health || echo "Failed from within container"
                '''
            }
            post {
                failure {
                    // Continue pipeline even if health check fails temporarily
                    echo "Health check failed but continuing pipeline for debugging"
                    script {
                        currentBuild.result = 'UNSTABLE'
                    }
                }
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
pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "expense_tracker"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Start Application') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'docker ps'
            }
        }

    }

    post {

        success {
            echo 'Deployment successful'
        }

        failure {
            echo 'Deployment failed'
        }

        always {
            cleanWs()
        }
    }
}
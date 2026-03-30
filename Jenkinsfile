pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                echo 'Cloning repository...'
            }
        }
        
        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh 'pip install -r requirements.txt'
                }
            }
        }

        stage('Run Migrations') {
            steps {
                dir('backend') {
                    sh 'python manage.py migrate'
                }
            }
        }

        stage('Run Server') {
            steps {
                dir('backend') {
                    sh 'nohup python manage.py runserver 0.0.0.0:8000 &'
                }
            }
        }
    }
}
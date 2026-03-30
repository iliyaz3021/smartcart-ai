pipeline {
    agent {
        docker {
            image 'python:3.10'
        }
    }

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

        stage('Run Backend') {
            steps {
                dir('backend') {
                    sh 'nohup python app.py &'
                }
            }
        }
    }
}
pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                echo 'Cloning repository...'
            }
        }

        stage('Install Python & Pip') {
            steps {
                sh '''
                apt update
                apt install -y python3 python3-pip
                '''
            }
        }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh 'pip3 install -r requirements.txt'
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('backend') {
                    sh 'nohup python3 app.py &'
                }
            }
        }
    }
}
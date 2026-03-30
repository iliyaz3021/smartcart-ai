pipeline {
    agent {
        docker {
            image 'python:3.10'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {

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
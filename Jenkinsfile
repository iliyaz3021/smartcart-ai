pipeline {
    agent any

    stages {

        stage('Check Python') {
            steps {
                sh 'python3 --version || true'
            }
        }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh '''
                    python3 -m pip install --upgrade pip
                    pip3 install -r requirements.txt
                    '''
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
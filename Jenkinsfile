pipeline {
    agent any

    stages {

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh '''
                    python3 -m venv venv
                    venv/bin/pip install --upgrade pip
                    venv/bin/pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('backend') {
                    sh '''
                    nohup venv/bin/python app.py &
                    '''
                }
            }
        }
    }
}
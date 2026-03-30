pipeline {
    agent any

    stages {

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh '''
                    python3 -m venv venv
                    chmod +x venv/bin/pip
                    chmod +x venv/bin/python
                    venv/bin/python -m pip install --upgrade pip
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
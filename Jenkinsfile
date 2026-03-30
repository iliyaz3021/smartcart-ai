pipeline {
    agent any

    stages {

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh '''
                    python3 -m venv venv
                    . venv/bin/activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('backend') {
                    sh '''
                    . venv/bin/activate
                    nohup python app.py &
                    '''
                }
            }
        }
    }
}
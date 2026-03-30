from flask import Flask
from flask_cors import CORS
from models import db
from config import Config

# ✅ CREATE APP FIRST
app = Flask(__name__)
app.config.from_object(Config)

# ✅ INIT DB
db.init_app(app)

# ✅ ENABLE CORS
CORS(app)

# ✅ IMPORT ROUTES AFTER APP CREATED
from routes.product_routes import product_bp
from routes.auth_routes import auth_bp

# ✅ REGISTER BLUEPRINTS
app.register_blueprint(product_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return {"message": "Backend Running"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000)
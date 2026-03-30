"""from flask import Flask
from flask_cors import CORS
from models import db
from config import Config

# ✅ CREATE APP FIRST for testing the backend properly 
app = Flask(__name__)
app.config.from_object(Config)

# ✅ INIT DB is important
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
    app.run(host="0.0.0.0", port=5000)"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from config import Config
import bcrypt

app = Flask(__name__)

# 🔥 LOAD CONFIG FILE
app.config.from_object(Config)

db = SQLAlchemy(app)
JWTManager(app)
CORS(app)

# ================= MODELS =================

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    password = db.Column(db.String(200))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    price = db.Column(db.Float)

# ================= AUTH =================

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

    user = User(
        email=data["email"],
        password=hashed.decode()
    )

    db.session.add(user)
    db.session.commit()

    return {"msg": "registered"}

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.checkpw(data["password"].encode(), user.password.encode()):
        token = create_access_token(identity=user.id)
        return {"token": token}

    return {"msg": "invalid"}, 401

# ================= PRODUCTS =================

@app.route("/products", methods=["POST"])
def add_product():
    data = request.json

    product = Product(
        name=data["name"],
        price=data["price"]
    )

    db.session.add(product)
    db.session.commit()

    return {"msg": "product added"}

@app.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()

    return jsonify([
        {"id": p.id, "name": p.name, "price": p.price}
        for p in products
    ])

# ================= FILTER FEATURE =================

@app.route("/products/filter", methods=["GET"])
def filter_products():
    query = request.args.get("q", "")
    min_price = request.args.get("min", 0)
    max_price = request.args.get("max", 1000000)
    sort = request.args.get("sort", "")

    products = Product.query.filter(
        Product.name.ilike(f"%{query}%"),
        Product.price >= float(min_price),
        Product.price <= float(max_price)
    )

    if sort == "low":
        products = products.order_by(Product.price.asc())
    elif sort == "high":
        products = products.order_by(Product.price.desc())

    products = products.all()

    return jsonify([
        {"id": p.id, "name": p.name, "price": p.price}
        for p in products
    ])

# ================= RUN =================

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
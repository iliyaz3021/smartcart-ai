import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // Add cart logic here
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div style={{
        height: "200px",
        background: "linear-gradient(to right, #ff9900, #ff6600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "32px",
        fontWeight: "bold"
      }}>
        Mega Sale 🔥 - Up to 70% OFF
      </div>

      {/* CATEGORIES */}
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px", background: "#f5f5f5" }}>
        {["Electronics", "Fashion", "Mobiles", "Accessories"].map(cat => (
          <div key={cat} style={{
            background: "white",
            padding: "15px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s"
          }}>
            {cat}
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", padding: "20px" }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* FOOTER */}
      <div style={{
        background: "#131921",
        color: "white",
        textAlign: "center",
        padding: "20px"
      }}>
        © ShopSphere 2026
      </div>
    </>
  );
}

export default Home;

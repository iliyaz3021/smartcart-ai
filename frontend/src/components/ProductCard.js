function ProductCard({ product, onAddToCart }) {
  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 ? "⭐" : "");
  };

  const discountedPrice = product.originalPrice 
    ? Math.round(product.originalPrice - (product.originalPrice * product.discount / 100))
    : product.price;

  return (
    <div style={{
      background: "white",
      borderRadius: "8px",
      padding: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    }}
    >
      {/* IMAGE WITH DISCOUNT BADGE */}
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <img 
          src={product.image || "https://via.placeholder.com/150"} 
          alt={product.name} 
          style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
        />
        {product.discount > 0 && (
          <span style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "#ff3333",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold"
          }}>
            -{product.discount}%
          </span>
        )}
      </div>

      {/* TITLE */}
      <h4 style={{ margin: "8px 0", fontSize: "14px", fontWeight: "600", color: "#212121", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {product.name}
      </h4>

      {/* RATING */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", marginBottom: "8px" }}>
        <span>{renderStars(product.rating || 4.5)}</span>
        <span style={{ color: "#666" }}>({product.reviews || 0})</span>
      </div>

      {/* PRICING */}
      <div style={{ marginBottom: "10px" }}>
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#ff9900", margin: "0" }}>
          ₹{discountedPrice}
        </p>
        {product.originalPrice && (
          <p style={{ fontSize: "12px", textDecoration: "line-through", color: "#999", margin: "2px 0 0 0" }}>
            ₹{product.originalPrice}
          </p>
        )}
      </div>

      {/* ADD TO CART BUTTON */}
      <button 
        onClick={() => onAddToCart(product)}
        style={{
          width: "100%",
          padding: "10px",
          background: "#ff9900",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
          transition: "background 0.2s"
        }}
        onMouseOver={(e) => e.target.style.background = "#ff7700"}
        onMouseOut={(e) => e.target.style.background = "#ff9900"}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
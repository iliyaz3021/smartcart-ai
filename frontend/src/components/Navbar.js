import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>ShopSphere</h2>

      <input placeholder="Search..." />

      <div>
        <span style={{ marginRight: "20px" }}>Cart 🛒</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
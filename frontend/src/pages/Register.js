import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/register", { email, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import "../styles/RegisterPage.css";
import bgRg from "../assets/svg/rg_bg.svg";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  const handleLoginRedirect = () => {
    navigate("/"); // Redirect to the "/" route
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard"); // Redirect to the "/" route
    }
  }, [token, navigate]);
  return (
    <div className="register-main">
      <div className="brand">Todo OZO</div>
      <div className="register-bg">
        <img src={bgRg} alt="" />
      </div>
      <div className="rg-form-container">
        <div className="register-container">
          <h1 className="register-header">Register</h1>
          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="login-account-section">
            <span>Already have an account!</span>
            <button onClick={handleLoginRedirect}>Login</button>
          </div>
          {/* {error && <p className="register-error">{error}</p>} */}
        </div>{" "}
      </div>
    </div>
  );
};

export default RegisterPage;

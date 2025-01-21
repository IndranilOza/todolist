import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to the "/" route
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="forgot-password">
        <span>Forgot Password</span>
        <button>Click Here</button>
      </div>
      {/* {error && <p className="login-error">{error}</p>} */}
      <div className="create-account-section">
        <button onClick={handleRegisterRedirect}>Create Account</button>
      </div>
    </div>
  );
};

export default LoginPage;

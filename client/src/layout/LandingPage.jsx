import { useEffect } from "react";
import "../styles/LandingPage.css";
import bg from "../assets/svg/bg.svg";
import LoginPage from "../pages/LoginPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);
  return (
    <div className="landing-main">
      <div className="brand">Todo OZO</div>
      <div className="landing-auth-form">
        <LoginPage />
      </div>
      <div className="landing-bg">
        <img src={bg} alt="" className="landing-img" />
      </div>
    </div>
  );
};

export default LandingPage;

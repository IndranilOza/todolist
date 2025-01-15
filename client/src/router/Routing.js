import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import Dashboard from "../layout/Dashboard";
import LandingPage from "../layout/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const Routing = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default Routing;

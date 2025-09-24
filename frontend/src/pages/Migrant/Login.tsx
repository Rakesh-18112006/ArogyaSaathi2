import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    // If it starts with 91, ensure +91 prefix
    if (value.startsWith("91") && value.length > 2) {
      setPhone(`+${value}`);
    }
    // If it doesn't start with 91 but has 10 digits, add +91
    else if (value.length === 10) {
      setPhone(`+91${value}`);
    }
    // If user is typing and it's less than 10 digits, just update the number
    else if (value.length > 0 && value.length <= 10) {
      setPhone(`+91${value}`);
    }
    // If user clears the field, clear it completely
    else if (value.length === 0) {
      setPhone("");
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    // Ensure the phone number has exactly 10 digits after +91
    if (value.length === 10) {
      setPhone(`+91${value}`);
    } else if (value.length > 0 && value.length < 10) {
      toast.warning("Please enter a valid 10-digit phone number");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number before submitting
    if (!phone || phone.replace(/\D/g, "").length !== 12) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/migrants/login", {
        phone,
        password,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success(t("success"));
      navigate("/migrant/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return "";

    const digits = phone.replace(/\D/g, "");
    if (digits.length === 12) {
      // 91 + 10 digits
      return digits.slice(2); // Return only the 10 digits without +91 for display
    }
    return phone.replace("+91", "");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <motion.div
          className="login-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-logo">
            <i className="fas fa-heartbeat login-logo-icon"></i>
            <h1 className="login-logo-text">{t("appName")}</h1>
          </div>
          <h2 className="login-title">{t("login")}</h2>
          <p className="login-subtitle">{t("login.subtitle")}</p>
        </motion.div>

        <div className="login-card">
          <div className="login-form-section">
            <motion.form
              onSubmit={handleSubmit}
              className="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="login-input-group">
                <label className="login-input-label">{t("phoneNumber")}</label>
                <div className="login-phone-input-container">
                  <div className="login-phone-prefix">+91</div>
                  <input
                    value={formatPhoneDisplay(phone)}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    placeholder="Enter your 10-digit phone number"
                    className="login-input login-phone-input"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="login-phone-hint">
                  Enter your 10-digit mobile number
                </div>
              </div>

              <div className="login-input-group">
                <label className="login-input-label">{t("password")}</label>
                <div className="login-password-toggle">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("password")}
                    className="login-input"
                    required
                  />
                  <span
                    className="login-password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>

              <div className="login-links">
                <Link to="/migrant/forgot-password" className="login-link">
                  {t("forgotPassword")}
                </Link>
              </div>

              <motion.button
                type="submit"
                className="login-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-circle-notch login-loading"></i>
                    {t("login.processing")}
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    {t("login")}
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              className="login-divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="login-divider-text">{t("login.or")}</span>
            </motion.div>

            <motion.div
              className="login-social-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button type="button" className="login-social-button">
                <i className="fab fa-google" style={{ color: "#DB4437" }}></i>
                Google
              </button>
              <button type="button" className="login-social-button">
                <i className="fab fa-facebook" style={{ color: "#4267B2" }}></i>
                Facebook
              </button>
            </motion.div>

            <motion.div
              className="login-register-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {t("login.noAccount")}{" "}
              <Link to="/migrant/register" className="login-link">
                {t("register")}
              </Link>
            </motion.div>
          </div>

          <div className="login-image-section">
            <div className="login-image-content">
              <i className="fas fa-stethoscope login-image-icon"></i>
              <h3 className="login-image-title">{t("login.welcomeBack")}</h3>
              <p className="login-image-subtitle">
                {t("login.accessFeatures")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

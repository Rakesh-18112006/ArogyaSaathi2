import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { t } from "i18next";
import { motion } from "framer-motion";
import "./Registration.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    language: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Remove any non-digit characters
      const cleanedValue = value.replace(/\D/g, "");

      // If it starts with 91, ensure +91 prefix
      if (cleanedValue.startsWith("91") && cleanedValue.length > 2) {
        setForm({ ...form, phone: `+${cleanedValue}` });
      }
      // If it doesn't start with 91 but has 10 digits, add +91
      else if (cleanedValue.length === 10) {
        setForm({ ...form, phone: `+91${cleanedValue}` });
      }
      // If user is typing and it's less than 10 digits, just update the number
      else if (cleanedValue.length > 0 && cleanedValue.length <= 10) {
        setForm({ ...form, phone: `+91${cleanedValue}` });
      }
      // If user clears the field, clear it completely
      else if (cleanedValue.length === 0) {
        setForm({ ...form, phone: "" });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    // Ensure the phone number has exactly 10 digits after +91
    if (value.length === 10) {
      setForm({ ...form, phone: `+91${value}` });
    } else if (value.length > 0 && value.length < 10) {
      // If incomplete number, show error or keep as is
      toast.warning("Please enter a valid 10-digit phone number");
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!form.name.trim()) {
        toast.error("Please enter your name");
        return;
      }
      if (!form.phone || form.phone.replace(/\D/g, "").length !== 12) {
        // +91 + 10 digits = 12
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }
      if (!form.password || form.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
    }

    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Final validation
    if (!form.phone || form.phone.replace(/\D/g, "").length !== 12) {
      toast.error("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/migrants/register", form);
      toast.success(t("otpVerification.enterOTP"));
      navigate("/migrant/otp", { state: { phone: form.phone } });
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
      return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
    }
    return phone;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="registration-form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.name")}
              </label>
              <input
                name="name"
                placeholder={t("migrantRegister.name")}
                value={form.name}
                onChange={handleChange}
                className="registration-input"
                required
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("phoneNumber")}
              </label>
              <div className="registration-phone-input-container">
                <div className="registration-phone-prefix">+91</div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Enter your 10-digit phone number"
                  value={form.phone.replace("+91", "")}
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                  className="registration-input registration-phone-input"
                  maxLength={10}
                  required
                />
              </div>
              <div className="registration-phone-hint">
                Enter your 10-digit mobile number
              </div>
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("password")}
              </label>
              <div className="registration-password-toggle">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("password")}
                  value={form.password}
                  onChange={handleChange}
                  className="registration-input"
                  minLength={6}
                  required
                />
                <span
                  className="registration-password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              <div className="registration-password-hint">
                Password must be at least 6 characters long
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            className="registration-form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.dob")}
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="registration-input"
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.gender")}
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="registration-select"
                required
              >
                <option value="">{t("migrantRegister.selectGender")}</option>
                <option value="male">{t("migrantRegister.male")}</option>
                <option value="female">{t("migrantRegister.female")}</option>
                <option value="other">{t("migrantRegister.other")}</option>
              </select>
            </div>

            <div className="registration-input-group">
              <label className="registration-input-label">
                {t("migrantRegister.language")}
              </label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="registration-select"
                required
              >
                <option value="">{t("migrantRegister.selectLanguage")}</option>
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="english">English</option>
                <option value="telugu">తెలుగు (Telugu)</option>
                <option value="bengali">বাংলা (Bengali)</option>
                <option value="tamil">தமிழ் (Tamil)</option>
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            className="registration-form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="registration-input-group">
              <h3
                className="registration-input-label"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{
                    color: "#10b981",
                    fontSize: "2rem",
                    marginBottom: "10px",
                  }}
                ></i>
                <br />
                {t("migrantRegister.reviewInfo")}
              </h3>

              <div className="registration-review-info">
                <div className="registration-review-item">
                  <strong>{t("migrantRegister.name")}:</strong>
                  <span>{form.name}</span>
                </div>
                <div className="registration-review-item">
                  <strong>{t("phoneNumber")}:</strong>
                  <span>{formatPhoneDisplay(form.phone)}</span>
                </div>
                <div className="registration-review-item">
                  <strong>{t("migrantRegister.dob")}:</strong>
                  <span>{form.dob || "Not provided"}</span>
                </div>
                <div className="registration-review-item">
                  <strong>{t("migrantRegister.gender")}:</strong>
                  <span>{form.gender || "Not provided"}</span>
                </div>
                <div className="registration-review-item">
                  <strong>{t("migrantRegister.language")}:</strong>
                  <span>{form.language || "Not provided"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <div className="registration-header">
          <div className="registration-logo">
            <i className="fas fa-heartbeat registration-logo-icon"></i>
            <h1 className="registration-logo-text">{t("appName")}</h1>
          </div>
          <h2 className="registration-title">{t("migrantRegister.title")}</h2>
          <p className="registration-subtitle">
            {t("migrantRegister.subtitle")}
          </p>
        </div>

        <div className="registration-card">
          <div className="registration-form-section">
            <div className="registration-progress">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`registration-progress-step ${
                    currentStep > step
                      ? "completed"
                      : currentStep === step
                      ? "active"
                      : ""
                  }`}
                >
                  {currentStep > step ? <i className="fas fa-check"></i> : step}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              {renderStep()}

              <div className="registration-form-row">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="registration-button registration-button-secondary"
                  >
                    <i className="fas fa-arrow-left"></i>
                    {t("back")}
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="registration-button registration-button-primary"
                  >
                    {t("next")}
                    <i className="fas fa-arrow-right"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="registration-button registration-button-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-circle-notch registration-loading"></i>
                        {t("register.processing")}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus"></i>
                        {t("register")}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            <div className="registration-login-link">
              {t("register.alreadyHaveAccount")}{" "}
              <Link to="/migrant/login">{t("login")}</Link>
            </div>
          </div>

          <div className="registration-image-section">
            <div className="registration-image-content">
              <i className="fas fa-users registration-image-icon"></i>
              <h3 className="registration-image-title">
                {t("migrantRegister.joinCommunity")}
              </h3>
              <p className="registration-image-subtitle">
                {t("migrantRegister.benefits")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

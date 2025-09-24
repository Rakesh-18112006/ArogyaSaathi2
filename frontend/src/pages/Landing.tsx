import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import DriverTour from "../components/DriverTour";
import "./Landing.css";
import Footer from "../components/Footer";
import {
  Star,
  Heart,
  Shield,
  Clock,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isTourActive, setIsTourActive] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const features = [
    {
      icon: <Shield className="feature-icon" />,
      title: t("landing.feature1"),
      description: "Secure and encrypted health records",
    },
    {
      icon: <Clock className="feature-icon" />,
      title: t("landing.feature2"),
      description: "24/7 access to medical history",
    },
    {
      icon: <Calendar className="feature-icon" />,
      title: t("landing.feature3"),
      description: "Easy appointment scheduling",
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Multi-language Support",
      description: "Available in multiple languages",
    },
  ];

  const testimonials = [
    {
      name: "Rakesh Kumar",
      role: "Construction Worker",
      content:
        "ArogyaSaathi helped me access healthcare services easily. The QR code feature is amazing!",
      rating: 5,
    },
    {
      name: "Dr. Harshith Mohan",
      role: "General Physician",
      content:
        "The platform makes it so easy to access patient records securely. Great for emergency situations.",
      rating: 5,
    },
    {
      name: "Parinitha Sri",
      role: "Factory Worker",
      content:
        "Finally, a healthcare solution that understands migrant workers' needs. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <Heart className="nav-logo-icon" />
            <span className="nav-logo-text">{t("appName")}</span>
          </div>
          <div className="nav-actions">
            <div className="language-selector-nav">
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="nav-select"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="help-btn"
              onClick={() => setIsTourActive(true)}
            >
              <i className="fas fa-info-circle"></i>
              Help
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        className="landing-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div className="hero-content" variants={itemVariants}>
            <div className="hero-badge">
              <span>Trusted by 10,000+ users</span>
            </div>
            <h1 className="hero-title">{t("landing.heroTitle")}</h1>
            <p className="hero-subtitle">{t("landing.heroSubtitle")}</p>

            <motion.div className="hero-stats" variants={itemVariants}>
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Health Records</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Doctors</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Action Card */}
          <motion.div className="action-card" variants={itemVariants}>
            <h2 className="card-title">Get Started Today</h2>
            <p className="card-description">
              Join thousands who trust ArogyaSaathi for their healthcare needs
            </p>

            <div className="button-group">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={() => navigate("/migrant/register")}
              >
                <i className="fas fa-user"></i>
                {t("userType.migrant")}
                <ArrowRight className="btn-icon" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(14, 165, 233, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                onClick={() => navigate("/doctor/login")}
              >
                <i className="fas fa-user-md"></i>
                {t("userType.doctor")}
                <ArrowRight className="btn-icon" />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(14, 165, 233, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                onClick={() => navigate("/govt/login")}
              >
                <i className="fas fa-user-md"></i>
                {t("userType.government")}
                <ArrowRight className="btn-icon" />
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose ArogyaSaathi?</h2>
            <p>Comprehensive healthcare solutions designed for everyone</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>What Our Users Say</h2>
            <p>Real stories from real people</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="cta-section">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Get Started?</h2>
            <p>
              Join ArogyaSaathi today and take control of your healthcare
              journey
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary cta-btn"
              onClick={() => navigate("/migrant/register")}
            >
              Get Started Now
              <ArrowRight className="btn-icon" />
            </motion.button>
          </motion.div>
        </section> */}

        <Footer />
      </motion.div>

      <DriverTour
        isActive={isTourActive}
        onComplete={() => setIsTourActive(false)}
        tourType="landing"
      />
    </div>
  );
}

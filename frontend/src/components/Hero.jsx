import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <span className="hero-badge">
          🚀 AI Powered Exoplanet Detection
        </span>

        <h1>
          Discover <span>Exoplanets</span> using Artificial Intelligence
        </h1>

        <p>
          Detect exoplanets from NASA Kepler light curve data using a trained
          Random Forest Machine Learning model. Upload datasets, analyze
          predictions, and visualize AI-powered results through an interactive
          dashboard.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Launch Dashboard
          </button>

          <a href="#features">
            <button className="secondary-btn">
              Learn More
            </button>
          </a>

        </div>

      </div>

      <div className="hero-image">

        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>

        <div className="orbit orbit-1"></div>
        <div className="orbit orbit-2"></div>

        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>

      </div>

    </section>
  );
}

export default Hero;
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Prediction from "../components/Prediction";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="dashboard">

        <section className="dashboard-header">
  <div className="dashboard-title">

    <h1>🛰 AI Exoplanet Mission Control</h1>

    <p>
      Intelligent exoplanet classification platform powered by
      NASA Kepler observations and a Random Forest machine learning model.
    </p>

  </div>

  <div className="system-status">

    <div className="status-card">
      <span>🟢</span>
      <p>Model Loaded</p>
    </div>

    <div className="status-card">
      <span>🟢</span>
      <p>Backend Online</p>
    </div>

    <div className="status-card">
      <span>🟢</span>
      <p>API Connected</p>
    </div>

    <div className="status-card">
      <span>🛰</span>
      <p>Mission Ready</p>
    </div>

  </div>
</section>

        <section id="analytics">
          <h2>Project Analytics</h2>
          <Stats />
        </section>

        <section id="prediction">
          <h2>Predict Exoplanets</h2>
          <Prediction />
        </section>

        <section id="about">
          <h2>About This Project</h2>

          <div className="about-card">
            <p>
              This project uses Machine Learning to detect exoplanets from
              astronomical light curve data collected by NASA's Kepler Space
              Telescope.
            </p>

            <ul>
              <li>✔ Random Forest Classifier</li>
              <li>✔ FastAPI Backend</li>
              <li>✔ React + Vite Frontend</li>
              <li>✔ CSV Upload Prediction</li>
              <li>✔ Real-time AI Results</li>
            </ul>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Dashboard; 
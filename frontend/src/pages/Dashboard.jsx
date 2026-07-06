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
          <h1>🚀 AI Exoplanet Detection Dashboard</h1>
          <p>
            Upload a Kepler light curve dataset and let the trained AI model
            predict whether an exoplanet is present.
          </p>
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
import { useState } from "react";
import { predictCSV } from "../services/api";

function Prediction() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction([]);
    setError("");
  };

  const handlePredict = async () => {
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await predictCSV(file);
      console.log(data.prediction);

      setPrediction(data.prediction || []);
    } catch (err) {
      setError(err.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const confirmed = prediction.filter(
  (p) => p === "CONFIRMED"
).length;

const candidate = prediction.filter(
  (p) => p === "CANDIDATE"
).length;

const falsePositive = prediction.filter(
  (p) => p === "FALSE POSITIVE"
).length;


 return (
  <div className="prediction-card">
    <div className="upload-section">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      <button
        className="predict-btn"
        onClick={handlePredict}
      >
        Predict Exoplanets
      </button>
    </div>

    {loading && (
      <p className="loading">Running AI Prediction...</p>
    )}

    {error && (
      <p className="error">{error}</p>
    )}

    {prediction.length > 0 && (
      <div className="result-box">
        <h3>Prediction Results</h3>

        <p className="result-subtitle">
          AI classification of detected exoplanet candidates
        </p>

        <div className="summary-grid">
          <div className="summary-card confirmed-card">
            <h4>🟢 Confirmed</h4>
            <p>{confirmed}</p>
          </div>

          <div className="summary-card candidate-card">
            <h4>🟡 Candidate</h4>
            <p>{candidate}</p>
          </div>

          <div className="summary-card false-card">
            <h4>🔴 False Positive</h4>
            <p>{falsePositive}</p>
          </div>

          <div className="summary-card total-card">
            <h4>📄 Total Records</h4>
            <p>{prediction.length}</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>AI Prediction</th>
              </tr>
            </thead>

            <tbody>
              {prediction.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);
}

export default Prediction;

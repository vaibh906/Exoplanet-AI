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

      setPrediction(data.prediction || []);
    } catch (err) {
      setError(err.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

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
        <p className="loading">
          Running AI Prediction...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {prediction.length > 0 && (
        <div className="result-box">
          <h3>Prediction Results</h3>

          <table>
            <thead>
              <tr>
                <th>Row</th>
                <th>Prediction</th>
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
      )}
    </div>
  );
}

export default Prediction;
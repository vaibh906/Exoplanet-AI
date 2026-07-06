const API_URL = "http://127.0.0.1:8000";

export async function predictCSV(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/predict-csv`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return await response.json();
}

export async function predictFeatures(features) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      features,
    }),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return await response.json();
}
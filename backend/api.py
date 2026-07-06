from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pandas as pd
import joblib
import os

app = FastAPI(title="Exoplanet Detection API")

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
model = joblib.load(
    os.path.join(
        "models",
        "random_forest_model.pkl"
    )
)

# Load Label Encoder
encoder = joblib.load(
    os.path.join(
        "models",
        "label_encoder.pkl"
    )
)


# ---------------- HOME ---------------- #

@app.get("/")
def home():
    return {
        "message": "Exoplanet Detection API is Running 🚀"
    }


# ---------------- JSON PREDICTION ---------------- #

class PredictionRequest(BaseModel):
    features: list[float]


@app.post("/predict")
def predict(request: PredictionRequest):

    data = pd.DataFrame([request.features])

    prediction = model.predict(data)

    prediction = encoder.inverse_transform(prediction)

    return {
        "prediction": prediction[0]
    }


# ---------------- CSV PREDICTION ---------------- #

@app.post("/predict-csv")
async def predict_csv(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    prediction = model.predict(df)

    prediction = encoder.inverse_transform(prediction)

    return {
        "prediction": prediction.tolist()
    }
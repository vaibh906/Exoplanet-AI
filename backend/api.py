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


# Load Processed Dataset to get training feature names
processed_data = pd.read_csv(
    os.path.join(
        "data",
        "processed",
        "processed_data.csv"
    )
)


training_columns = processed_data.drop(
    columns=["koi_disposition"]
).columns.tolist()

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

    # Remove duplicate rows
    df.drop_duplicates(inplace=True)

    # Remove columns with more than 70% missing values
    threshold = len(df) * 0.70
    df = df.dropna(axis=1, thresh=threshold)

    # Remove unwanted ID columns
    remove_columns = [
        "rowid",
        "kepid",
        "kepoi_name",
        "kepler_name"
    ]

    df = df.drop(columns=remove_columns, errors="ignore")

    # Remove remaining text columns except target
    object_columns = df.select_dtypes(include="object").columns

    for col in object_columns:
        if col != "koi_disposition":
            df.drop(columns=col, inplace=True)

    # Fill missing numeric values
    numeric_columns = df.select_dtypes(include="number").columns

    for col in numeric_columns:
        df[col] = df[col].fillna(df[col].median())

    # Remove target column if it exists
    if "koi_disposition" in df.columns:
        df = df.drop(columns=["koi_disposition"])

    # Arrange columns exactly like training data
    df = df.reindex(columns=training_columns)

    prediction = model.predict(df)

    prediction = encoder.inverse_transform(prediction)

    return {
        "prediction": prediction.tolist()
    }
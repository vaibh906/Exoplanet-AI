import os
import joblib
import pandas as pd


class ExoplanetPredictor:

    def __init__(self):

        self.model = joblib.load(
            os.path.join(
                os.getcwd(),
                "models",
                "random_forest_model.pkl"
            )
        )

        self.encoder = joblib.load(
            os.path.join(
                os.getcwd(),
                "models",
                "label_encoder.pkl"
            )
        )

    def predict(self, csv_file):

    data = pd.read_csv(csv_file)

    prediction = self.model.predict(data)

    prediction = self.encoder.inverse_transform(prediction)

    result = data.copy()

    result["prediction"] = prediction

    return result.to_dict(orient="records")

if __name__ == "__main__":

    predictor = ExoplanetPredictor()

    result = predictor.predict(
        os.path.join(
            os.getcwd(),
            "sample.csv"
        )
    )

    print(result)
import os
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


class ExoplanetTrainer:

    def __init__(self):

        self.data_path = os.path.join(
            os.getcwd(),
            "data",
            "processed",
            "processed_data.csv"
        )

        self.model_path = os.path.join(
            os.getcwd(),
            "models",
            "random_forest_model.pkl"
        )

    def load_dataset(self):

        print("Loading Processed Dataset...")

        return pd.read_csv(self.data_path)

    def train(self):

        df = self.load_dataset()

        X = df.drop(columns=["koi_disposition"])

        y = df["koi_disposition"]

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.20,
            random_state=42,
            stratify=y
        )

        print("\nTraining Random Forest Model...\n")

        model = RandomForestClassifier(
            n_estimators=300,
            random_state=42,
            n_jobs=-1
        )

        model.fit(X_train, y_train)

        prediction = model.predict(X_test)

        accuracy = accuracy_score(y_test, prediction)

        print("=" * 60)

        print("Accuracy :", round(accuracy * 100, 2), "%")

        print("=" * 60)

        print("\nClassification Report\n")

        print(classification_report(y_test, prediction))

        print("\nConfusion Matrix\n")

        print(confusion_matrix(y_test, prediction))

        os.makedirs("models", exist_ok=True)

        joblib.dump(model, self.model_path)

        print("\nModel Saved Successfully")

        print(self.model_path)


if __name__ == "__main__":

    trainer = ExoplanetTrainer()

    trainer.train()
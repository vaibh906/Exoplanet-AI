import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import joblib


class DataPreprocessor:

    def __init__(self):

        self.raw_path = os.path.join(
            os.getcwd(),
            "data",
            "raw",
            "cumulative.csv"
        )

        self.processed_path = os.path.join(
            os.getcwd(),
            "data",
            "processed",
            "processed_data.csv"
        )

        self.encoder_path = os.path.join(
            os.getcwd(),
            "models",
            "label_encoder.pkl"
        )

    def load_data(self):

        print("Loading dataset...")

        df = pd.read_csv(self.raw_path)

        print(f"Dataset Loaded Successfully")
        print(f"Shape : {df.shape}")

        return df

    def clean_data(self, df):

        print("\nCleaning Dataset...")

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

        for col in remove_columns:
            if col in df.columns:
                df.drop(columns=col, inplace=True)

        # Fill missing numeric values
        numeric_columns = df.select_dtypes(include=np.number).columns

        for col in numeric_columns:
            df[col] = df[col].fillna(df[col].median())

        # Target column
        target = "koi_disposition"

        # Remove every remaining text column except target
        object_columns = df.select_dtypes(include="object").columns

        for col in object_columns:
            if col != target:
                df.drop(columns=col, inplace=True)

        print("Cleaning Completed")

        return df

    def encode_target(self, df):

        print("Encoding Target...")

        encoder = LabelEncoder()

        df["koi_disposition"] = encoder.fit_transform(
            df["koi_disposition"]
        )

        os.makedirs("models", exist_ok=True)

        joblib.dump(encoder, self.encoder_path)

        print("Label Encoder Saved")

        return df

    def save_dataset(self, df):

        os.makedirs(
            os.path.dirname(self.processed_path),
            exist_ok=True
        )

        df.to_csv(self.processed_path, index=False)

        print("Processed Dataset Saved")

    def preprocess(self):

        df = self.load_data()

        df = self.clean_data(df)

        df = self.encode_target(df)

        self.save_dataset(df)

        print("\nRemaining Columns:")

        print(df.columns.tolist())

        print("\nDataset Shape:", df.shape)

        print("\nPreprocessing Completed Successfully")


if __name__ == "__main__":

    processor = DataPreprocessor()

    processor.preprocess()
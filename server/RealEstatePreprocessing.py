import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import pandas as pd
import joblib
scaler = joblib.load("/Users/godfather_101/Boopathi_workspace/Projects/RealWordProjects/365datascience/project-files-real-estate-market-analysis-with-python/Deployment/scaler")
class RealEstateAnalysis:
    def __init__(self,data):
        self.data = data
    def feature_engineering(self):
        X = self.data[['deal_satisfaction', 'property', 'area', 'sale_month', 'sale_weekday','birth_month', 'birth_year', 'birth_weekday', 'Age']]
        return scaler.transform(X)

    def predict(self,X):
        with open("/Users/godfather_101/Boopathi_workspace/Projects/RealWordProjects/365datascience/project-files-real-estate-market-analysis-with-python/Deployment/RealERstateAnalysisModel.pkl","rb") as file:
            model = pickle.load(file)
            return model.predict(X)
from flask import Flask, request, jsonify
from flask import send_from_directory
from flask_cors import CORS,cross_origin
from flask_restful import Api, Resource
import numpy as np
import pickle
import joblib
import pandas as pd
import warnings

warnings.filterwarnings("ignore")


app = Flask(__name__,static_folder="../main/dist")
api = Api(app)

CORS(app)

scaler = joblib.load(
    "/Users/godfather_101/Boopathi_workspace/webDev/Real_Estate_Analysis/server/Model/scaler"
)
with open(
    "/Users/godfather_101/Boopathi_workspace/webDev/Real_Estate_Analysis/server/Model/RealERstateAnalysisModel.pkl",
    "rb",
) as file:
    model = pickle.load(file)


class Predict(Resource):
    def post(self):
        try:
            # Get data from the request
            data = request.get_json(force=True)
            r = {}
            for i, col in data.items():
                r[i] = [col]
            X = pd.DataFrame(r)
            X = scaler.transform(X)
            prediction = model.predict(X)

            # Return the prediction as JSON
            result = {"prediction": int(prediction[0])}
            return jsonify(result)

        except Exception as e:
            return {"error": str(e)}


# # Add the Predict resource to the API
api.add_resource(Predict, "/predict")

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder,"index.html")

if __name__ == "__main__":
    app.run(debug=True)



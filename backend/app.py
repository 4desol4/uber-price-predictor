from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)
CORS(app)

model = pickle.load(open("uber_model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    distance = float(data["distance"])
    passengers = int(data["passengers"])

    price = model.predict([[distance, passengers]])
    return jsonify({"fare": round(price[0], 2)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

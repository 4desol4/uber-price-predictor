import { useState } from "react";
import "./App.css";

function App() {
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("");
  const [fare, setFare] = useState("");

  const predictFare = async () => {
    const response = await fetch("https://uber-price-predictor-8a5c.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        distance: distance,
        passengers: passengers
      })
    });

    const data = await response.json();
    setFare(data.fare);
  };

  return (
    <div className="container">
      <h1>Uber Fare Predictor</h1>

      <input
        placeholder="Distance (km)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />

      <input
        placeholder="Passengers"
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
      />

      <button onClick={predictFare}>Predict Fare</button>

      {fare && <h2>Estimated Fare: ₦{fare}</h2>}
    </div>
  );
}

export default App;

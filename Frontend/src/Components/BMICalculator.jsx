import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [gender, setGender] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height || !gender) {
      toast.error("please enter valid height, weight and gender");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      toast.info(
        "You are underweight. consider gaining some weight for better health.",
      );
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      toast.success("You have a normal weight. Kept it up!");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      toast.warning(
        "You are overweight. consider losing some weight for better health.",
      );
    } else {
      toast.error("You are obese.");
    }
  };

  return (
    <section className="bmi">
      <h1>BMI CALCULATOR</h1>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={calculateBMI}>
            <div>
              <label>Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required/>
            </div>
            <div>
              <label>Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
            </div>
            <div>
              <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            </div>
            <button type="submit">Calculate BMI</button>
          </form>
        </div>
        <div className="wrapper">
          <img src="/bmi.jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;

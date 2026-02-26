import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import WorkoutSessions from "./Components/WorkoutSessions";
import Gallery from "./Components/Gallery";
import Price from "./Components/Price";
import Contact from "./Components/Contact";
import BMICalculator from "./Components/BMICalculator";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Hero />
        <WorkoutSessions />
        <Gallery />
        <Price />
        <Contact />
        <BMICalculator />
        <Footer />
        <ToastContainer theme="dark" position="top-center" />
      </Router> 
    </>
  );
};

export default App;

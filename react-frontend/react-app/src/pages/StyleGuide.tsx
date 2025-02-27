import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import faceguide from "../assets/faceguide.png";

const FaceShape: React.FC = () => {
  const [foreheadWidth, setForeheadWidth] = useState("");
  const [cheekboneWidth, setCheekboneWidth] = useState("");
  const [jawlineWidth, setJawlineWidth] = useState("");
  const [faceLength, setFaceLength] = useState("");
  const [calculatedShape, setCalculatedShape] = useState<string | null>(null);

  // Face shape calculation logic
  const handleCalculate = () => {
    const forehead = parseFloat(foreheadWidth);
    const cheekbones = parseFloat(cheekboneWidth);
    const jawline = parseFloat(jawlineWidth);
    const length = parseFloat(faceLength);

    // Check if values are within a realistic human range
    if (
      isNaN(forehead) || isNaN(cheekbones) || isNaN(jawline) || isNaN(length) ||
      forehead < 8 || forehead > 25 ||
      cheekbones < 10 || cheekbones > 30 ||
      jawline < 8 || jawline > 25 ||
      length < 15 || length > 35
    ) {
      setCalculatedShape("You must be an alien! (Face sizes should be between 8-35 cm).");
      return;
    }

    let shape = "";

    if (length > cheekbones && forehead > jawline) {
      shape = "Oval";
    } else if (length > cheekbones * 1.3) {
      shape = "Oblong (Rectangle)";
    } else if (Math.abs(length - cheekbones) < 2 && Math.abs(cheekbones - jawline) < 2) {
      shape = "Square";
    } else if (Math.abs(length - cheekbones) < 2 && jawline < cheekbones) {
      shape = "Round";
    } else if (forehead > cheekbones && jawline < cheekbones) {
      shape = "Heart";
    } else if (cheekbones > forehead && cheekbones > jawline) {
      shape = "Diamond";
    } else {
      shape = "Undefined (Please check your inputs)";
    }

    setCalculatedShape(shape);
  };


  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Find Your Face Shape</h2>

      {/* Description Section */}
      <div className="text-center mt-4">
        <p className="text-muted">
          Find the perfect hairstyle by measuring your facial proportions to determine your face shape.
        </p>
      </div>

      <div className="row justify-content-center align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6 text-center">
          <img src={faceguide} alt="Face Shape Guide" className="img-fluid" />
        </div>

        {/* Right Side: Calculator Form */}
        <div className="col-md-4">
          <div className="p-4 border rounded bg-light shadow">
            <h5 className="text-center mb-3">Enter Your Measurements</h5>

            <div className="mb-2">
              <label className="form-label">Forehead width (cm)</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={foreheadWidth}
                onChange={(e) => setForeheadWidth(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Cheekbones width (cm)</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={cheekboneWidth}
                onChange={(e) => setCheekboneWidth(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Jawline width (cm)</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={jawlineWidth}
                onChange={(e) => setJawlineWidth(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Face length (cm)</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={faceLength}
                onChange={(e) => setFaceLength(e.target.value)}
              />
            </div>

            {/* Calculate Button */}
            <div className="text-center mt-3">
              <button className="btn btn-dark w-100 btn-sm" onClick={handleCalculate}>
                Calculate
              </button>
            </div>

            {/* Display Calculated Face Shape */}
            {calculatedShape && (
              <div className="alert alert-info text-center mt-3">
                Your face shape is: <strong>{calculatedShape}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceShape;

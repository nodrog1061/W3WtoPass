import { Stepper, Step } from "react-form-stepper";
import { useState, useEffect } from "react";

const CustomStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Stepper activeStep={activeStep} connectorStateColors={true}>
        <Step completed={true} label="Children Step 1" />
        <Step label="Children Step 2" />
        <Step label="Children Step 3" />
      </Stepper>
      <button onClick={() => setActiveStep(activeStep + 1)}>Next</button>
    </>
  );
};

export default CustomStepper;

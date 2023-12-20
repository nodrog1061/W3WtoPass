import { useState, useContext, createContext } from "react";
// import the progress bar
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import MapComponent from "../components/MapSelector.jsx";
import W3Wpresentor from "../components/W3WPresentor.jsx";
import { useAuthStore } from "../context/authState.jsx";
import Banner from "../components/Banner.jsx";
import sendTo from "../components/pushTo.jsx";
import { useRouter } from "next/router";

function step1Validator() {
  const coordinates = useAuthStore.getState().coordinates;

  // return a boolean
  // console.log("fromValidator:", w3wLoc);
  // console.log((w3wLoc[0] !== undefined && w3wLoc[1] !== undefined && w3wLoc[2] !== undefined))
  return coordinates[0] !== undefined;
}

function step2Validator() {
  return true;
}

export default function LoginComponent() {
  let router = useRouter();
  const {
    w3wLoc,
    coordinates,
    uid,
    setLoading,
    loading,
    error,
    setError,
    setIncorectLogin,
    mapCompleationTime,
    startLogin,
  } = useAuthStore();
  const [mapError, setMapError] = useState(false);

  async function onFormSubmit() {
    setError(false);
    setIncorectLogin(false);
    // setLoading(true);

    var details = {
      uid: uid,
      lat: coordinates[1],
      long: coordinates[0],
      w3w: w3wLoc,
      mapCompleationTime: mapCompleationTime,
      startLogin: startLogin,
    };
    var formBody = JSON.stringify(details);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formBody,
    });
    if (response.ok) {
      router.push("/success");
    } else if (response.status === 401) {
      setIncorectLogin(true);
      router.push("/");
    } else {
      setError(true);
      router.push("/");
    }
    // setLoading(false);
  }

  console.info("uid:", uid);

  return (
    <StepProgressBar
      startingStep={0}
      onSubmit={onFormSubmit}
      wrapperClass="w-full"
      steps={[
        {
          label: "Step 1",
          name: "step 1",
          content: (
            <div>
              {/* <W3Wpresentor readOnly={true} /> */}
              <h2 className="mb-4 text-2xl tracking-tight text-gray-900 sm:text-2xl">
                Map Location
              </h2>
              {error && (
                <Banner type="error">
                  The login details you entered were incorrect. Please try
                  again.
                </Banner>
              )}
              <p className="mb-6">
                Please select the location you selected when you signed up.
              </p>
              <Banner type="info">
                Please ensure you have seleted a location on the map before
                continuing.
              </Banner>
              <MapComponent login={true} />
            </div>
          ),
          validator: step1Validator,
        },
        {
          label: "Step 2",
          name: "step 2",
          content: (
            <div className="pt-10 sm:p-10 m-10">
              <h2 className="mb-4 text-2xl tracking-tight text-gray-900 sm:text-2xl">
                Pass Phrase
              </h2>

              <p className="mb-6">
                Please enter the pass phrase you created when you signed up.
              </p>
              <W3Wpresentor setError={setError} />
            </div>
          ),
          validator: step1Validator,
        },
      ]}
    />
  );
}

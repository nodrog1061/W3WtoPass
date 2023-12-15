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
  } = useAuthStore();
  const [mapError, setMapError] = useState(false);

  async function onFormSubmit() {
    setError(false);
    setIncorectLogin(false);
    // setLoading(true);

    var details = {
      uid: uid,
      lat: coordinates[0],
      long: coordinates[1],
      w3w: w3wLoc,
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
      steps={[
        {
          label: "Step 1",
          name: "step 1",
          content: (
            <div className="sm:px-10 mx-10">
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
                Please select a location on the map below that you can easily
                remember. This will be used to generate a 3 word pass phrase for
                you to use as your password. you should try to remember this,
                but it shoud also not be something that is easy to guess.
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
                From the location you chose on the last page we have generated a
                3 word pass phrase for you. You should store this how you'd
                normaly store a password. you'll be promped on this at sceduled
                periods as part of the study.
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

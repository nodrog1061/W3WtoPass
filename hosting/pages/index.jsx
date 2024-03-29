import Link from "next/link";
import { useAuthStore } from "../context/authState.jsx";
import { useState } from "react";
import Banner from "../components/Banner.jsx";
import { useRouter } from "next/router";

async function verifyID(setError, setLoading) {
  const uid = useAuthStore.getState().uid;
  setLoading(true);
  var details = {
    uid: uid,
  };
  var formBody = JSON.stringify(details);

  const response = await fetch("/api/checkID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formBody,
  });
  setError(!response.ok);
  setLoading(false);
  return response.json();
}

export default function IndexPage() {
  const {
    setUid,
    uid,
    loading,
    setLoading,
    error,
    setError,
    incorectLogin,
    setStartLogin,
  } = useAuthStore();
  let router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let idDets = await verifyID(setError, setLoading);
    if (idDets["accountSetupCompleted"]) {
      setStartLogin(new Date().toISOString());
      setError(false);
      router.push("/login");
    } else {
      setError(false);
      router.push("/signUp");
    }
  };

  return (
    <div className="pt-10 sm:p-10 m-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Welcome to W3W to Pass
      </h1>
      <p className="text-xl leading-8 text-gray-600 border-t border-gray-900/10 ">
        Please Enter your Referal number that you where sent by email.
      </p>
      <div>
        {error && (
          <Banner type="error">
            There was an error verifying your details. Please try again.
          </Banner>
        )}
        {incorectLogin && (
          <Banner type="error">
            The login details you entered were incorrect. Please try again.
          </Banner>
        )}

        <form className="space-y-6 mt-6" onSubmit={handleFormSubmit}>
          <input
            id="idEnding"
            name="idEnding"
            type="text"
            required
            className="w-50 text-center block rounded-md border-0 py-1.5 mt-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
            onChange={(e) => setUid(e.target.value)}
            maxLength="4"
            minLength="4"
            disabled={loading}
            value={uid}
          />
          <button
            disabled={loading}
            type="submit"
            className="p-5 flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-300 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

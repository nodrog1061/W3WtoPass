import { useAuthStore } from "../context/authState.jsx";
import { useState, useEffect } from "react";
import Banner from './Banner.jsx';

export default function W3Wpresentor({ readOnly, setW3w = () => { } }) {
  const { w3wLoc } = useAuthStore();
  const [error, setError] = useState(false);

  

  useEffect(() => {
    setError(readOnly && w3wLoc[0] === undefined);
  }, [])

  return (
    <>
      {error && <Banner type="error" >Please return to the previous step and select a location on the map.</Banner>}
      <div className="flex flex-col mt-2">
        <label htmlFor="w3w" className="block text-sm font-medium text-gray-700">
          Your Pass phrase
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="word 1"
            id="word1"
            disabled={readOnly}
            value={w3wLoc[0]}
            onChange={(e) => setW3w(e.target.value)}
            className="block w-1/3 mr-2 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            name="word 2"
            id="word2"
            disabled={readOnly}
            value={w3wLoc[1]}
            onChange={(e) => setW3w(e.target.value)}
            className="block w-1/3 mr-2 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            name="word 3"
            id="word3"
            disabled={readOnly}
            value={w3wLoc[2]}
            onChange={(e) => setW3w(e.target.value)}
            className="block w-1/3 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
}

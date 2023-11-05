import { useState, useContext, createContext } from 'react';
// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';
import MapComponent from '../components/MapSelector.jsx';
import W3Wpresentor from '../components/W3WPresentor.jsx';
import { useAuthStore } from '../context/authState.jsx';

// setup the step content
const step1Content =

    <div className='pt-10 sm:p-10 m-10'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Welcome to W3W to Pass</h1>
        <p className="text-xl leading-8 text-gray-600">Before we get started, we need to get your approval on a few things.</p>
        <div className="border-t border-gray-900/10 pt-5 pl-5">
            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-6">Register Your Account</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Please Enter your Referal number that you where sent by email.
            </p>
            <input
                id="idEnding"
                name="idEnding"
                type="text"
                required
                className="w-20 text-center block rounded-md border-0 py-1.5 mt-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
                // onChange={handleIdChange}
                maxLength="5"
                minLength="5"
            // disabled={loading}
            />
        </div>
    </div>;

const step2Content =
    <div className='pt-10 sm:p-10'>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Access</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
            To create your accont we need your permission to make contact with St John Ambulance (England) to verify you are who you say you are.
        </p>

        <div className="pl-5 space-y-10">
            <form>
                <fieldset>
                    <div className="relative flex gap-x-3 mt-6">
                    </div>
                    <div className="m-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                    id="connect"
                                    name="connect"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="connect" className="font-medium text-gray-900">
                                    Connect MyData
                                </label>
                                <p className="text-gray-500">Alow us to contact MyData to verify your identity and role.</p>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                    id="store"
                                    name="store"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="store" className="font-medium text-gray-900">
                                    Store Your Data
                                </label>
                                <p className="text-gray-500">Store data about you in our database sent to us by St John and by you.</p>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                    id="contact"
                                    name="contact"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="contact" className="font-medium text-gray-900">
                                    Contact your manager
                                </label>
                                <p className="text-gray-500">Alow us to comunicate with your Unit Manager and Event Manager on your behalf.</p>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                    id="recive"
                                    name="recive"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="recive" className="font-medium text-gray-900">
                                    Recive Email Notifications
                                </label>
                                <p className="text-gray-500">Get notified when you have a new status on shifts you've applied for.</p>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>;

const step3Content = <h1>Step 3 Content</h1>;

// setup step validators, will be called before proceeding to the next step
function step1Validator() {
    // return a boolean
    return true;
}

function step2Validator() {
    return document.getElementById('connect').checked && document.getElementById('store').checked && document.getElementById('contact').checked && document.getElementById('recive').checked;
}

function step3Validator(w3wLoc) {
    // return a boolean
    console.log("fromValidator:", w3wLoc);
    return (w3wLoc[0] !== "" && w3wLoc[1] !== "" && w3wLoc[2] !== "");
}

function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
}

export default function SignUpComponent() {
    const { w3wLoc } = useAuthStore();

    console.warn(w3wLoc !== '' && w3wLoc[1] !== '' && w3wLoc[2] !== '')

    return (
        <StepProgressBar
            startingStep={2}
            onSubmit={onFormSubmit}
            steps={[
                {
                    label: 'Step 1',
                    name: 'step 1',
                    content: step1Content,
                    validator: step1Validator
                },
                {
                    label: 'Step 2',
                    name: 'step 2',
                    content: step2Content,
                    validator: step2Validator
                },
                {
                    label: 'Step 3',
                    name: 'step 3',
                    content:
                        <div className='pt-10 sm:p-10 m-10'>
                            {/* <W3Wpresentor readOnly={true} /> */}
                            <h2 className='mb-4 text-2xl tracking-tight text-gray-900 sm:text-2xl'>Map Location</h2>

                            <p className="mb-6">Please select a location on the map below that you can easily remember. This will be used to generate a 3 word pass phrase for you to use as your password. you should try to remember this, but it shoud also not be something that is easy to guess.</p>
                            <MapComponent />
                        </div>,
                    validator: step3Validator(w3wLoc)
                },
                {
                    label: 'Step 4',
                    name: 'step 4',
                    content:
                        <div className='pt-10 sm:p-10 m-10'>
                            <h2 className='mb-4 text-2xl tracking-tight text-gray-900 sm:text-2xl'>Pass Phrase</h2>

                            <p className="mb-6">From the location you chose on the last page we have generated a 3 word pass phrase for you. You should store this how you'd normaly store a password. you'll be promped on this at sceduled periods as part of the study.</p>
                            <W3Wpresentor readOnly={true} />
                        </div>,
                    validator: step3Validator
                }
            ]}
        />
    )
};
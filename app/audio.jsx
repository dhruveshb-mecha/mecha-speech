"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { WebVoiceProcessor } from "@picovoice/web-voice-processor";
// import { AudioRecorder } from "react-audio-voice-recorder";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useSpeech } from "react-text-to-speech";

export default function AudioComponent() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [message, setMessage] = useState("");

  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: transcript });

  if (!browserSupportsSpeechRecognition) {
    console.log("Browser does not support Speech Recognition");
  }

  return (
    <div>
      <div className="bg-white flex justify-center items-center h-screen">
        <div className="bg-white w-4/5">
          {/* <img
            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="idk - Highvyn, Taylor Shin"
            className="w-12 h-12 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50"
          /> */}
          <div className="flex w-full justify-center align-baseline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#111"
                fillRule="evenodd"
                d="M12 3.25a.75.75 0 01.75.75v16a.75.75 0 01-1.5 0V4a.75.75 0 01.75-.75zm-8 7a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2a.75.75 0 01.75-.75zm16 0a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#AAA"
                d="M16.75 7a.75.75 0 00-1.5 0v10a.75.75 0 001.5 0V7zm-8 0a.75.75 0 00-1.5 0v10a.75.75 0 001.5 0V7z"
              ></path>
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-center">
            Speech Recognition
          </h2>

          <div className="mt-6 flex gap-2 justify-center items-center">
            <button
              className={`p-3 rounded-full focus:outline-none 
              ${listening ? "bg-green-300" : "bg-gray-200"}
            `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              </svg>
            </button>

            <button
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={SpeechRecognition.startListening}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
            </button>
            <button
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={SpeechRecognition.stopListening}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                />
              </svg>
            </button>
            <button
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={resetTranscript}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                />
              </svg>
            </button>
            <button
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={start}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            </button>
          </div>
          {/* Progress Bar */}

          {/* Time Information */}
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
              <p>{transcript}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import AudioComponent from "./audio";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        src="https://code.responsivevoice.org/responsivevoice.js?key=B4hVmSBj"
        strategy="beforeInteractive"
        onLoad={() =>
          console.log(
            `script loaded correctly, responsivevoice  been populated`
          )
        }
      />
      <main className="bg-white">
        <AudioComponent />
      </main>
    </>
  );
}

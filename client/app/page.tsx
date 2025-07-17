"use client";

import { useState } from "react";

export default function Home() {
   const [message, setMessage] = useState<string>(
      "Click the button to check server status."
   );

   const checkServerHealth = async () => {
      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         const response = await fetch(`${apiUrl}/api/health-check`);

         if (!response.ok) {
            throw new Error("Network response was not ok");
         }

         const data = await response.json();
         setMessage(data.message);
      } catch (error) {
         console.error("Failed to fetch:", error);
         setMessage("Failed to connect to the server.");
      }
   };

   return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
         <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
               Patient Education Plan Generator
            </h1>
            <p className="mb-8 text-lg">{message}</p>
            <button
               onClick={checkServerHealth}
               className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
               Check Server Health
            </button>
         </div>
      </main>
   );
}

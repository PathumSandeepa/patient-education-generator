"use client";

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const DashboardPage = () => {
   const [condition, setCondition] = useState("");
   const [topic, setTopic] = useState("");
   const [educationLevel, setEducationLevel] = useState("Simple");
   const [generatedPlan, setGeneratedPlan] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setGeneratedPlan("");
      setError("");
      try {
         const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/plans/generate`,
            { condition, topic, educationLevel },
            { withCredentials: true }
         );
         setGeneratedPlan(response.data.plan);
      } catch {
         setError("Failed to generate plan. Try again.");
      } finally {
         setIsLoading(false);
      }
   };

   const formatResponse = (text: string) => {
      if (!text) return null;

      const lines = text.split("\n");

      return lines.map((line, index) => {
         const trimmed = line.trim();

         if (/^\*\*(.+?)\*\*$/.test(trimmed)) {
            const heading = trimmed.match(/^\*\*(.+?)\*\*$/)?.[1] ?? "";
            return (
               <h3
                  key={index}
                  className="text-lg font-bold text-blue-700 mt-6 mb-3 first:mt-0"
               >
                  {heading}
               </h3>
            );
         }

         const withBold = trimmed.replace(
            /\*\*(.+?)\*\*/g,
            "<strong>$1</strong>"
         );

         if (/^\d+\.\s+/.test(trimmed)) {
            return (
               <p
                  key={index}
                  className="pl-4 text-sm text-gray-800 mb-1"
                  dangerouslySetInnerHTML={{ __html: withBold }}
               />
            );
         }

         if (/^\*\s+/.test(trimmed)) {
            return (
               <p
                  key={index}
                  className="pl-4 text-sm text-gray-800 mb-1"
                  dangerouslySetInnerHTML={{ __html: "• " + withBold.slice(2) }}
               />
            );
         }

         return (
            <p
               key={index}
               className="text-sm text-gray-800 mb-2"
               dangerouslySetInnerHTML={{ __html: withBold }}
            />
         );
      });
   };

   return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-12">
         <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
               <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 tracking-tight">
                  Education Plan Generator
               </h1>
               <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                     <label
                        htmlFor="condition"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Patient Condition
                     </label>
                     <input
                        id="condition"
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-200 hover:border-blue-300"
                        placeholder="e.g., Diabetes"
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="topic"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Education Topic
                     </label>
                     <input
                        id="topic"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all duration-200 hover:border-blue-300"
                        placeholder="e.g., Monitoring Glucose"
                     />
                  </div>
                  <div>
                     <div className="text-sm font-medium text-gray-700 mb-2">
                        Audience Level
                     </div>
                     <div className="flex gap-4">
                        {["Simple", "Detailed"].map((level) => (
                           <label
                              key={level}
                              className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all duration-200 ${
                                 educationLevel === level
                                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-sm"
                              }`}
                           >
                              <input
                                 type="radio"
                                 name="educationLevel"
                                 value={level}
                                 checked={educationLevel === level}
                                 onChange={(e) =>
                                    setEducationLevel(e.target.value)
                                 }
                                 className="hidden"
                              />
                              {level === "Simple"
                                 ? "Simple English"
                                 : "Medical Detail"}
                           </label>
                        ))}
                     </div>
                  </div>
                  <motion.button
                     type="submit"
                     disabled={isLoading}
                     whileTap={{ scale: 0.96 }}
                     whileHover={{ scale: 1.02 }}
                     className="mt-2 inline-block px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                     {isLoading ? (
                        <div className="flex items-center gap-2">
                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                           Generating...
                        </div>
                     ) : (
                        "Generate Plan"
                     )}
                  </motion.button>
               </form>
            </div>

            <AnimatePresence>
               {error && (
                  <motion.div
                     className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                     initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.3 }}
                  >
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <svg
                              className="h-5 w-5 text-red-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                           >
                              <path
                                 fillRule="evenodd"
                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                 clipRule="evenodd"
                              />
                           </svg>
                        </div>
                        <div className="ml-3">
                           <p className="text-sm font-medium text-red-800">
                              {error}
                           </p>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            <AnimatePresence>
               {generatedPlan && (
                  <motion.div
                     className="mt-8 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     transition={{ duration: 0.5 }}
                  >
                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                        <h2 className="text-xl font-semibold text-blue-700 flex items-center">
                           <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                           </svg>
                           Generated Education Plan
                        </h2>
                     </div>
                     <div className="p-6">
                        <div className="prose max-w-none text-gray-800 leading-relaxed">
                           {formatResponse(generatedPlan)}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </div>
   );
};

export default DashboardPage;

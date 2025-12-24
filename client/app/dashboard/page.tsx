"use client";

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Reusable Input Component ---
const InputField = ({
   label,
   value,
   onChange,
   placeholder,
   icon,
   helperText,
}: {
   label: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   placeholder: string;
   icon: React.ReactNode;
   helperText?: string;
}) => (
   <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700 ml-1">
         {label}
      </label>
      <div className="relative group">
         {/* Icon Positioned Absolute Left */}
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            {icon}
         </div>
         <input
            type="text"
            value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
            className="block w-full pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
         />
      </div>
      {helperText && <p className="text-xs text-gray-500 ml-1">{helperText}</p>}
   </div>
);

// Audience Selection Card Component ---
const AudienceOption = ({
   title,
   description,
   isSelected,
   onClick,
   icon,
}: {
   title: string;
   description: string;
   isSelected: boolean;
   onClick: () => void;
   icon: React.ReactNode;
}) => (
   <div
      onClick={onClick}
      className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
         isSelected
            ? "border-blue-500 bg-blue-50/30"
            : "border-gray-200 bg-white hover:border-blue-200"
      }`}
   >
      <div className="flex justify-between items-start mb-3">
         {/* Custom Toggle Switch Visual */}
         <div
            className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 transition-colors ${
               isSelected ? "bg-blue-600" : "bg-gray-300"
            }`}
         >
            <div
               className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  isSelected ? "translate-x-5" : "translate-x-0"
               }`}
            />
         </div>

         {/* Card Icon (Book or Caduceus) */}
         <div className={`text-gray-400 ${isSelected ? "text-blue-600" : ""}`}>
            {icon}
         </div>
      </div>

      <h3
         className={`font-semibold text-sm ${
            isSelected ? "text-blue-900" : "text-gray-900"
         }`}
      >
         {title}
      </h3>
      <p className="text-xs text-gray-500 mt-1 leading-snug">{description}</p>
   </div>
);

// Plan Renderer Component ---
// Parses the specific markdown-like syntax from the backend
const PlanRenderer = ({ text }: { text: string }) => {
   if (!text) return null;
   const lines = text.split("\n");

   return (
      <div className="space-y-4 text-gray-800">
         {lines.map((line, index) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            // 1. Detect Headings (**Heading**)
            if (/^\*\*(.+?)\*\*$/.test(trimmed)) {
               return (
                  <h3
                     key={index}
                     className="text-lg font-bold text-blue-700 mt-6 mb-2 border-b border-blue-100 pb-2"
                  >
                     {trimmed.replace(/\*\*/g, "")}
                  </h3>
               );
            }

            // 2. Helper to Bold text inside paragraphs
            const processBold = (str: string) =>
               str.replace(
                  /\*\*(.+?)\*\*/g,
                  "<strong class='font-semibold text-gray-900'>$1</strong>"
               );

            // 3. Detect List Items (1. or * or -)
            if (/^(\d+\.|•|\-)\s+/.test(trimmed)) {
               const isBullet = !/^\d+\./.test(trimmed);
               const content = trimmed.replace(/^(\d+\.|•|\-)\s+/, "");
               return (
                  <div key={index} className="flex items-start gap-2 ml-2">
                     <span className="text-blue-500 font-bold mt-1.5 text-xs">
                        {isBullet ? "●" : trimmed.match(/^\d+\./)?.[0]}
                     </span>
                     <p
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                           __html: processBold(content),
                        }}
                     />
                  </div>
               );
            }

            // 4. Standard Paragraphs
            return (
               <p
                  key={index}
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: processBold(trimmed) }}
               />
            );
         })}
      </div>
   );
};

// --- Main Page Component ---
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
         setError("Failed to generate plan. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
         >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
               {/* Header Section */}
               <div className="bg-white pt-8 pb-4 px-8 text-center">
                  <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
                     Education Plan Generator
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                     Create AI-powered patient instructions in seconds
                  </p>
               </div>

               <div className="p-8 pt-4">
                  <form onSubmit={handleSubmit} className="space-y-6">
                     {/* Patient Condition Input */}
                     <InputField
                        label="Patient Condition"
                        placeholder="e.g., Type 2 Diabetes"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        helperText="Helper description has your patient condition"
                        icon={
                           <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                           </svg>
                        }
                     />

                     {/* Topic Input */}
                     <InputField
                        label="Education Topic"
                        placeholder="e.g., Monitoring Blood Glucose"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        helperText="Helper description has couned monitoring glucose"
                        icon={
                           <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                           </svg>
                        }
                     />

                     {/* Audience Level Selector (Toggle Cards) */}
                     <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 ml-1">
                           Audience Level
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {/* Option 1: Simple English */}
                           <AudienceOption
                              title="Simple English"
                              description="Simple English can comes on language stops."
                              isSelected={educationLevel === "Simple"}
                              onClick={() => setEducationLevel("Simple")}
                              icon={
                                 <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={1.5}
                                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                 </svg>
                              }
                           />

                           {/* Option 2: Medical Detail */}
                           <AudienceOption
                              title="Medical Detail"
                              description="Medical Detail can comes on caduce in technology."
                              isSelected={educationLevel === "Detailed"}
                              onClick={() => setEducationLevel("Detailed")}
                              icon={
                                 <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={1.5}
                                       d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    />
                                 </svg>
                              }
                           />
                        </div>
                     </div>

                     {/* Submit Button */}
                     <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white transition-all duration-200 ${
                           isLoading
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                        }`}
                     >
                        {isLoading ? (
                           <>
                              <svg
                                 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                 fill="none"
                                 viewBox="0 0 24 24"
                              >
                                 <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                 ></circle>
                                 <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                 ></path>
                              </svg>
                              Generating...
                           </>
                        ) : (
                           <>
                              Generate Plan
                              <svg
                                 className="ml-2 w-4 h-4"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                 />
                              </svg>
                           </>
                        )}
                     </motion.button>
                  </form>
               </div>
            </div>

            {/* Error Notification */}
            <AnimatePresence>
               {error && (
                  <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     exit={{ opacity: 0, height: 0 }}
                     className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
                  >
                     <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                     >
                        <path
                           fillRule="evenodd"
                           d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                           clipRule="evenodd"
                        />
                     </svg>
                     <span className="text-sm font-medium">{error}</span>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Results Card */}
            <AnimatePresence>
               {generatedPlan && (
                  <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 40 }}
                     transition={{ delay: 0.1 }}
                     className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-4 border-b border-blue-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                           <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                           </svg>
                           Generated Guide
                        </h2>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-md uppercase tracking-wide">
                           {educationLevel} Mode
                        </span>
                     </div>
                     <div className="p-8">
                        <PlanRenderer text={generatedPlan} />
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </div>
   );
};

export default DashboardPage;

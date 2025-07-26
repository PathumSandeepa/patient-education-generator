"use client";

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const DashboardPage = () => {
    <<<<<<< HEAD
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-12">
            <motion.div
                className="max-w-3xl mx-auto"
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
                            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                                Patient Condition
                            </label>
                            <input
                                id="condition"
                                type="text"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                placeholder="e.g., Diabetes"
                            />
                        </div>
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                                Education Topic
                            </label>
                            <input
                                id="topic"
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                placeholder="e.g., Monitoring Glucose"
                            />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">Audience Level</div>
                            <div className="flex gap-4">
                                {["Simple", "Detailed"].map((level) => (
                                    <label
                                        key={level}
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer ${
                                            educationLevel === level
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="educationLevel"
                                            value={level}
                                            checked={educationLevel === level}
                                            onChange={(e) => setEducationLevel(e.target.value)}
                                            className="hidden"
                                        />
                                        {level === "Simple" ? "Simple English" : "Medical Detail"}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileTap={{ scale: 0.96 }}
                            className="mt-2 inline-block px-5 py-2.5 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:bg-gray-300"
                        >
                            {isLoading ? "Loading..." : "Generate Plan"}
                        </motion.button>
                    </form>
                </div>

                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            className="flex justify-center mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            className="text-center text-red-500 font-medium mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {generatedPlan && (
                        <motion.div
                            className="mt-10 bg-white border border-blue-100 p-6 rounded-xl shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold text-blue-600 mb-3">Generated Plan</h2>
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {generatedPlan}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
=======
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-12">
            <motion.div
                className="max-w-3xl mx-auto"
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
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
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
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
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
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer ${
                                            educationLevel === level
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
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
                            className="mt-2 inline-block px-5 py-2.5 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:bg-gray-300"
                        >
                            {isLoading ? "Loading..." : "Generate Plan"}
                        </motion.button>
                    </form>
                </div>

                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            className="flex justify-center mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            className="text-center text-red-500 font-medium mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {generatedPlan && (
                        <motion.div
                            className="mt-10 bg-white border border-blue-100 p-6 rounded-xl shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold text-blue-600 mb-3">
                                Generated Plan
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {generatedPlan}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
>>>>>>> 20ca59e ([MEDGEMMA-06] feat: implement full plan generation flow with mocked backend response and nav bar and dashboard UI enhanced)
};

export default DashboardPage;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const images = [
   "/login-page-images/pexels-artempodrez-5726807.jpg",
   "/login-page-images/pexels-artempodrez-6823510.jpg",
   "/login-page-images/pexels-cottonbro-5473955.jpg",
   "/login-page-images/pexels-cottonbro-7580247.jpg",
   "/login-page-images/pexels-googledeepmind-18069423.jpg",
   "/login-page-images/pexels-tara-winstead-7722680.jpg",
   "/login-page-images/pexels-yankrukov-5480247.jpg",
];

const LoginPage = () => {
   const googleLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
   const [index, setIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setIndex((prev) => (prev + 1) % images.length);
      }, 10000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
         <div className="w-full max-w-5xl h-[500px] mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 relative hidden md:block">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={index}
                     className="absolute inset-0 w-full h-full"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 1 }}
                  >
                     <Image
                        src={images[index]}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        priority
                     />
                  </motion.div>
               </AnimatePresence>
            </div>

            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-center">
               <h1 className="text-3xl font-bold text-blue-600 mb-4">
                  Welcome to PatientPlan
               </h1>
               <p className="text-gray-600 mb-8">
                  Sign in to access your dashboard and generate plans.
               </p>
               <a
                  href={googleLoginUrl}
                  className="flex items-center gap-3 bg-white border border-gray-300 shadow-sm px-6 py-3 rounded-md text-gray-800 font-semibold hover:bg-gray-50 transition"
               >
                  <FcGoogle className="w-6 h-6" />
                  Sign in with Google
               </a>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;

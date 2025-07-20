import React from "react";

const LoginPage = () => {
   const googleLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;

   return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
         <div className="p-8 bg-white shadow-md rounded-lg text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome</h1>
            <p className="mb-6 text-gray-600">Please sign in to continue</p>
            <a
               href={googleLoginUrl}
               className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
               Sign in with Google
            </a>
         </div>
      </div>
   );
};

export default LoginPage;

"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { RootState, AppDispatch } from "@/store/store";
import { clearAuth } from "@/store/authSlice";

export function Navbar() {
   const { isAuthenticated, user } = useSelector(
      (state: RootState) => state.auth
   );
   const dispatch = useDispatch<AppDispatch>();
   const router = useRouter();

   const handleLogout = async () => {
      try {
         await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
            {},
            {
               withCredentials: true,
            }
         );
         dispatch(clearAuth());
         router.push("/login");
      } catch (error) {
         console.error("Failed to log out", error);
      }
   };

   return (
      <nav className="w-full bg-white shadow-md">
         <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
               PatientPlan
            </Link>
            <div>
               {isAuthenticated && user ? (
                  <div className="flex items-center gap-4">
                     <span className="text-gray-700">Welcome, {user.name}</span>
                     <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                     >
                        Logout
                     </button>
                  </div>
               ) : (
                  <Link
                     href="/login"
                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                     Login
                  </Link>
               )}
            </div>
         </div>
      </nav>
   );
}

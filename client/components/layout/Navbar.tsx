"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RootState, AppDispatch } from "@/store/store";
import { clearAuth } from "@/store/authSlice";
import { User2 } from "lucide-react";

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
            { withCredentials: true }
         );
         dispatch(clearAuth());
         router.push("/login");
      } catch (error) {
         console.error("Logout failed", error);
      }
   };

   return (
      <nav className="w-full bg-white shadow-sm border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
               href="/"
               className="text-2xl font-extrabold text-blue-600 tracking-tight"
            >
               PatientPlan
            </Link>

            {isAuthenticated && user ? (
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                     <User2 className="w-4 h-4" />
                     <span className="truncate max-w-[140px]">{user.name}</span>
                  </div>
                  <button
                     onClick={handleLogout}
                     className="text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                  >
                     Logout
                  </button>
               </div>
            ) : (
               <Link
                  href="/login"
                  className="text-sm px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
               >
                  Login
               </Link>
            )}
         </div>
      </nav>
   );
}

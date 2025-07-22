"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

import { setUser, clearAuth } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";

const protectedRoutes = ["/dashboard"];

export function AuthChecker({ children }: { children: React.ReactNode }) {
   const dispatch = useDispatch<AppDispatch>();
   const { isAuthenticated, isLoading } = useSelector(
      (state: RootState) => state.auth
   );
   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await axios.get(
               `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
               {
                  withCredentials: true,
               }
            );
            dispatch(setUser(response.data));
         } catch {
            dispatch(clearAuth());
         }
      };
      checkAuth();
   }, [dispatch]);

   useEffect(() => {
      if (isLoading) {
         return;
      }

      const isProtectedRoute = protectedRoutes.includes(pathname);

      if (!isAuthenticated && isProtectedRoute) {
         router.push("/login");
      }
   }, [isAuthenticated, isLoading, router, pathname]);

   if (isLoading) {
      return (
         <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
         </div>
      );
   }

   return <>{children}</>;
}

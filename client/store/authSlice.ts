import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
   id: string;
   email: string;
   name: string;
   picture?: string;
}

interface AuthState {
   isAuthenticated: boolean;
   user: User | null;
   isLoading: boolean;
}

const initialState: AuthState = {
   isAuthenticated: false,
   user: null,
   isLoading: true,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<User>) => {
         state.isAuthenticated = true;
         state.user = action.payload;
         state.isLoading = false;
      },
      clearAuth: (state) => {
         state.isAuthenticated = false;
         state.user = null;
         state.isLoading = false;
      },
   },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
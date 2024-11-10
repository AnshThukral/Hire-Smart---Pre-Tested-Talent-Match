import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Initial state
  },
  reducers: {
    // Action to set the user
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },

    // Optionally, you can add more actions (e.g., logout)
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from localStorage on logout
    },
  },
});

// Export actions
export const { setUser, clearUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

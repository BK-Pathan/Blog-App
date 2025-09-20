import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: false,   // ✅ authStatus ke liye field add kar diya
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.status = true;   // ✅ login pe true
    },
    logout: (state) => {
      state.user = null;
      state.status = false;  // ✅ logout pe false
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

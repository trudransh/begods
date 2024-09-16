import { createSlice } from '@reduxjs/toolkit';

// Initialize state from local storage safely
const storedAuth = typeof window !== 'undefined' && localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null;

const initialState = {
  isAuthenticated: storedAuth ? storedAuth.isAuthenticated : false,
  user: storedAuth ? storedAuth.user : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Action to handle side effects (localStorage)
export const { setUser, logoutUser } = authSlice.actions;

export const setUserAndStore = (user) => (dispatch) => {
  console.log("Setting user and storing in localStorage:", user);
  dispatch(setUser(user));
  localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user }));
};

export const logoutUserAndClear = () => (dispatch) => {
  dispatch(logoutUser());
  localStorage.removeItem('auth');
  // window.location.href = '/admin/login'; 
};

export default authSlice.reducer;

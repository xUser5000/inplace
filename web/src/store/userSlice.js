import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import i18n from 'i18next'; // Import i18n instance directly

export const loginUser = createAsyncThunk('user/loginUser', async (userCredentials) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log in');
    }

    const responseData = await response.json();
    localStorage.setItem('user', JSON.stringify(responseData));
    return responseData;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
});

export const registerUser = createAsyncThunk('user/registerUser', async (userCredentials) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || 'Failed to register user');
    }

    const responseData = await response.json();
    console.log(responseData);
    localStorage.setItem('user', JSON.stringify(responseData));
    return responseData;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null; // Reset error when login is successful
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || i18n.t('Failed to log in');
      });
  }
});

export default userSlice.reducer;

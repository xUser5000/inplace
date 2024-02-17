import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import i18n from 'i18next'; // Import i18n instance directly


export const loginUser = createAsyncThunk('user/loginUser', async (userCredentials) => {
  // TODO: Change login api provided by backend
  const request = await axios.get(`...`, userCredentials);
  const response = await request.data.data;
  console.log(response);
  localStorage.setItem('user', JSON.stringify(response));
  return response;
});


export const registerUser = createAsyncThunk('user/registerUser', async (userCredentials) => {
  const request = await axios.get(`...`, userCredentials);
  const response = await request.data.data;
  console.log(response);
  localStorage.setItem('user', JSON.stringify(response));
  return response;
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
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 401') {

          state.error = i18n.t('Access Denied! Invalid Credentials');


        } else {
          state.error = action.error.message;
        }
      });
  }
});

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

export const languageSlice = createSlice({
  name: 'lng',
  initialState: {
    lng: 'ar'
  },
  reducers: {
    updateLanguage(state, action) {
        state.lng = action.payload;
      },
  }
})

// Action creators are generated for each case reducer function
export const { updateLanguage } = languageSlice.actions

export default languageSlice.reducer
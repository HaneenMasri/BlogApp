import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    pageTitle: "nav.home",
    isLoading: false,
  },

  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    setLoading: (state, action) => {
  state.isLoading = action.payload;
},
  },
});

export const { setPageTitle } = uiSlice.actions;
export default uiSlice.reducer;
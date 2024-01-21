import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FormSignUpData } from '../../types/Form';

type LoginSliceState = FormSignUpData;
const initialState: FormSignUpData = {
  email: '',
  name: '',
};

const LoginSlice = createSlice({
  initialState,
  name: 'LoginSlice',
  reducers: {
    login(state, action: PayloadAction<FormSignUpData>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const { login } = LoginSlice.actions;
export const selectLogin = (state: { LoginSlice: LoginSliceState }) => state.LoginSlice;
export default LoginSlice.reducer;

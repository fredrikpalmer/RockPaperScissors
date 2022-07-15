import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

// Define a type for the slice state
interface UserState {
  id: number | null;
  name: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  id: null,
  name: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{id: number; name: string}>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const {setUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

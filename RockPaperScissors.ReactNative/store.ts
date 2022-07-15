import {configureStore} from '@reduxjs/toolkit';
import gameReducer from './game/gameSlice';
import userReducer from './game/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

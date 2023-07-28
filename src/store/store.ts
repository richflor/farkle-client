import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { socketReducer } from "./socketSlice";
import { Socket, io } from "socket.io-client";

const SERVER_URL:string = import.meta.env.VITE_SERVER_URL;
const socket = io(SERVER_URL);

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { socket }
      }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type thunkApi = {
  dispatch: AppDispatch
  state: RootState
  extra: {
    socket: Socket
  }
}
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slicers/userSlice";
import { socketEvents } from "./models/SocketIo";
import { Socket, io } from "socket.io-client";
import { gameReducer } from "./slicers/gameSlice";

const SERVER_URL: string = import.meta.env.VITE_SERVER_URL;
const socket = io(SERVER_URL, {
  autoConnect: false,
  reconnectionAttempts: 5
});


export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer
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
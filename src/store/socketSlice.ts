import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { socketEvents, loginInfo } from "../models/SocketIo";

const SERVER_URL: string = import.meta.env.VITE_SERVER_URL;
const socket = io(SERVER_URL);
socket.on("connect", () => {
    console.log("is connected to socket")
});

const socketSlice = createSlice({
    name: "socket",
    initialState: socket,
    reducers: {
        login: (state, action: PayloadAction<loginInfo>) => {
            state.emit(socketEvents.login, action.payload)
        },
        logout: (state) => {
            state.emit(socketEvents.disconnect)
        }
    }
})

export const { login, logout } = socketSlice.actions;

export const socketReducer = socketSlice.reducer
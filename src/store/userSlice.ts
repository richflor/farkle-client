import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginInfo, loginResponse, socketPayload } from "../models/SocketIo";
import { Socket } from "socket.io-client";
import { socketEvents } from "../models/SocketIo";
import { thunkApi } from "./store";

// if connected on va sur la page game

interface User {
    value:loginInfo,
    connected:boolean,
    error:null|number
}

const initUser = {
    value: {
        name: "",
        roomId: ""
    },
    status: "",
    connected: false,
    error: null
}

const SERVER_URL: string = import.meta.env.VITE_SERVER_URL;

export const login = createAsyncThunk<User, loginInfo, thunkApi>("login", async (user:loginInfo, thunkApi) => {
    return new Promise<User>((resolve, reject) => {
        const socket:Socket = thunkApi.extra.socket
        socket.on("connect", () => {
            console.log("is connected to socket")
        });
        socket.emit(socketEvents.login, user);
        let err:number;
        socket.on(socketEvents.responseLogin, (payload:loginResponse) => {
            err = payload.reason;
            if (err !== 0) reject(err);
            resolve({value: user, connected:payload.state, error:payload.reason });
        })
    })
})

const userSlice = createSlice({
    name: "user",
    initialState: initUser,
    reducers: {
        setLoginInfo: (state, action: PayloadAction<loginInfo>) => {
            state.value = action.payload;
        },
        unsetLogoutInfo: (state) => {
            state = initUser;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = "loading";
                // do action
            })
            .addCase(login.fulfilled, (state, action)=> {
                state.status = "succeeded";
                state.connected = action.payload.connected;
                state.value = action.payload.value;
            })
            .addCase(login.rejected, (state, action)=> {
                state.status = "failed";
                // state.error = search error from code number
            })
    },
})

// export const { setLoginInfo, unsetLogoutInfo } = userSlice.actions;

export const userReducer = userSlice.reducer
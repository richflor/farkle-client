import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginInfo, loginResponse } from "../models/SocketIo";
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
    } as loginInfo,
    status: "not_connected",
    connected: false,
    error: null
}

export const socketLogin = createAsyncThunk<User, loginInfo, thunkApi>("login", async (user:loginInfo, thunkApi) => {
    return new Promise<User>((resolve, reject) => {
        const socket = thunkApi.extra.socket;

        socket.emit(socketEvents.login, user);
        let err:number;
        socket.on(socketEvents.responseLogin, (payload:loginResponse) => {
            err = payload.reason;
            if (err !== 0) reject(err);
            // thunkApi.dispatch(setLoginInfo())
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
        .addCase(socketLogin.pending, (state) => {
            state.status = "connecting";
            // do action
        })
        .addCase(socketLogin.fulfilled, (state, action)=> {
            state.status = "connecting_success";
            state.connected = action.payload.connected;
            state.value = action.payload.value;
        })
        .addCase(socketLogin.rejected, (state)=> {
            state.status = "connecting_failed";
            // state.error = search error from code number
        })
    },
})

// export const { setLoginInfo, unsetLogoutInfo } = userSlice.actions;

export const userReducer = userSlice.reducer;
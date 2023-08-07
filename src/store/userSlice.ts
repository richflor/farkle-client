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

const initUser = ()=> {
    return {
        value: {
            name: "",
            roomId: ""
        } as loginInfo,
        userTurnToplay: false,
        reroll: false,
        status: "not_connected",
        connected: false,
        error: null
    }
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

export const socketUserReady = createAsyncThunk<void, void, thunkApi>("readyToPlay", async (arg , thunkApi) => {
    return new Promise<void>((resolve, reject) => {
        const socket = thunkApi.extra.socket;
        socket.emit(socketEvents.ready);
        resolve();
    })
})

export const socketGetPoints = createAsyncThunk<void, boolean, thunkApi>("getPoints", async (getPoints , thunkApi) => {
    return new Promise<void>((resolve, reject) => {
        const socket = thunkApi.extra.socket;

        socket.emit(socketEvents.getPoints, { state: getPoints})
        resolve();
    })
})

export const socketUserPlay = createAsyncThunk<boolean, void, thunkApi>("userPlay", async (arg, thunkApi) => {
    return new Promise<boolean>((resolve, reject) => {
        const socket = thunkApi.extra.socket;

        socket.on(socketEvents.reroll, ()=> {
            resolve(true);
        })

        socket.on(socketEvents.turnLoss, ()=> {
            resolve(false);
        })
    })
})

const userSlice = createSlice({
    name: "user",
    initialState: initUser(),
    reducers: {
        setLoginInfo: (state, action: PayloadAction<loginInfo>) => {
            state.value = action.payload;
        },
        unsetLogoutInfo: (state) => {
            state = initUser();
            console.log("user unset")
            console.log(initUser())
            console.log(state)
            console.log("end user unset")
        },
        setPlayerTurn: (state, action: PayloadAction<boolean>) => {
            state.userTurnToplay = action.payload;
        },
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
            console.log("user created")
            console.log(state.value)
        })
        .addCase(socketLogin.rejected, (state)=> {
            state.status = "connecting_failed";
            // state.error = search error from code number
        })
        .addCase(socketUserReady.fulfilled, (state)=> {
            state.status = "user ready";
        })
        .addCase(socketUserReady.rejected, (state)=> {
            state.status = "failed noticing server for user ready";
        })
        .addCase(socketUserPlay.fulfilled, (state, action)=> {
            if (action.payload) {
                state.status = "user can reroll";
                state.reroll = true;
            } else {
                state.status = "is next player turn";
                state.reroll = false;
            }
        })
    },
})

export const { setLoginInfo, unsetLogoutInfo, setPlayerTurn } = userSlice.actions;

export const userReducer = userSlice.reducer;
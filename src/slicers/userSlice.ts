import { createSlice, PayloadAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import { loginInfo, loginResponse } from "../models/SocketIo";
import { socketEvents } from "../models/SocketIo";
import { thunkApi } from "../store";

// if connected on va sur la page game

interface User {
    value: loginInfo,
    connected: boolean,
    error: null | number
}

const initUser = () => {
    return {
        value: {
            name: "",
            roomId: ""
        } as loginInfo,
        canPlay: false,
        status: "not_connected",
        connected: false,
        error: null
    }
}

export const socketLogin = createAsyncThunk<User, loginInfo, thunkApi>("login", async (user: loginInfo, thunkApi) => {
    return new Promise<User>((resolve, reject) => {
        const socket = thunkApi.extra.socket;

        if (!socket.connected) {
            socket.connect();
        }

        socket.on(socketEvents.connectToServer, () => {
            console.log("is connected to socket");
        });

        socket.on(socketEvents.connectError, (e) => {
            console.log("error connection socket : " + e);
            reject(e);
        });

        socket.emit(socketEvents.login, user);
        let err: number;
        socket.on(socketEvents.responseLogin, (payload: loginResponse) => {
            err = payload.reason;
            if (err !== 0) reject(err);
            resolve({ value: user, connected: payload.state, error: payload.reason });
        })
    })
})

export const socketUserReady = createAsyncThunk<void, void, thunkApi>("readyToPlay", async (_arg, thunkApi) => {
    return new Promise<void>((resolve, _reject) => {
        const socket = thunkApi.extra.socket;
        socket.emit(socketEvents.ready);
        resolve();
    })
})

export const socketUserPlay = createAsyncThunk<void, boolean, thunkApi>("userPlay", async (getPoints, thunkApi) => {
    return new Promise<void>((resolve, _reject) => {
        const socket = thunkApi.extra.socket;

        socket.emit(socketEvents.getPoints, { state: getPoints });
        resolve();
    })
})

export const socketCanUserPlay = createAsyncThunk<boolean, void, thunkApi>("userCanPlay", async (_arg, thunkApi) => {
    return new Promise<boolean>((resolve, _reject) => {
        const socket = thunkApi.extra.socket;

        socket.on(socketEvents.reroll, () => {
            console.log("can reroll")
            resolve(true);
        })

        socket.on(socketEvents.turnLoss, () => {
            console.log("can't reroll")
            resolve(false);
        })
    })
})

export const socketDisconnect = createAsyncThunk<void, void, thunkApi>("disconnect", async (_arg, thunkApi) => {
    return new Promise<void>((resolve, _reject) => {
        const socket = thunkApi.extra.socket;
        socket.disconnect();
        resolve();
    })
})

const userSlice = createSlice({
    name: "user",
    initialState: initUser(),
    reducers: {
        setLoginInfo: (state, action: PayloadAction<loginInfo>) => {
            state.value = action.payload;
        },
        unsetLogoutInfo: (_state) => {
            console.log("user unset")
            return initUser();
        },
        setPlayerTurn: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.status = "user can start to play";
                console.log("can start playing")
            }
            state.canPlay = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(socketLogin.pending, (state) => {
                state.status = "connecting";
                // do action
            })
            .addCase(socketLogin.fulfilled, (state, action) => {
                state.status = "login_success";
                state.connected = action.payload.connected;
                state.value = action.payload.value;
                console.log("user created")
                console.log(current(state))
            })
            .addCase(socketLogin.rejected, (state, action) => {
                state.status = "login_failed";
                console.log("login error :" + action.error.message)
                // state.error = search error from code number
            })
            .addCase(socketUserReady.fulfilled, (state) => {
                state.status = "user ready";
            })
            .addCase(socketUserReady.rejected, (state) => {
                state.status = "failed noticing server for user ready";
            })
            .addCase(socketCanUserPlay.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = "user can reroll";
                    state.canPlay = true;
                } else {
                    state.status = "is next player turn";
                    state.canPlay = false;
                }
            })
            .addCase(socketDisconnect.fulfilled, (state) => {
                state.status = "user disconnected manually"
            })
    },
})

export const { setLoginInfo, unsetLogoutInfo, setPlayerTurn } = userSlice.actions;

export const userReducer = userSlice.reducer;
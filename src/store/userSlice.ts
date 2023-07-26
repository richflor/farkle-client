import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginInfo, loginResponse, socketPayload } from "../models/SocketIo";
import { Socket } from "socket.io-client";
import { socketEvents } from "../models/SocketIo";

// if connected on va sur la page game
const initUser = {
    value: {
        name: "",
        roomId: ""
    } as loginInfo,
    status: "",
    connected: false
}
const SERVER_URL:string = import.meta.env.VITE_SERVER_URL;
// const socket = io(SERVER_URL);

export const connectToServer = createAsyncThunk("connectToServer", async (socket:Socket) => {
    socket.on(socketEvents.connectToServer, () => {
        console.log("is connected to socket")
    });
    socket.on(socketEvents.connectError, err => {
        console.log(err);
        // socket.connect();
        throw err;
    })
    socket.on(socketEvents.disconnect, reason => console.log(reason))
})

export const login = createAsyncThunk("login", async (socket:Socket, payload:socketPayload ) => {
    return new Promise<loginResponse>((resolve, reject) => {
        socket.emit(socketEvents.login, payload);
        let res:number;
        socket.on(socketEvents.responseLogin, (payload:loginResponse) => {
            res = payload.reason;
            if (res !== 0) reject(res);
            resolve(payload);
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
                state.connected = action.payload.state;
            })
            .addCase(login.rejected, (state, action)=> {
                state.status = "failed";
                // state.error = search error from code number
            })
    },
})

export const { setLoginInfo, unsetLogoutInfo } = userSlice.actions;

export const userReducer = userSlice.reducer
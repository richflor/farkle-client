import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Player, Room, socketEvents, subRoom } from "../models/SocketIo";
import { thunkApi } from "../store/store";

const initGame = {
    ongoing:false,
    players:[] as Player[],
    userTurnToplay: false,
    status: "idle"
}

export const socketUserReady = createAsyncThunk<void, void, thunkApi>("readyToPlay", async (arg , thunkApi) => {
    return new Promise<void>((resolve, reject) => {
        const socket = thunkApi.extra.socket;
        socket.emit(socketEvents.ready);
        resolve();
    })
})

export const socketUpdateRoom = createAsyncThunk<Room, void, thunkApi>("updateRoom", async (arg , thunkApi) => {
    return new Promise<Room>((resolve, reject) => {
        const socket = thunkApi.extra.socket;
        
        socket.on(socketEvents.gameState, (res:any)=> {
            console.log("room updated")
            const payload:Room = res.payload
            // enlever le 0 pour 2nd itération
            console.log(res);
            resolve(payload);
        })

    })
})

const filterPlayers = (room:Room):[Player[],subRoom] => {
    const players:Player[] = [];
    const subRoom:subRoom = {selectPositionInGame:0, nbUserInRoom:0, inGame:true, nbUserReady:0};
    for (const [key, value] of Object.entries(room)) {
        if (typeof value === "object") {
            players.push(value)
        } else {
            switch (key) {
                case "selectPositionInGame":
                    if (typeof value === "number") subRoom.selectPositionInGame = value;
                    break;
                case "nbUserInRoom":
                    if (typeof value === "number") subRoom.nbUserInRoom = value;
                    break;
                case "inGame":
                    if (typeof value === "boolean") subRoom.inGame = value;
                    break;
                case "nbUserReady":
                    if (typeof value === "number") subRoom.nbUserInRoom = value;
                    break;
                default:
                    break;
            }
        }
      }
    return [players, subRoom];
}

const gameSlice = createSlice({
    name: "game",
    initialState: initGame,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(socketUpdateRoom.pending, (state) => {
            state.status = "loading";
            // do action
        })
        .addCase(socketUpdateRoom.fulfilled, (state, action)=> {
            state.status = "idle";
            const [players, subRoom] = filterPlayers(action.payload);
            state.players = players;
            state.ongoing = subRoom.inGame;
        })
        .addCase(socketUpdateRoom.rejected, (state)=> {
            state.status = "failed_loading";
            // state.error = search error from code number
        })
    }
})

export const gameReducer = gameSlice.reducer;
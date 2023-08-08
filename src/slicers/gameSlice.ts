import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { Player, Room, socketEvents, subRoom } from "../models/SocketIo";
import { thunkApi } from "../store/store";
import { setPlayerTurn } from "../store/userSlice";

const initGame = () => {
    return {
        ongoing:false,
        players:[] as Player[],
        status: "idle"
    }
}

export const socketUpdateRoom = createAsyncThunk<Room, void, thunkApi>("updateRoom", async (arg , thunkApi) => {
    return new Promise<Room>((resolve, reject) => {
        const socket = thunkApi.extra.socket;
        
        socket.on(socketEvents.gameState, (res:any)=> {
            const payload:Room = res.payload
            
            const {user} = thunkApi.getState();
            const userPlayState = filterPlayers(payload).players.find(player => player.name === user.value.name);

            if (userPlayState?.myTurn) {
                thunkApi.dispatch(setPlayerTurn(true));
            } else {
                thunkApi.dispatch(setPlayerTurn(false));
            }

            resolve(payload);
        })

    })
})



const filterPlayers = (room:Room):{players:Player[],subRoom: subRoom} => {
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
    return {players: players, subRoom: subRoom};
}

const gameSlice = createSlice({
    name: "game",
    initialState: initGame(),
    reducers:{
        resetGame: (state) => {
            state = initGame();
            console.log("reset game")
        }
    },
    extraReducers(builder){
        builder
        .addCase(socketUpdateRoom.fulfilled, (state, action)=> {
            state.status = "game state updated";
            const {players, subRoom} = filterPlayers(action.payload);
            state.players = players;
            state.ongoing = subRoom.inGame;
            console.log("room updated")
            console.log(current(state))
        })
        .addCase(socketUpdateRoom.rejected, (state)=> {
            state.status = "game state failed updating";
            // state.error = search error from code number
        })
    }
})

export const { resetGame } = gameSlice.actions

export const gameReducer = gameSlice.reducer;
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { Player, Room, endGameState, socketEvents, subRoom } from "../models/SocketIo";
import { thunkApi } from "../store";
import { setPlayerTurn } from "./userSlice";

interface Game {
    ongoing: boolean
    players: Player[]
    status: string
    winner: Player | null
}

const initGame = () => {
    return {
        ongoing: false,
        players: [] as Player[],
        status: "idle",
        winner: null
    } as Game
}

export const socketUpdateRoom = createAsyncThunk<Room, void, thunkApi>("updateRoom", async (arg, thunkApi) => {
    return new Promise<Room>((resolve, reject) => {
        const socket = thunkApi.extra.socket;

        socket.on(socketEvents.gameState, (res: any) => {
            const payload: Room = res.payload

            const { user } = thunkApi.getState();
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

export const socketGameEnd = createAsyncThunk<Player, void, thunkApi>("gameEnd", async (arg, thunkApi) => {
    return new Promise<Player>((resolve, reject) => {
        const socket = thunkApi.extra.socket;

        socket.on(socketEvents.gameEnd, (res:endGameState) => {
            console.log("win")
            console.log(res);
            const winner = res.payload;
            if(winner) resolve(winner);
            reject(res.reason);
        })
    })
})

const filterPlayers = (room: Room): { players: Player[], subRoom: subRoom } => {
    const players: Player[] = [];
    const subRoom: subRoom = { selectPositionInGame: 0, nbUserInRoom: 0, inGame: true, nbUserReady: 0 };
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
    return { players: players, subRoom: subRoom };
}

const gameSlice = createSlice({
    name: "game",
    initialState: initGame(),
    reducers: {
        resetGame: (state) => {
            console.log("reset game");
            return state = initGame();
        }
    },
    extraReducers(builder) {
        builder
            .addCase(socketUpdateRoom.fulfilled, (state, action) => {
                state.status = "game state updated";
                const { players, subRoom } = filterPlayers(action.payload);
                state.players = players;
                state.ongoing = subRoom.inGame;
                console.log("room updated")
                console.log(current(state))
            })
            .addCase(socketUpdateRoom.rejected, (state) => {
                state.status = "game state failed updating";
                // state.error = search error from code number
            })
            .addCase(socketGameEnd.fulfilled, (state, action) => {
                state.status = "game ended properly";
                state.winner = action.payload;
            })
            .addCase(socketGameEnd.rejected, (state, action) => {
                state.status = "game ended prematurely";
            })
    }
})

export const { resetGame } = gameSlice.actions

export const gameReducer = gameSlice.reducer;
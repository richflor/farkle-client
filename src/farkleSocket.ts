import { socketEvents, loginInfo, socketPayload } from "./models/SocketIo";
import { Socket, io } from "socket.io-client";

type farkleMethod = (socket:Socket, payload:socketPayload) => void

interface FarkleSocket {
    [key:string]:farkleMethod
}

export const farkleSocket:FarkleSocket = {
    // should be loginInfo
    login: (socket, payload:socketPayload) => {
        socket.emit(socketEvents.login, payload)
    },
    logout: (socket) => {
        socket.emit(socketEvents.disconnect)
    }
}

export class socketClient {
    socket:Socket|null = null

    constructor (SERVER_URL?:string) {
        if (!this.socket && SERVER_URL) {
            this.connect(SERVER_URL);
        }
    }

    connect(SERVER_URL:string) {
        this.socket = io(SERVER_URL)
        this.socket.on("connect", () => {
            console.log("is connected to socket")
        });
    }
}
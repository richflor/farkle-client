import { socketEvents, loginInfo, socketPayload } from "./models/SocketIo";
import { Socket } from "socket.io-client";

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
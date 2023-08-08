import { useDispatch, useSelector } from 'react-redux'
import { loginInfo } from "./models/SocketIo";
import { farkleSocket } from "./farkleSocket";
import { Socket } from "socket.io-client";

// const dispatch = useDispatch();
// // check documentation root state return of
// const socket = useSelector((state:any)=> state.socket)

export const checkLength = ((value: string, limit:number): boolean => {
  if (value.length >= limit) return true
  return false
})

// export const connect = (dispatch:any, socket:any, { name, roomId }: loginInfo) => {
//   dispatch(setLoginInfo({
//     name: name,
//     roomId: roomId,
//   }))
//   farkleSocket.login(socket, { name, roomId })
// }
import { Container } from "@mui/material";
import { Players } from "./game/players/Players";
import { PlayingInterface } from "./game/interface/PlayingInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { socketUpdateRoom } from "../slicers/gameSlice";
import { useEffect } from "react";
import { socketCanUserPlay } from "../store/userSlice";


export default function Game () {

  const dispatch = useDispatch<AppDispatch>();

  const room = useSelector((state:RootState)=> state.game);
  const user = useSelector((state:RootState)=> state.user);
  const currentPlayer = room.players.find(player => player.myTurn);
  
  useEffect(()=>{
    dispatch(socketUpdateRoom());
    console.log("use eff room")
  },[room])

  useEffect(()=>{
    dispatch(socketCanUserPlay());
    console.log("use eff canPlay")
    console.log(currentPlayer?.name)
  },[currentPlayer])

  
  return (
    <Container 
    maxWidth="lg" 
    sx={{ 
      height: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center"
    }}>
      <Players players={room.players}/>
      <PlayingInterface player={currentPlayer} canPlay={user.canPlay} start={room.ongoing}/>
    </Container>
  );
}

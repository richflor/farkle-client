import { Container } from "@mui/material";
import { Players } from "./game/players/Players";
import { PlayingInterface } from "./game/interface/PlayingInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { socketUpdateRoom } from "../slicers/gameSlice";
import { useEffect } from "react";


export default function Game () {

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(()=>{
    dispatch(socketUpdateRoom());
  })

  const room = useSelector((state:RootState)=> state.game);
  const user = useSelector((state:RootState)=> state.user);
  console.log("game");
  console.log(room);
  console.log(user);
  const currentPlayer = room.players.find(player => player.canPlay);
  
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
      <PlayingInterface player={currentPlayer}/>
    </Container>
  );
}

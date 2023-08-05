import { Container } from "@mui/material";
import { Players } from "./game/players/Players";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { PlayingInterface } from "./game/interface/PlayingInterface";
import { socketUpdateRoom } from "../slicers/gameSlice";

export default function Game () {

  const room = useSelector((state:RootState)=> state.game);
  const gameDispatch = useDispatch<AppDispatch>();
  const currentPlayer = room.players.find(player => player.canPlay);
  gameDispatch(socketUpdateRoom())
  
  // console.log(room)
  return (
    <Container 
    maxWidth="lg" 
    sx={{ 
      height: 1,
      display: "flex",
      alignItems: "center"
    }}>
      <Players players={room.players}/>
      {/* {room.players.length > 0 && <Players players={room.players}/>} */}
      <PlayingInterface player={currentPlayer}/>
  </Container>
  );
}

import { Player } from "../../../models/SocketIo";
import { Box } from "@mui/material";
import { PlayerCard } from "./PlayerCard";

interface prop {
  players:Player[]
}

export function Players ({players}: prop) {
  const content = players.map(player => 
    <PlayerCard key={player.name} score={player.scoreTotal} name={player.name} ready={player.ready2play}  canPlay={player.myTurn}/>
  )
  return (
    <Box sx={{ 
      height: 1/3,
      width:1,
      display: "flex",
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-around"
    }}>
      {content}
    </Box>
  );
}

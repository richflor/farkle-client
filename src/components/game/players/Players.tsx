import { Player } from "../../../models/SocketIo";
import { Box } from "@mui/material";
import { PlayerCard } from "./PlayerCard";

interface prop {
  players:Player[]
}

export function Players ({players}: prop) {
  const content = players.map(player => 
    <PlayerCard score={player.currentScore} name={player.name} ready={player.ready2play} />
  )
  return (
    <Box sx={{ 
      height: 1/2,
      width:1,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-around"
    }}>
      {content}
    </Box>
  );
}

import { Card, Box, Typography } from "@mui/material";
import { Score } from "./Score";
import { Ready } from "./Ready";

interface Player {
  score:number,
  name:string,
  ready:boolean
}

export function PlayerCard ({score, name, ready}: Player) {
  return (
    <Card sx={{ 
      height: "35%",
      width:"25%",
      minWidth: "150px",
      position: "relative"
    }}>
        <Score score={score} />
        <Ready name={name} ready={ready} /> 
    </Card>
  );
}

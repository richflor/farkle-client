import { Card } from "@mui/material";
import { Score } from "./Score";
import { Ready } from "./Ready";

interface Player {
  score:number,
  name:string,
  ready:boolean
  canPlay:boolean
}

export function PlayerCard ({score, name, ready, canPlay}: Player) {

  const handleCanPlay = (e:React.FormEvent<HTMLDivElement>) => {
    const div = e.target as HTMLDivElement;
    if (canPlay) {
      div.classList.add("myTurn");
    } else {
      div.classList.remove("myTurn");
    }
  }

  return (
    <Card 
      sx={{ 
        height: "35%",
        width:"25%",
        minWidth: "150px",
        position: "relative",
        padding: "15px"
      }}
      onChange={(e)=> handleCanPlay(e)}
    >
      <Score score={score} />
      <Ready name={name} ready={ready}/> 
    </Card>
  );
}

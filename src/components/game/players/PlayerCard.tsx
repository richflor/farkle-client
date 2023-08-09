import { Card, Typography } from "@mui/material";
import { Score } from "./Score";
import { Ready } from "./Ready";
import { isUserBG, isUserTxt } from "../../../utilities";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

interface Player {
  score:number,
  name:string,
  ready:boolean
  isPlaying:boolean
}

export function PlayerCard ({score, name, ready, isPlaying}: Player) {
  const userName = useSelector((state:RootState)=> state.user.value.name);
  return (
    <Card 
      sx={{ 
        width:"25%",
        minWidth: "150px",
        position: "relative",
        padding: "15px",
        bgcolor: isUserBG(name, userName)
      }}
      className={isPlaying ? "myTurn" : ""}
    >
        <Score score={score} name={name} userName={userName}/>
        <Ready name={name} ready={ready} userName={userName} />
        <Typography variant="h6" sx={{ color: isUserTxt(name, userName), width: 1, height: 1/2}}>{name}</Typography>
    </Card>
  );
}

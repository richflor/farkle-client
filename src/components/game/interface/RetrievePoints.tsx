import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { socketUserPlay } from "../../../slicers/userSlice";


export interface IAppProps {
  points:number|undefined
  canPlay: boolean | undefined
  start: boolean | undefined
}

export function RetrievePoints ({ points, canPlay, start }: IAppProps) {

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (typeof start !== "undefined") {
      if (start) {
        if (canPlay) {
          dispatch(socketUserPlay(false));
        } else {
          alert("Not your turn")
        }
      } else {
        alert("Game hasn't started yet")
      }
    }
  }

  return (
    <Box>
      <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Typography variant="h3" color="initial">{points ? points : '0'}</Typography>
        <Typography variant="h5" color="initial">Pt</Typography>         
      </Box>
      <Button 
        variant="contained" 
        color="primary"
        onClick={()=> handleClick()}
      >
        Récuperer mes points
      </Button>
    </Box>
  );
}

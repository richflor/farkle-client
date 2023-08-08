import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { socketUserPlay } from "../../../store/userSlice";


export interface IAppProps {
  points:number|undefined
  canPlay: boolean | undefined
}

export function RetrievePoints ({ points, canPlay }: IAppProps) {

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (typeof canPlay !== "undefined"){
      if (canPlay) {
        dispatch(socketUserPlay(false));
      } else {
        alert("Not your turn")
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

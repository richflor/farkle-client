import { Box, Typography } from "@mui/material";
import { isUserTxt } from "../../../utilities";

interface prop {
    score:number
    name:string
    userName:string
}

export function Score ({ score, name, userName }:prop) {
  return (
    <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1, 
        height: 1/2
    }}>
        <Typography variant="h3" sx={{color: isUserTxt(name, userName)}}>{score}</Typography>
        <Typography variant="h5" sx={{color: isUserTxt(name, userName)}}>Pt</Typography>            
    </Box>
  );
}

import { Box, Typography } from "@mui/material";

interface prop {
    score:number
}

export function Score ({ score }:prop) {
  return (
    <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1, 
        height: 1/2
    }}>
        <Typography variant="h3" color="initial">
            {score}
        </Typography>
        <Typography variant="h5" color="initial">
            Pt
        </Typography>            
    </Box>
  );
}

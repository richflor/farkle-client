import { Box, Typography, Button } from "@mui/material";


export interface IAppProps {
  points:number|undefined
}

export function RetrievePoints ({ points }: IAppProps) {
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
        color="secondary"
        >Récuperer mes points
      </Button>
    </Box>
  );
}

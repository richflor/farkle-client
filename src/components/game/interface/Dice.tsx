import { Box } from "@mui/material";


export interface IAppProps {
}

export function Dice (props: IAppProps) {
  return (
    <Box 
      className="ellipse outlineScale"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <img src="/asset/dice6.png" alt="" className="dice"/>
    </Box>
  );
}

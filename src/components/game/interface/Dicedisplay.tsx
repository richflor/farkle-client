import { Box } from "@mui/material";

interface IAppProps {
    dicesArray:number[]
}


export function Dicedisplay ({ dicesArray}: IAppProps) {
    const dices : JSX.Element[] = [];
    dicesArray.map((nbr, dice) => {
        if (nbr) {
            for (let i = 0; i < nbr; i++) {
                dices.push(
                <Box sx={{ height: 1}}><img src={`/asset/dice${dice+1}.png`} alt="dice" className="littleDice"/></Box>)
            }
        } 
    })
  return (
    <Box 
        sx={{
            height: 1/7, 
            width: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
        }}
    >
    {dices}
    </Box>
  );
}


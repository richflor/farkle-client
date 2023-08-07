import { Box } from "@mui/material";

interface IAppProps {
    dicesArray:number[]
}

export function Dicedisplay ({ dicesArray}: IAppProps) {
    const dices : JSX.Element[] = [];
    dicesArray.map((nbr, dice) => {
        if (nbr) {
            for (let i = 0; i < nbr; i++) {
                dices.push(<img src={`/asset/dice${dice+1}.png`} alt="dice" />)
            }
        } 
    })
  return (
    <Box sx={{
        height: 1/3, 
        width: 1,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    }}>
    {dices}
    </Box>
  );
}


import { Box, Typography } from "@mui/material";
import { Dicedisplay } from "./Dicedisplay";


interface DicesResults {
  scoringDices:number[] | undefined,
  remainingDices:number[] | undefined
}

export function DiceResults ({ scoringDices, remainingDices}: DicesResults) {
  const nbrScoringDices = scoringDices?.reduce((acc, val) => acc + val, 0);
  const nbrRemainingDices = remainingDices?.reduce((acc, val) => acc + val, 0);
  return (
    <Box sx={{
      minWidth: "200px",
      width: 1/4,
      height: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "start"
    }}>
      <Typography variant="h6" color="initial">Dés restants {nbrRemainingDices ? nbrRemainingDices : 5 }</Typography>
      {remainingDices && <Dicedisplay dicesArray={remainingDices} />}
      <Typography variant="h6" color="initial">Dés qui ont scoré {nbrScoringDices ? nbrScoringDices : 0 }</Typography>
      {scoringDices && <Dicedisplay dicesArray={scoringDices} />}
    </Box>
  );
}

import { Box } from '@mui/material';
import { DiceResults } from './DiceResults';
import { RetrievePoints } from './RetrievePoints';
import { Dice } from './Dice';
import { Player } from '../../../models/SocketIo';

interface prop {
  player:Player | undefined
}

export function PlayingInterface ({player}: prop) {
  
  return (
    <Box sx={{
      height: 1/2,
      width:1,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <DiceResults scoringDices={player?.scoringDices} remainingDices={player?.remainingDices}/>
      <Dice/>
      <RetrievePoints points={player?.currentScore}/>
    </Box>
  );
}

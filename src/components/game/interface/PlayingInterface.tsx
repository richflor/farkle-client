import { Box } from '@mui/material';
import { DiceResults } from './DiceResults';
import { RetrievePoints } from './RetrievePoints';
import { Dice } from './Dice';
import { Player } from '../../../models/SocketIo';

interface prop {
  player:Player | undefined
  canPlay:boolean | undefined
}

export function PlayingInterface ({player, canPlay}: prop) {
  
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
      <Dice canPlay={canPlay} />
      <RetrievePoints points={player?.currentScore} canPlay={canPlay}/>
    </Box>
  );
}

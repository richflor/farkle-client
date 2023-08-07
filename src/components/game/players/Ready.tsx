import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState, AppDispatch } from '../../../store/store';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { socketUserReady } from '../../../store/userSlice';

interface prop {
    name:string,
    ready: boolean
}

export function Ready ({ name, ready }: prop) {

    const username = useSelector((state:RootState)=> state.user.value.name)

    const gameDispatch = useDispatch<AppDispatch>();

    function readyToPlay(e:React.MouseEvent) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("clickReady")) {
            target.classList.remove("clickReady");
            gameDispatch(socketUserReady());
            console.log("click ready")
        }
    }

    let content:ReactElement;
    if (ready) {
        content = <Typography variant="h6" color="initial" className='playerStatus clickReady bgGreen'>Prêt 💪</Typography>
    } else if (username === name) {
        content = <Typography variant="h6" color="initial" className='playerStatus scaleInOut clickReady' onClick={(e)=> {readyToPlay(e)}}>Attente 💤</Typography>
    } else {
        content = <Typography variant="h6" color="initial" className='playerStatus scaleInOut2 clickReady nohover'>Attente 💤</Typography>
    }
    
    return (
        <Box sx={{ position: "relative", width: 1, height: 1/2}}>
            <Typography variant="h4" color="initial">{name}</Typography>
            {content}
        </Box>
    );
}

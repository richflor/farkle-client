import { Typography } from '@mui/material';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { socketUserReady } from '../../../slicers/userSlice';
import { isUserTxt } from '../../../utilities';

interface prop {
    name:string,
    ready: boolean,
    userName: string
}

export function Ready ({ name, ready, userName }: prop) {

    const gameDispatch = useDispatch<AppDispatch>();

    function readyToPlay(e:React.MouseEvent) {
        const target = e.target as HTMLElement;
        if (userName === name) {
            if (target.classList.contains("clickReady")) {
                target.classList.remove("clickReady");
                gameDispatch(socketUserReady());
                console.log("click ready")
            }
        }
    }

    let className = "";
    if (ready) {
        className = "playerStatus clickReady bgGreen";
    } else if (userName === name) {
        className = "playerStatus scaleInOut clickReady";
    } else {
        className = "playerStatus scaleInOut2 clickReady nohover";
    }
    
    return (
            <Typography
                variant="button"
                sx={{ color: isUserTxt(name, userName)}}
                className={className}
                onClick={(e)=> readyToPlay(e)}
            >
                {ready ? "Prêt" : "Attente 💤"}
            </Typography>
    );
}

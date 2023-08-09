import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { checkLength} from '../../utilities'
import { useDispatch } from 'react-redux'
import { socketLogin } from '../../store/userSlice'
import { AppDispatch } from '../../store/store'
import { socketUpdateRoom } from '../../slicers/gameSlice'

export default function ConnectForm () {

  const dispatch = useDispatch<AppDispatch>();

  const [userName, setUsername] = useState<string>("");
  const [roomName, setRoom] = useState<string>("");
  const setState = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, callback:Function) => {
    if (e.target.value !== "") callback(e.target.value);
  }

  const login = (username:string, room:string) => {
    if ((checkLength(username) && checkLength(room)) === false ) {
      alert("Nom et Room doivent faire 3 lettres ou plus");
    } else {
      console.log("we log")
      dispatch(socketUpdateRoom());
      dispatch(socketLogin({
        name: username,
        roomId: room,
      }));
    }
  }

  return (
    <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}>
      <img src="/asset/logo.svg" alt="logo" />
      <TextField
        id=""
        label="Nom"
        variant='outlined'
        onChange={(e) => setState(e, setUsername)}/>
      <TextField
        id=""
        label="Room"
        variant='outlined'
        onChange={(e) => setState(e, setRoom)}/>
      <Button 
        variant="contained" 
        color="primary"
        onClick={()=> login(userName, roomName)}>
        <Typography variant="body1" color="white">Rejoindre une partie</Typography>
      </Button>
    </Stack> 
  );
}

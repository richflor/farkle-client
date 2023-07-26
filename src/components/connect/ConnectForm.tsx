import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { connect, checkLength} from '../../farkle'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginInfo } from '../../store/userSlice'

export default function ConnectForm () {

  const dispatchUser = useDispatch();

  const [userName, setUsername] = useState<string>("");
  const [roomName, setRoom] = useState<string>("");
  const setState = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, callback:Function) => {
    callback(e.target.value)
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
        onClick={()=> {
          if ((checkLength(userName) && checkLength(roomName)) === false ) {
            alert("Nom et Room doivent faire 3 lettres ou plus");
          } else {
            // connect(dispatch, socket, {name:userName, roomId:roomName})
            dispatchUser(setLoginInfo({
              name: userName,
              roomId: roomName,
            }))
          }
        }}>
        <Typography variant="body1" color="white">Rejoindre une partie</Typography>
      </Button>
    </Stack> 
  );
}

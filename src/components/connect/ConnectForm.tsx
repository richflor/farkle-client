import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { checkLength} from '../../farkle'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/userSlice'
import { AppDispatch, RootState } from '../../store/store'

export default function ConnectForm () {

  const dispatchUser = useDispatch<AppDispatch>();

  const [userName, setUsername] = useState<string>("");
  const [roomName, setRoom] = useState<string>("");
  const setState = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, callback:Function) => {
    callback(e.target.value)
  }

  const user = useSelector((state:RootState)=> state.user)

  console.log(user)

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
            dispatchUser(login({
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

import { Container, Stack } from "@mui/material";
import ConnectForm from "./ConnectForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Connect () {
  
  const user = useSelector((state:RootState)=> state.user.value)
  const navigate = useNavigate()
  console.log(user)
  if (user.name !== ""){
    navigate("/game");
  }

  // useEffect(()=> {
  //   navigate("/game");
  // },[user])

  return (
      <Container 
        maxWidth="xs" 
        sx={{ 
          height: 1,
          display: "flex",
          alignItems: "center"
        }}>
        <Stack
          justifyContent="center"
          alignItems="center"
        >
          <ConnectForm/>
        </Stack>
      </Container>
  );
}

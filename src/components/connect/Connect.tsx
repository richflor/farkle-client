import { Container } from "@mui/material";
import ConnectForm from "./ConnectForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Connect () {
  
  const app = useSelector((state:RootState)=> state.user)
  const user = app.value;
  const connected = app.connected;
  const error = app.error
  const navigate = useNavigate()
  console.log(app)
  if (connected) {
    navigate("/game");
  }

  // useEffect(()=> {
  //   navigate("/game");
  // },[user])

  return (
      <Container 
        maxWidth="lg" 
        sx={{ 
          height: 1,
          display: "flex",
          alignItems: "center"
        }}>
          <ConnectForm/>
      </Container>
  );
}

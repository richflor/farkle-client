import { Container } from "@mui/material";
import ConnectForm from "./ConnectForm";

export default function Connect () {

  return (
      <Container 
        maxWidth="lg" 
        sx={{ 
          height: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <ConnectForm/>
      </Container>
  );
}

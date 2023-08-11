import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface IAppProps {
    name:string
}

export function WinModal ({ name }: IAppProps) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/connect");
    }
    return (
    <Dialog open={true} onClose={handleClick} aria-labelledby={"win-modal"}>
        <DialogTitle id={"win-modal"}>
        Fin de Partie
        </DialogTitle>
        <DialogContent>
        <DialogContentText>
            {name + " a gagné la partie."}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={()=> handleClick()}
            color="primary"
            variant="contained"
        >
            Retourner à l'écran de connection
        </Button>
        </DialogActions>
    </Dialog>
  );
}

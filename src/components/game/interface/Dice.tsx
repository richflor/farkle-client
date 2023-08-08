import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { Box } from "@mui/material";
import { socketUserPlay } from "../../../store/userSlice";

interface IAppProps {
  canPlay: boolean | undefined
}

export function Dice ({ canPlay }: IAppProps) {

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (typeof canPlay !== "undefined"){
      if (canPlay) {
        dispatch(socketUserPlay(true));
      } else {
        alert("Not your turn")
      }
    }
  }

  return (
    <Box
      className="ellipse outlineScale"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClick={()=> handleClick()}
    >
      <img src="/asset/dice6.png" alt="" className="dice"/>
    </Box>
  );
}

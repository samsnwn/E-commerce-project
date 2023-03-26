import { Box, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {useNavigate} from "react-router-dom"

const Confirmation = () => {
  const navigate = useNavigate()
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
      <button onClick={()=> navigate("/")}>
        Continue Shopping
      </button>
    </Box>
  );
};

export default Confirmation;
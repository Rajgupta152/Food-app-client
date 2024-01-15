import { AppBar, Box, Container, Typography, Button } from "@mui/material"
import AdbSharpIcon from '@mui/icons-material/AdbSharp';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Nav = (props) => {
    const [logBtn,setLogBtn] = useState("");
    const {currentUser} = props;
    // console.log("current user",currentUser.name);
    const navigate = useNavigate();
    console.log("nav",props.isValidate)
    useEffect(() => {
        if(props.isValidate){
            setLogBtn("Logout");
        } else{
            setLogBtn("Login")
        }
    },[props,logBtn])

    console.log("btn",logBtn);

    const handleLogout = () => {
        props.loginSuccess(false);
        localStorage.clear()
    }

    return(
        <AppBar position="fixed" sx={{height : '50px',display: "flex", justifyContent: "center"}}>
          <Container sx={{ml: 1, display: "flex" ,alignItems: "center",gap:1}} >
              <Box className = "logo">
                  <AdbSharpIcon fontSize="medium" />
              </Box>
              <Box>
              <Typography fontSize="20px" fontWeight="bold">LOGO</Typography>
              </Box>
              <Box>
              <Button sx={{color: "#fff"}} onClick={() => navigate('/')}>Home</Button>
              </Box>
  
              <Box className = "btn-group" sx={{marginLeft: "auto"}}>
                  <Button sx={{color: "#fff"}}
                   onClick={props.isValidate ? handleLogout : () => navigate("/")
                   }>{logBtn}</Button>
              </Box>
              {props.isValidate && currentUser && (<Button sx={{color: "#fff"}}>{currentUser.name}</Button>)}

              {/* <Box className = "profile">
                <Typography>{currentUser.name}</Typography>
                <Typography>{currentUser.email}</Typography>
                <Typography></Typography>
              </Box> */}
          </Container>
        </AppBar>
      )
}

export default Nav

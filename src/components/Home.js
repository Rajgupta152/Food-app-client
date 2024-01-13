import { Box, Button } from "@mui/material"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Home = (props) => {
  const [cookie,setCookie] = useCookies([]);
  const {isValidate} = props;
  // const getLoginSucess = (value) => {
  //   props.loginSuccess(value);
  // }
  // console.log(isValidate);
  const navigate = useNavigate();
  console.log('home',cookie);
    return(
      <Box sx={{marginTop: "100px"}} className = "home-container">
        {/* <Nav isValidate = {isValidate} getLoginSucess = {getLoginSucess} currentUser = {currentUser}/> */}
        <h1>Welcome to Home Page</h1>
        {isValidate && (<Button variant="contained" onClick={() => navigate('/Menu')}>Go TO Menu</Button>)}
      </Box>
    )
}
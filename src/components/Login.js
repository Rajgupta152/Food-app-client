import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { object, string } from "yup"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InputAdornment from '@mui/material/InputAdornment';
export const Login = (props) => {
    const {login,isValidate} = props;

    // for password text field
    // const {passwordType, setPasswordType} = useState("password");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    console.log(isValidate)

    useEffect(() => {
        if(isValidate){
            navigate('/')
            // props.loginSuccess(false);
        }
    },[isValidate,navigate])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: object({
            email: string().required("Please enter your email"),
            password: string().required("Please enter your password")
        }),
        onSubmit: async (values) => {
            console.log(values);
            await login(values);
        }
    })



// handleShowPassword
const handleShowPassword = () => {
    if(showPassword){
        setShowPassword(false)
    } else{
        setShowPassword(true)
    }
}


    return(
        <Box className = "container App-header">
            
            <form onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
                 <TextField
                 type="email"
                 name="email"
                 value={formik.values.email}
                 label = "Please enter your email"
                 onChange={formik.handleChange}
                 sx={{
                    width: "80%"
                 }}

                 ></TextField>
                 {formik.errors.email && (<Typography color="error">{formik.errors.email}</Typography>)}
                 <TextField
                 type={showPassword ? "text" : "password"}
                 name="password"
                 value={formik.values.password}
                 label = "Please enter password"
                 onChange={formik.handleChange}
                 sx={{
                    width: "80%"
                 }}
                 InputProps={{endAdornment: formik.values.password && (
                    <InputAdornment position="start" onClick = {handleShowPassword}>
                    {showPassword ? (<VisibilityOutlinedIcon/>) : (<VisibilityOffOutlinedIcon/>)}
                    </InputAdornment>
                )}}
                 ></TextField>
                 {formik.errors.password && (<Typography color="error">{formik.errors.password}</Typography>)}
                 <Button
                 type="submit"
                 sx={{
                    width: "80%"
                 }}
                 variant="contained"
                  >Login</Button>
                  <span>if you are a new user</span>
                  <Button onClick={() => navigate('/Register')} sx={{display: "inline-block"}}>Sign up</Button>
            </form>
        </Box>
    )
}
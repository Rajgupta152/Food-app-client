import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { object, string } from "yup"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    const {addData} = props
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: object({
            name: string().required("Please enter full name").min(4,"Name length must be greater than 3 char"),
            email: string().required("Please enter your email").email("Please enter valid email"),
            password: string().required("Please enter password").min(6,"Password length must be up to 6")
        }),
        onSubmit: async (values, {resetForm}) => {
            console.log(values);
            await addData(values);
            alert("User registered succesfully")
            navigate('/login')
            resetForm();
        }

    })
    return(
        
        <Box className = "container App-header">
            
            <form onSubmit={formik.handleSubmit}>
            <h1>Sign Up</h1>
                <TextField
                 name="name"
                 value={formik.values.name}
                 label = "Please enter your full name"
                 onChange={formik.handleChange}
                 sx={{
                    width: "100%"
                 }}
                 ></TextField>
                 {formik.errors.name && (<Typography color="error">{formik.errors.name}</Typography>)}
                 <TextField
                 name="email"
                 value={formik.values.email}
                 label = "Please enter your email"
                 onChange={formik.handleChange}
                 sx={{
                    width: "100%"
                 }}
                 ></TextField>
                 {formik.errors.email && (<Typography color="error">{formik.errors.email}</Typography>)}
                 <TextField
                 name="password"
                 value={formik.values.password}
                 label = "Please enter password"
                 onChange={formik.handleChange}
                 sx={{
                    width: "100%"
                 }}
                 ></TextField>
                 {formik.errors.password && (<Typography color="error">{formik.errors.password}</Typography>)}
                 <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                  >SIGN UP</Button>
            </form>
        </Box>
    )
}
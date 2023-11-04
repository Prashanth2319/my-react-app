import React,{ useState }  from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/login.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useAuth } from '../providers/authprovider'; 
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@mui/material/Icon';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});
  

export default function Login(){
    const [loginDetails, setLogin] = useState({});
    const [openErrorAlert,setOpenErrorAlert] = useState({status:false,message:""});
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:validationSchema,
        onSubmit:(values) =>{
            checkLogin(values);
        }
    });



    const handleClick = () => {
         navigate("/dashboard/employee");
    }

    const checkLogin = (loginDetails) =>{
      axios.get("https://localhost:44320/api/Login/GetLogin?emailId="+loginDetails.email+"&password="+loginDetails.password)
      .then((data) => {
        if(data.data){
          setOpenErrorAlert({status:false,message:""});
          setLogin(data?.data);
          login(data?.data.firstName)
          setOpen(true);
          handleClick();
        }
      }).catch((a)=>{
        setOpenErrorAlert({status:true,message:"Username and Password are not corrected."});
        console.log(a);
      });
    }


    return(<div className='loginCss'>




    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        
      <Collapse in={openErrorAlert.status}>
              <Alert severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenErrorAlert({status:false,message:""});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {openErrorAlert.message}
              </Alert>
            </Collapse>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className='row' >
           <div className="email-custom-css col-md-12">
                <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
            </div>
           <div className="email-custom-css col-md-12">

                <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
             </div>   
          </div>     
           <Button variant="contained" size="large" type="submit" className="form_custom_css">
          Log In
        </Button>
        </form>
      </CardContent>
 
    </Card>


    </div>);
}
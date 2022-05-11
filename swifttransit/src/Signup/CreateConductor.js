import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getURL } from '../utils/index';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

class UserLogin extends React.Component
{
    constructor() {
        super();
        this.state = {
         id: '',
         password:'',
         name: '',
         phoneNo: '',
         licenceNo:'',
        };
      }

    setInput = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
    }

    submitForm = e => {
        e.preventDefault();
        const thatURL = getURL() + "user-login";
        console.log(this.state.username)
        axios.post(
            thatURL,
            {
                username: this.state.username,
                password: this.state.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                   
                },
            }
        )
        .then((response) => {
           if (response.status === 200) {
                const data = response.data;
               console.log("login");
 
                localStorage.setItem("token", data.token);
                window.location = "/";
                }
        })
        .catch((err) => {
            console.log(err.message);
            if(err.message==="Request failed with status code 404")
            {
                this.setState({
                    open: true,
                    message: "Username does not exist",
                    });
                    return 0;
            }
            if(err.message==="Request failed with status code 401")
            {
                this.setState({
                    open: true,
                    message: "Invalid password",
                    });
                    return 0; 
            }
        });
    };
    render(){
        return(
            <>
               {/* <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setTheUsername(e.target.value)} 
              value={theUsername}          
              />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setThePassword(e.target.value)} value={thePassword}   
              />

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              type="email"
              id="email"
              onChange={(e)=>setTheEmail(e.target.value)} value={theEmail}   
              />

            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="name"
              id="name"
              onChange={(e)=>setTheName(e.target.value)} value={theName}   
              />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="phoneNumber"
              type="phoneNumber"
              id="phoneNumber"
              onChange={(e)=>setThePhoneNo(e.target.value)} value={thePhoneNo}   
              />

            <TextField
              margin="normal"
              required
              fullWidth
              name="aadharNumber"
              label="aadharNumber"
              type="aadharNumber"
              id="aadharNumber"
              onChange={(e)=>setTheAdhaar(e.target.value)} 
              value={theAdhaar}   
              />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              value="Signup"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider> */}
            </>
        )
    }
}

export default UserLogin;

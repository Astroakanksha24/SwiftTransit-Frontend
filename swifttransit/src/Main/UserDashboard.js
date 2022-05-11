import * as React from 'react';
import { useEffect, useState } from 'react';

import { getURL, getToken } from '../utils/index';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './userlistItems';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AddMoneyToWallet from "../Payment/AddMoneyToWallet"
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/* {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [userData, setUserData] = useState({})

  React.useEffect(()=>{
    const token = getToken();
    var decoded = jwt_decode(token)
    let username = decoded["data"]["data"]["_id"];
    axios.get(`${getURL()}users/user/${username}`)
    .then((res)=>{
      let data = res.data;
      setUserData(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])

  const logoutHandler = () => {
      localStorage.setItem("token", "")
      window.location = "/";
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            
              <p onClick={logoutHandler}>Logout</p>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
           
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                 <h3>Hello, {userData['name']}</h3>
                 <p>
                   Email - {userData['email']}<br />
                   Phone Number - {userData['phoneNumber']}<br />
                   Aadhar Number - {userData['aadharNumber']}<br />
                 </p>

                 <h2>Wallet Balance - {userData['wallet']}</h2>

                </Paper>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <h4>Fill Your Wallet</h4>
                <AddMoneyToWallet/>
                </Paper>
              </Grid>
           
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                 
                </Paper>
              </Grid> */}
             
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  
                </Paper>
              </Grid> */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function AdminDashboard() {
/*  
  useEffect(()=>{
      
    console.log("im in main");
    const token = getToken();
    
        const getConductorURL = getURL()+"profile/"+profileusername;
        axios.get(getprofileURL,
            {headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`
        }})
        .then(res => {
            console.log(res.data);
            console.log("run");
            setthisProfile(res.data);
            const postsURL= getURL()+"allposts/"+profileusername;
            axios.get(
                postsURL,
                {headers:{
                        "Content-Type": "application/json",
                        "authorization": `${token}`
            }})
            .then(res => {
                const data=res.data;
                console.log(res.data);
                for(let i=0;i<data.feed.length;i++)
                {
                    data.feed[i]["section"]="Feed";
                    post_components.push(<Post key={data.feed[i].title} data={data.feed[i]}/>);
                    console.log(post_components);
                }
                for(let i=0;i<data["notice-board"].length;i++)
                {
                    data["notice-board"][i]["section"]="Notice-board";
                    post_components.push(<Post key={data["notice-board"][i].title} data={data["notice-board"][i]}/>);
                    console.log(post_components);
                }
                for(let i=0;i<data["club-broadcast"].length;i++)
                {
                    data["club-broadcast"][i]["section"]="Club-broadcast";
                    post_components.push(<Post key={data["club-broadcast"][i].title} data={data["club-broadcast"][i]}/>);
                    console.log(post_components);
                }
                setscreenready(true);
            })

            
        })
        .catch((err) => {
            console.log(err.message);
            if(err.message==="Request failed with status code 401")
            {
                alert("Login to access TheCampusBugle");
    window.location="/login";
    return;
            }
        }

        )
    }
    
            
    
    
},[]);*/

  return <DashboardContent />;
}
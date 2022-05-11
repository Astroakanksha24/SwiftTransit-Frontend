import * as React from 'react';
import { useEffect, useState } from 'react';

import jwt_decode from "jwt-decode";
import axios from 'axios';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './conductorlistItems';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
var travel_id;
export default function ParticularTravel() {

    let { id } = useParams();
    travel_id=id;
    console.log(id)

  return <DashboardContent />;
}

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


function createData(username,name,phone,conductorLicenseNumber) {
    return { username,name,phone,conductorLicenseNumber  }
}

  


function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [rows, setrows] = useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
var username;
  useEffect(()=>{
    const token = getToken();
    var decoded = jwt_decode(token);
    username = decoded["data"]["data"]["_id"];
        const getCustomerURL = getURL()+ 'bus-travel/all-details/' + travel_id;
        axios.get(getCustomerURL,
            {headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`
        }})
        .then(res => {
            console.log(res.data);
            const data=res.data;
            setrows(data["smartTickets"]);
            console.log(rows);
            console.log("run");
            
        })
        .catch((err) => {
            console.log(err.message);
            if(err.message==="Request failed with status code 401")
            {
                alert("Something went wrong");
   
                return;
            }
        }

        )
},[]);

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
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
            
<a variant="contained" href="/book-ticket" type="button">Book ticket</a><br></br>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Travel ID</TableCell>
            <TableCell align="right">busTravelID</TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right">isDayPass</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">source</TableCell>
            <TableCell align="right">destination</TableCell>
            <TableCell align="right">perTicketCost</TableCell>
            <TableCell align="right">isWallet</TableCell>
            <TableCell align="right">ticketStatus</TableCell>
          </TableRow>
         
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
            <TableCell align="right">{row.busTravelID}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
            <TableCell align="right">{row.isDayPass}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.source}</TableCell>
            <TableCell align="right">{row.destination}</TableCell>
            <TableCell align="right">{row.perTicketCost}</TableCell>
            <TableCell align="right">{row.isWallet}</TableCell>
            <TableCell align="right">{row.ticketStatus}</TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";



import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark"
  }
});

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9',
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/user-signup"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        
      </Typography>

      






      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/user-signup"
          sx={{ minWidth: 200 }}
        >
          Register
        </Button>
        </Grid>

        <Grid item xs={4}>
          <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/user-signup"
          sx={{ minWidth: 200 }}
        >
          Register
        </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/user-signup"
          sx={{ minWidth: 200 }}
        >
          Register
        </Button>
        </Grid>

      </Grid>


      {/* <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
    </Box> */}




      {/* <Card sx={{ maxWidth: 275, textAlign: "initial" }}>
        <CardContent>
        


          <h1><a href="/conductor-login" style={{ textDecoration: 'none', color: 'black' }}>Conductor Login </a></h1>
          <h1><a href="/conductor-login" style={{ textDecoration: 'none', color: 'black' }}>Conductor Login </a></h1>

        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> */}




      

    </ProductHeroLayout>
  );
}

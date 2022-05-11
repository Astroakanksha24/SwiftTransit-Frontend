import * as React from 'react';
import axios from 'axios';
import { getURL } from '../utils/index';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


class UserLogin extends React.Component
{
    constructor() {
        super();
        this.state = {
         name: '',
         id: '',
         licenceNo:'',
         phoneNo: '',
         password:'',
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
                   <form onSubmit={this.submitForm}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="name"
            name="name"
            label="Name"
            type="text"
            value={this.state.name}
            onChange={this.setInput}
          />
        </Grid>
        <Grid item>
          <TextField
            id="id"
            name="UserName"
            label="ID"
            type="number"
            value={this.state.id}
            onChange={this.setInput}
          />
        </Grid>
        <Grid item>
        <TextField
            id="licenceNo"
            name="licenceNo"
            label="Conductor Licence"
            type="number"
            value={this.state.licenceNo}
            onChange={this.setInput}
          />
        </Grid>
        <Grid item>
        <TextField
            id="phoneNi"
            name="phoneNo"
            label="Phone Number"
            type="number"
            value={this.state.phoneNo}
            onChange={this.setInput}
          />
        </Grid>
        <Grid item>
        <TextField
            id="password"
            name="password"
            label="Password"
            type="text"
            value={this.state.password}
            onChange={this.setInput}
          />
          
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
            </>
        )
    }
}

export default UserLogin;

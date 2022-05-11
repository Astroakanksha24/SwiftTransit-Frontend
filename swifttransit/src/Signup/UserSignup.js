import * as React from 'react';
import './Login.css';
import axios from 'axios';
import { getURL } from './utils';

class UserSignup extends React.Component
{
    constructor() {
        super();
        this.state = {
         email: '',
         first_name: '',
         last_name: '',
         username: '',
         password: '',
         phone: '',
         adhaar: '',
         message:''
        };
      }

    setInput = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
    }

    submitForm = e => {
        e.preventDefault();
        const thatURL = getURL() + "user-signup/";
        axios.post(
            thatURL,
            {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                password: this.state.password,
                phone: this.state.phone,
                adhaar: this.state.adhaar,
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
                <div class="page-body">
                <div class="login-form">
                    <center>
                    <form onSubmit={this.submitForm}>
                        <h3>The Campus Bugle</h3>
                        <p>{this.state.message}</p>
                        <input type="email" name="email" placeholder="Email" onChange={this.setInput} value={this.state.email}  required></input><br></br>
                        <input type="text" name="first_name" placeholder="First Name" onChange={this.setInput} value={this.state.first_name}  required></input><br></br>
                        <input type="text" name="last_name" placeholder="last Name" onChange={this.setInput} value={this.state.last_name}  required></input><br></br>
                        <label for='bio'>Bio</label><br></br>
                        <textarea id="bio" name="bio" onChange={this.setInput} value={this.state.bio}  required></textarea><br></br>
                        <label for="profile_picture">Profile Picture</label><br></br>
                        <input type="file" name="profile_picture" onChange={this.setFileInput} required></input><br></br>
                        <input type="password" name="password" placeholder="Password" onChange={this.setInput} value={this.state.password}  required></input><br></br>
                        <input type="submit" value="Signup"></input>
                    </form>
                    </center>
                </div>
                </div>
            </>
        )
    }
}

export default UserSignup;

import * as React from 'react';
import axios from 'axios';
import { getURL } from '../utils/index';

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
                        <h3>Sign Up</h3>
                        <p>{this.state.message}</p>
                        <input type="text" name="username" placeholder="Username" className="form-control" aria-label="default input example" onChange={this.setInput} value={this.state.username}  required></input><br></br>
                        <input type="password" name="password" placeholder="Password" className="form-control" onChange={this.setInput} value={this.state.password}  required></input><br></br>
                        <input type="email" name="email" placeholder="Email" className="form-control" onChange={this.setInput} value={this.state.email}  required></input><br></br>
                        <input type="text" name="first_name" placeholder="First Name" className="form-control" onChange={this.setInput} value={this.state.first_name}  required></input><br></br>
                        <input type="text" name="last_name" placeholder="last Name" className="form-control" onChange={this.setInput} value={this.state.last_name}  required></input><br></br>
                        <input type="text" name="phone" placeholder="Mobile Number" className="form-control" onChange={this.setInput} value={this.state.phone}  required></input><br></br>
                        <label for="adhaar">Adhaar Card</label><br></br>
                        <input type="file" name="adhaar" onChange={this.setFileInput} required></input><br></br>

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

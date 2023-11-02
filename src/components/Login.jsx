import React from "react";
//Css
import '../assetss/css/Login.css';
//imagenes
import logo from '../assetss/img/logo.png';
//servicios
import {Apiurl} from '../services/apirest';
import axios from 'axios';

class Login extends React.Component{

    constructor(props){
        super(props);
    }

    state={
        form:{
            "user":"",
            "password":""
        },
        error:false,
        errorMsg:""
    }

    manejadorSubmit2 =e=>{
        e.preventDefault();
    }

    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form);
    }

    manejadorBoton=()=>{
        let url = Apiurl + "/auth/login";
        axios.post(url,this.state.form)
        .then( response =>{
            console.log(response);

            localStorage.setItem("Accesstoken", response.data.access_token);
            this.props.history.push("/dashboard");
            this.setState({
                error: false,
            });
            window.location.reload();
        })
        .catch(error => {
            console.log(error.response.data.message);

            this.setState({
                error: true,
                errorMsg: error.response.data.message
            });
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                    
                    <div className="fadeIn first">
                    <img src={logo} width="100px" alt="User Icon" />
                    </div>

                   
                    <form onSubmit={this.manejadorSubmit2} > 
                    <input type="text"  className="fadeIn second" name="user" placeholder="User" onChange={this.manejadorChange}/>
                    <input type="password"  className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange}/>
                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton}/>
                    </form>

                    {this.state.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>
                    }



                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login
import React, { Component } from 'react';
import './Login.css'
import {Form  , Row , Col,Button }  from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import  Snackbar  from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'


class Login extends Component{

  constructor(props)  
  {
    super(props)
    this.state={
      UsreNameErrorMsg:"",
      PasswordErrorMsg:"",
      OpenSanckbar:false,
      SnackbarMsg:"",
      SnackbarSeverity:""
    }
  }

    componentDidMount(){
      this.props.OnShow();
    }

    handleSubmit(event){
      event.preventDefault();
      if(event.target.UserName.value === "" && event.target.Password.value === "")
      {
        this.setState({
          UsreNameErrorMsg:"Please enter a Username"
        })
        this.setState({
          PasswordErrorMsg:"Please Enter a Password"
        })
      }
      else if(event.target.UserName.value === "")
      {
        this.setState({
          UsreNameErrorMsg:"Please enter a Username"
        })
      }
      else if(event.target.Password.value === "")
      {
        this.setState({
          PasswordErrorMsg:"Please enter a Password"
        })
      }
      else{
        const headers={
          'Accept':'application/json',
          'Content-Type':'application/json'
        }

        const data = JSON.stringify({
              UserName:event.target.UserName.value,
              Password:event.target.Password.value
        })

        axios.post('https://localhost:44377/api/ApplicationUser/Login',data,{
          headers:headers
        })
        .then((result)=>{
            if(result !== null && result !== undefined){

              if(result.status === 200){
                localStorage.setItem('token', result.data.token);
                console.log("token",result.data.token)
                this.props.history.push("/ContactIndex");
              }
              else{
                this.setState({OpenSanckbar:true,SnackbarMsg:"Incorrect Username and Password",SnackbarSeverity:"error"});
              }
            }
        })
        .catch((error)=>{
          if(error.response !== undefined &&  error.response.status !== undefined &&  error.response.status === 400){
            this.setState({OpenSanckbar:true,SnackbarMsg:"Incorrect Username and Password",SnackbarSeverity:"error"});
          }
          else{
            this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while sending the request",SnackbarSeverity:"error"});
          }
        })
        }
      }

      SnackbarClose = (event) =>{
        this.setState({OpenSanckbar:false})
      }

    render(){
        return( 
            <div>
              
                <div className="container">
                  <Snackbar style={{width:"500px"}} anchorOrigin={{vertical:"top",horizontal:"center"}} autoHideDuration={4000}
                  open={this.state.OpenSanckbar} onClose={this.SnackbarClose}>
                    <Alert style={{width:"500px"}} onClose={this.SnackbarClose} severity={this.state.SnackbarSeverity} >
                      {this.state.SnackbarMsg}
                    </Alert>
                  </Snackbar>

                  <Row>
                      <Col sm={4}>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                          <Form.Group style={{textAlign:"left"}}>
                            <Form.Label>Login into your account</Form.Label>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control 
                              type="text"
                              name="UserName"
                              placeholder="UserName"/>
                          </Form.Group>
                          <p style={{color:"red",textAlign:"left"}}>{this.state.UsreNameErrorMsg}</p>
                          <Form.Group>
                            <Form.Control
                              type="password"
                              name="Password"
                              placeholder="Password"/>
                          </Form.Group>
                          <p style={{color:"red",textAlign:"left"}}>{this.state.PasswordErrorMsg}</p>
                          <Form.Group>
                          <Link to="/ForgetPassword" className="lnKForgetPassword">Forget Password</Link>
                          </Form.Group>
                          <Form.Group>
                            <Button style={{float:"left"}} type="submit" variant="primary">Login</Button>
                            {/* <Button onClick={event => window.location.href="/Registration"} variant="primary" style={{marginLeft:"5px",float:"left"}}>Registration</Button> */}
                          </Form.Group>
                        </Form>
                      </Col>
                  </Row>
                </div>
            </div> 
        )
    }
}
export default Login;

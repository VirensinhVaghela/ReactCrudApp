import React, { Component } from 'react';
import './Login.css'
import {Form  , Row , Col,Button }  from 'react-bootstrap';
import { Link ,Redirect  } from 'react-router-dom';
import  Snackbar  from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import {AppBar, Toolbar }from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


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
      debugger;
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
          fetch('https://localhost:44377/api/ApplicationUser/Login',{
            method:'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              UserName:event.target.UserName.value,
              Password:event.target.Password.value
            })
          })
          .then(resp=>resp.json())
          .then((result)=>
          {
            debugger
            if(result.status === 401)
            {
              this.setState({OpenSanckbar:true,SnackbarMsg:"Incorrect Username and Password",SnackbarSeverity:"error"});
            }
            else{
              localStorage.setItem('token', result.token);
                this.props.history.push("/ContactIndex");
            }
          },
          (error)=>{
            this.setState({OpenSanckbar:true,SnackbarMsg:"There is some error in user login",SnackbarSeverity:"error"}); 
          }
          )
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

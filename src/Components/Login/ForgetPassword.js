import React , {Component}from 'react'
import './Login.css'
import {Form , Button , Row , Col }  from 'react-bootstrap';
import { Link} from 'react-router-dom'
import  Snackbar  from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

class ForgetPassword extends Component{

    constructor(props){
        super(props);
        this.state={
            OpenSanckbar:false,
            SnackbarMsg:"",
            SnackbarSeverity:""
        }
    }

    componentDidMount(){
        this.props.OnShow();
      }

    HandleForgetPassword(event){
        event.preventDefault();

        fetch('https://localhost:44377/api/ApplicationUser/ForgotPassword',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                // UserName:event.target.UserName.value,
                Email:event.target.Email.value
            })
        })
        .then(resp=>resp.json())
        .then((result)=>
        {debugger;
            if(result !== null && result !== undefined)
            {
                if(result.status === 400 && result.message !== "" && result.message !== undefined)
            {
                this.setState({OpenSanckbar:true,SnackbarMsg:result.message,SnackbarSeverity:"error"});
            }
            else{
                this.setState({OpenSanckbar:true,SnackbarMsg:result.message,SnackbarSeverity:"success"});
            }
        }
        },
        (error)=>{
            this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while sending the request",SnackbarSeverity:"error"});
        })
    }

    SnackbarClose = (event) =>{
        this.setState({OpenSanckbar:false})
      }

    render(){
        return(
            <div className="container">
                <Snackbar style={{width:"700px"}} anchorOrigin={{vertical:"top",horizontal:"center"}} autoHideDuration={4000}
                  open={this.state.OpenSanckbar} onClose={this.SnackbarClose}>
                    <Alert style={{width:"700px"}} onClose={this.SnackbarClose} severity={this.state.SnackbarSeverity} >
                      {this.state.SnackbarMsg}
                    </Alert>
                  </Snackbar>

                <Form onSubmit={this.HandleForgetPassword.bind(this)}>
                    <Row>
                        <Col sm={6} md={4}>
                            <Form.Group style={{textAlign:"left"}}>
                                <Form.Text>Forget Password?</Form.Text>
                            </Form.Group>
                            {/* <Form.Group>
                            <Form.Control 
                              type="text"
                              name="UserName"
                              required
                              placeholder="UserName"/>
                          </Form.Group> */}
                          <Form.Group>
                            <Form.Control
                              type="email"
                              name="Email"
                              required
                              placeholder="Email"/>
                          </Form.Group>
                          <Form.Group style={{textAlign:"left"}}>
                              <Button variant="primary" type="submit">Submit</Button>
                              <Link className="lnkBackToLogin" to="/Login">Back to Login</Link>
                          </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default ForgetPassword
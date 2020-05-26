import React , {Component } from 'react'
import './Login.css'
import {Form , Button , Col }  from 'react-bootstrap';
import { Link} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

class Registration extends Component{

    constructor(props){
        super(props)
        this.state={
            FullNameErrorMsg:"",
            RoleErrorMsg:"",
            UserNameErrorMsg:"",
            EmailErrorMsg:"",
            PasswordErrorMsg:"",
            OpenSanckbar:false,
            SnackbarMsg:"",
            SnackbarSeverity:""
        }

    }

    componentDidMount(){
        this.props.OnShow();
    }

    HandleRegistartion(event){
        event.preventDefault();

        const PasswordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const PassValid = PasswordPattern.test(event.target.Password.value);
        console.log(PassValid);

        const EmailPattern = new RegExp("^[A-Za-z0-9_\\+-]+(\\.[A-Za-z0-9_\\+-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*\\.([A-Za-z]{2,20})$");
        const EmailValid = EmailPattern.test(event.target.Email.value);
        console.log(EmailValid);

        if(event.target.Fullname.value === "")
        {this.setState({FullNameErrorMsg:"Please enter Full name"})}
        else if(event.target.UserName.value === "" || event.target.UserName.value.length < 6)
        {this.setState({UserNameErrorMsg:"Username length must be greater than 6."})}
        else if (!EmailValid)
        {this.setState({EmailErrorMsg:"Please enter valid email"})}
        else if(!PassValid)
        {this.setState({PasswordErrorMsg:"Password must container one upper case"})}
        else if(event.target.Role.value === "Role")
        {this.setState({RoleErrorMsg:"Please select role"})}
        else
        {
            fetch('https://localhost:44377/api/ApplicationUser/Register',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FullName:event.target.Fullname.value,
                Role:event.target.Role.value,
                Email:event.target.Email.value,
                UserName:event.target.UserName.value,
                Password:event.target.Password.value,
            })
            })
            .then(resp=>resp.json())
            .then((result)=>{
                if(result.succeeded === true){
                    this.setState({OpenSanckbar:true,SnackbarMsg:"Registration success",SnackbarSeverity:"success"});
                }
                else{
                    this.setState({OpenSanckbar:true,SnackbarMsg:"Registration failed",SnackbarSeverity:"error"});
                }
            },
            (error)=>{
                this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while sending the request",SnackbarSeverity:"error"});
            })
        }
    }

    SnackbarClose = (event) =>{
        this.setState({OpenSanckbar:false})
      }

    render(){
        return(
            <div className="container">

                <Snackbar style={{width:"500px"}} anchorOrigin={{vertical:"top",horizontal:"center"}} autoHideDuration={4000}
                  open={this.state.OpenSanckbar} onClose={this.SnackbarClose}>
                    <Alert style={{width:"500px"}} onClose={this.SnackbarClose} severity={this.state.SnackbarSeverity} >
                      {this.state.SnackbarMsg}
                    </Alert>
                  </Snackbar>

                <Form onSubmit={this.HandleRegistartion.bind(this)}>
                    <Form.Row>
                        <Col md={4} style={{textAlign:"left"}}> 
                            <Form.Group>
                                <Form.Label>Fullname<span style={{color:"red"}}>*</span></Form.Label>
                                <Form.Control type="text" name="Fullname" placeholder="Fullname" />
                                <p style={{color:"red",textAlign:"left"}}>{this.state.FullNameErrorMsg}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username<span style={{color:"red"}}>*</span></Form.Label>
                                <Form.Control type="text" name="UserName" placeholder="Username" />
                                <p style={{color:"red",textAlign:"left"}}>{this.state.UserNameErrorMsg}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email<span style={{color:"red"}}>*</span></Form.Label>
                                <Form.Control type="text" name="Email" placeholder="Email"/>
                                <p style={{color:"red",textAlign:"left"}}>{this.state.EmailErrorMsg}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password<span style={{color:"red"}}>*</span></Form.Label>
                                <Form.Control type="password" name="Password" placeholder="Password" />
                                <p style={{color:"red",textAlign:"left"}}>{this.state.PasswordErrorMsg}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role<span style={{color:"red"}}>*</span></Form.Label>
                                <Form.Control type="text" name="Role" placeholder="Role" as="select" custom >
                                <option>Role</option>
                                <option>Admin</option>
                                <option>User</option>
                                </Form.Control>
                                <p style={{color:"red",textAlign:"left"}}>{this.state.RoleErrorMsg}</p>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>
                                <Link style={{float:"right"}} to="/Login">Back To Login</Link>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}
export default Registration
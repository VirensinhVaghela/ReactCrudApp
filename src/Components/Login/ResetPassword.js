import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import  Snackbar  from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'


export default class ResetPasswordForm extends React.Component {

    state = {
        formdata: {
            password: '',
            ConfirmPassword: '',
            email:""
        },
        OpenSanckbar:false,
        SnackbarMsg:"",
        SnackbarSeverity:""
    };

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const{formdata} = this.state;
            if (value !== formdata.password) {
                return false;
            }
            return true;
        });
    }

    // componentWillUnmount() {
    //     // remove rule when it is not needed
    //     ValidatorForm.removeValidationRule('isPasswordMatch');
    // }

    handleChange = (event) => {
        const { formdata } = this.state;
        formdata[event.target.name] = event.target.value;
        this.setState({ formdata });
    }

    handleSubmit = () => {
        debugger
        const { formdata} = this.state;
        var token = this.props.location.search;
        token = token.substring(token.indexOf("=") + 1);

        const data = JSON.stringify({
            Password:formdata.password,
            ConfirmPassword:formdata.ConfirmPassword,
            Email:formdata.email
        })

        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token
        }

        axios.post('https://localhost:44377/api/ApplicationUser/ResetPassword',data,{
                headers:headers
            })
            .then((result)=>{
                debugger;
                if(result !== null && result !== undefined){
                    if(result.status === 200){
                        this.setState({OpenSanckbar:true,SnackbarMsg:result.data.message,SnackbarSeverity:"success"});
                        setTimeout(() => {
                            this.props.history.push('/Login');
                        }, 4000);
                    }
                    else{
                        this.setState({OpenSanckbar:true,SnackbarMsg:"Reset password failed",SnackbarSeverity:"error"});
                    }
                }
            })
            .catch((error)=>{
                debugger;
                if(error.response !== undefined && error.response.status !== undefined && error.response.status === 400){
                    this.setState({OpenSanckbar:true,SnackbarMsg:error.response.data.message,SnackbarSeverity:"error"});
                }
                else{
                    this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while sending the request",SnackbarSeverity:"error"});
                }
            })

    }

    SnackbarClose = (event) =>{
        this.setState({OpenSanckbar:false})
    }

    render() {
        const { formdata } = this.state;

        return (
            <div className="container col-md-4" style={{marginTop:"6em"}} >

            <Snackbar style={{width:"500px"}} anchorOrigin={{vertical:"top",horizontal:"center"}} autoHideDuration={4000}
              open={this.state.OpenSanckbar} onClose={this.SnackbarClose}>
                <Alert style={{width:"500px"}} onClose={this.SnackbarClose} severity={this.state.SnackbarSeverity} >
                  {this.state.SnackbarMsg}
                </Alert>
            </Snackbar>

            <Typography component="h1" variant="h5" >
                Reset your password
            </Typography>
            <ValidatorForm
                onSubmit={this.handleSubmit.bind(this)}
            >
                <TextValidator
                variant="outlined" margin="normal" fullWidth
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required','matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})']}
                    errorMessages={['Please enter password','Password must containe 1 uppercase,1 lowercase,1 special character and numeric']}
                    value={formdata.password}
                />
                <TextValidator
                variant="outlined" margin="normal" fullWidth
                    label="Confirm password"
                    onChange={this.handleChange}
                    name="ConfirmPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'Please enter confirm password']}
                    value={formdata.ConfirmPassword}
                />
                <TextValidator 
                variant="outlined" margin="normal" 
                fullWidth label="Email Address"
                name="email" autoComplete="email" autoFocus
                validators={['matchRegexp:^[A-Za-z0-9_\\+-]+(\\.[A-Za-z0-9_\\+-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*\\.([A-Za-z]{2,20})$', 'required']}
                errorMessages={['Email is invalid', 'Please enter email']}
                onChange={this.handleChange}
                value={formdata.email}
                />
                <br/>
                <br/>
                <Button type="submit" fullWidth
                variant="contained"
                color="primary">Submit</Button>
            </ValidatorForm>
            </div>
        );
    }
}
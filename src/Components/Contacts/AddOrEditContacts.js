import React, { Component } from 'react';
import {Modal , Button,Col,Form} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'

export default class AddOrEditContacts extends Component{
    constructor(props){
        super(props)
        this.state={
            OpenSanckbar:false,
            SnackbarMsg:"",
            SnackbarSeverity:"",
            getEmployeeID:"",
            SetFullname:"",
            SetEmployeecode:"",
            SetDesignation:"",
            SetMobile:"",
            FullNameErrorMsg:"",
            DesignationErrorMsg:"",
            PhoneErrorMsg:"",
            EmpcodeErrorMsg:""
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({ getEmployeeID:nextProps.ID })
        if(nextProps.show === true && nextProps.ID!== "" && nextProps.ID !== undefined){
            fetch('https://localhost:44377/api/Employee/GetEmployeeById/'+nextProps.ID  ,{
                method:'GET',
                headers:{
                    'Accept':'application/json', 
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem("token")
                }
            })
            .then(resp=>resp.json())
            .then((result) => {
                this.setState({SetFullname:result.fullName,SetEmployeecode:result.empcode,
                     SetDesignation: result.position , SetMobile:result.mobile})
                console.log(result);
            })
        }
        else{
            this.setState({SetFullname:"",SetEmployeecode:"",
                SetDesignation: "" , SetMobile:""})
        }
    }
    
    SnackbarClose = (event) =>{
        this.setState({OpenSanckbar:false})
      }


    HandleSubmit(event){
        debugger;
        event.preventDefault();

        if(event.target.Fullname.value === ""  || event.target.Fullname.value === undefined){
            this.setState({FullNameErrorMsg:"Please enter Full name"})
        }
        else if(event.target.Employeecode.value === "" || event.target.Employeecode.value === undefined){
            this.setState({EmpcodeErrorMsg:"Please enter Employee code"})
        }
        else if(event.target.Designation.value === "" || event.target.Designation.value === undefined){
            this.setState({DesignationErrorMsg:"Please enter Designation"})
        }
        else if (event.target.Mobile.value.length > 10 || event.target.Mobile.value.length < 10){
            this.setState({PhoneErrorMsg:"Please enter correct phone number"})
        }
        else if(this.state.getEmployeeID !== "" && this.state.getEmployeeID !== undefined)
        {
            const data = JSON.stringify({
                EmployeeId:this.state.getEmployeeID,
                FullName:event.target.Fullname.value,
                Empcode:event.target.Employeecode.value,
                Position:event.target.Designation.value,
                Mobile:event.target.Mobile.value
            });

            const headers = {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("token")
            }

            axios.put('https://localhost:44377/api/Employee/UpdateEmployee',data,
            {
                headers:headers
            })
            .then((result)=>{
                if(result !== null && result !== undefined){
                    if(result.status === 200){
                        this.setState({OpenSanckbar:true,SnackbarMsg:"Data Updated Succesfully",SnackbarSeverity:"success"})
                        this.props.onHide();
                        this.props.onsave();
                    }
                    else{
                        this.setState({OpenSanckbar:true,SnackbarMsg:"Please enter correct data",SnackbarSeverity:"error"})
                        this.props.onHide();
                        this.props.onsave();
                    }
                }
            })
            .catch((err)=>{
                this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while update the record",SnackbarSeverity:"error"})
                this.props.onHide();
                this.props.onsave();
            })

        }
        else{

            const data = JSON.stringify({
                FullName:event.target.Fullname.value,
                Empcode:event.target.Employeecode.value,
                Position:event.target.Designation.value,
                Mobile:event.target.Mobile.value
            });

            const headers = {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem("token")
            }

            axios.post('https://localhost:44377/api/Employee/AddEmployee',data,
            {
                headers:headers
            })
            .then((result)=>{
                if(result !== null && result !== undefined){
                    if(result.status === 200){
                        this.setState({OpenSanckbar:true,SnackbarMsg:"Data Added Succesfully",SnackbarSeverity:"success"})
                        this.props.onHide();
                        this.props.onsave();
                    }
                    else{
                        this.setState({OpenSanckbar:true,SnackbarMsg:"Please enter correct data",SnackbarSeverity:"error"})
                        this.props.onHide();
                        this.props.onsave();
                    }
                }
            })
            .catch((err)=>{
                console.log("Error :",err);
                this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while add the record",SnackbarSeverity:"error"})
                this.props.onHide();
                this.props.onsave();
            })
        }
    }

    Handlename(event){
        this.setState({SetFullname:event.target.value})
    }
    HandleEmpCode(event){
        this.setState({SetEmployeecode:event.target.value})
    }
    HandleDesignation(event){
        this.setState({SetDesignation:event.target.value})
    }
    HandleMobile(event){
        this.setState({SetMobile:event.target.value})
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
            
            <Modal
            
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Form onSubmit={this.HandleSubmit.bind(this)}>
                <Modal.Header >
                  <Modal.Title id="contained-modal-title-vcenter">
                    Add Employee Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                          <Form.Label>Fullname</Form.Label>
                                  <Form.Control value={this.state.SetFullname} onChange={this.Handlename.bind(this)}  type="text" name="Fullname" placeholder="Fullname" />
                          </Form.Group>
                          <p style={{color:"red",textAlign:"left"}}>{this.state.FullNameErrorMsg}</p>
                          <Form.Row>
                              <Form.Group as={Col}>
                                  <Form.Label>Employee code</Form.Label>
                                  <Form.Control type="text" value={this.state.SetEmployeecode} onChange={this.HandleEmpCode.bind(this)} name="Employeecode" placeholder="Employee code" />
                                  <p style={{color:"red",textAlign:"left"}}>{this.state.EmpcodeErrorMsg}</p>
                              </Form.Group>
                              <Form.Group as={Col}>
                                  <Form.Label>Designation</Form.Label>
                                  <Form.Control type="text" defaultValue={this.state.SetDesignation} onChange={this.HandleDesignation.bind(this)} name="Designation" placeholder="Designation">
                                      {/* <option>Designation</option>
                                      <option>Software Engineer</option>
                                      <option>Senior Software Engineer</option>
                                      <option>Team Leader</option> */}
                                  </Form.Control>
                                  <p style={{color:"red",textAlign:"left"}}>{this.state.DesignationErrorMsg}</p>
                              </Form.Group>
                              <Form.Group as={Col}>
                                  <Form.Label>Mobile</Form.Label>
                                  <Form.Control type="text"  value={this.state.SetMobile} onChange={this.HandleMobile.bind(this)} name="Mobile" placeholder="Mobile" />
                                  <p style={{color:"red",textAlign:"left"}}>{this.state.PhoneErrorMsg}</p>
                              </Form.Group>
                          </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" >Save</Button>
                  <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
          </Modal>
          </div>
        )
    }
}

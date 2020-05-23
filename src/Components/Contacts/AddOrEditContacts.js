import React, { Component } from 'react';
import {Modal , Button,Col,Form} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

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
            SetMobile:""
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
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
                debugger
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
        if(this.state.getEmployeeID !== "" && this.state.getEmployeeID !== undefined)
        {
            fetch('https://localhost:44377/api/Employee/UpdateEmployee',{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem("token")
                },
                body:JSON.stringify({
                    EmployeeId:this.state.getEmployeeID,
                    FullName:event.target.Fullname.value,
                    Empcode:event.target.Employeecode.value,
                    Position:event.target.Designation.value,
                    Mobile:event.target.Mobile.value
                    // CreatedDate:event.target.CreatedDate.value,
                    // ModifiedDate:event.target.UpdatedDate.value,
                })
            })
            .then(response=>response.json())
            .then((result)=>{
                console.log(result);
                this.props.onHide()
            },
            (error)=>{
                console.log(error)
                this.props.onHide()
            })
        }
        else{
            fetch('https://localhost:44377/api/Employee/AddEmployee',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem("token")
                },
                body:JSON.stringify({
                    FullName:event.target.Fullname.value,
                    Empcode:event.target.Employeecode.value,
                    Position:event.target.Designation.value,
                    Mobile:event.target.Mobile.value,
                    // CreatedDate:event.target.CreatedDate.value,
                    // ModifiedDate:event.target.UpdatedDate.value,
                })
            })
            .then(resp=>resp.json())
            .then((result)=>{
                debugger;
                if(result.message !== "" && result.message !== undefined){
                    this.setState({OpenSanckbar:true,SnackbarMsg:result.message,SnackbarSeverity:"error"})
                }
                else if(result.status && (result.status === 400 || result.status === 404)){
                    this.setState({OpenSanckbar:true,SnackbarMsg:"One or more error occurred",SnackbarSeverity:"error"}); 
                }
                else{
                    this.setState({OpenSanckbar:true,SnackbarMsg:"Employee details added successfully",SnackbarSeverity:"success"}); 
                }
                this.props.onHide()
            },
            (error)=>{
                this.setState({OpenSanckbar:true,SnackbarMsg:"One or more error occurred",SnackbarSeverity:"error"}); 
                this.props.onHide()
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
                          <Form.Row>
                              <Form.Group as={Col}>
                                  <Form.Label>Employee code</Form.Label>
                                  <Form.Control type="text" value={this.state.SetEmployeecode} onChange={this.HandleEmpCode.bind(this)} name="Employeecode" placeholder="Employee code" />
                              </Form.Group>
                              <Form.Group as={Col}>
                                  <Form.Label>Designation</Form.Label>
                                  <Form.Control type="text" onChange={this.HandleDesignation.bind(this)} name="Designation" as="select" custom>
                                      <option>Designation</option>
                                      <option>Software Engineer</option>
                                      <option>Senior Software Engineer</option>
                                      <option>Team Leader</option>
                                  </Form.Control>
                              </Form.Group>
                              <Form.Group as={Col}>
                                  <Form.Label>Mobile</Form.Label>
                                  <Form.Control type="number"  value={this.state.SetMobile} onChange={this.HandleMobile.bind(this)} name="Mobile" placeholder="Mobile" />
                              </Form.Group>
                          </Form.Row>
                          
                          {/* <Form.Row>
                              <Form.Group as={Col}>
                                  <Form.Label>Created Date</Form.Label>
                                  <Form.Control type="date" name="CreatedDate" placeholder="CreatedDate" />
                              </Form.Group>
                              <Form.Group as={Col}>
                                  <Form.Label>Updated Date</Form.Label>
                                  <Form.Control type="date" name="UpdatedDate" placeholder="Updated Date" />
                              </Form.Group>
                          </Form.Row> */}
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

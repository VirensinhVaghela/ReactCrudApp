import React, { Component } from 'react'
// import {Button , ButtonToolbar} from 'react-bootstrap'
import AddOrEditContacts from './AddOrEditContacts'
import MaterialTable from 'material-table'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'


export default class ContactIndex extends Component {
    constructor(props){
        super(props);
        this.HandleClick = this.HandleClick.bind(this);
        this.GetContactList = this.GetContactList.bind(this);
        this.RefreshContactList = this.RefreshContactList.bind(this);
        this.EditEmployeeData = this.EditEmployeeData.bind(this);
        this.state={
            GetEmployeeID:"",
            ShowModal:false,
            OpenSanckbar:false,
            SnackbarMsg:"",
            SnackbarSeverity:"",
            RowData:[]
        }
    }

    GetContactList(){
      debugger;
        fetch('https://localhost:44377/api/Employee/GetEmployees',{
          method:'GET',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("token")
            }
        })
        .then(response=>response.json())
        .then((result)=> 
        {
            if(result !== null && result !== undefined)
            {
                this.setState({rowData:result})
            }
        })
        .catch(er=>console.log(er))
    }
    componentDidMount(){
        this.GetContactList()
        this.props.OnHide()
        this.props.OnShowMenu()
    }

    RefreshContactList(){
      debugger;
        this.GetContactList()
    }

    HandleClick(){
      debugger
      // this.setState({GetEmployeeID:""})
      console.log(this.state.GetEmployeeID)
        this.setState({ShowModal:true})
    }

    EditEmployeeData(){
      debugger
      // this.setState({GetEmployeeID:EmpID});
      this.setState({ShowModal:true});
    }

    HandleDelete(Id){
      debugger;
      const headers = {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      }

      axios.delete('https://localhost:44377/api/Employee/DeleteEmployee/'+Id+'',
      {
        headers:headers
      })
      .then((result)=>{
        if(result !== null && result !== undefined){
          if(result.status === 200){
            this.setState({OpenSanckbar:true,SnackbarMsg:"Data Deleted Succesfully",SnackbarSeverity:"success"})
            this.RefreshContactList();
          }
          else{
              
            this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while deleting the record",SnackbarSeverity:"error"})
            this.RefreshContactList();
          }
        }
      })
      .catch((err)=>{
        console.log("Response error :",err);
      })
    }

    SnackbarClose = (event) =>{
        this.setState({OpenSanckbar:false})
      }
    
    render(){
        
        let ShowModalClose = () => this.setState({ShowModal:false});
        let OnSave = () => this.RefreshContactList();
        return(
            <div>
                <AddOrEditContacts 
                show={this.state.ShowModal} 
                onHide={ShowModalClose} onsave={OnSave}  ID={this.state.GetEmployeeID} />

            <Snackbar 
              style={{width:"500px"}} 
              anchorOrigin={{vertical:"top",horizontal:"center"}} 
              autoHideDuration={4000}
              open={this.state.OpenSanckbar} 
              onClose={this.SnackbarClose}>
                <Alert style={{width:"500px"}} 
                  onClose={this.SnackbarClose} 
                  severity={this.state.SnackbarSeverity} >
                  {this.state.SnackbarMsg}
                </Alert>
            </Snackbar>

            <MaterialTable
                title="Employee Details"
                columns={[
                  // { title: 'EmployeeID', field: 'employeeId'},
                  { title: 'Employee code', field: 'empcode' },
                  { title: 'Employee Name',field: 'fullName'},
                  { title: 'Phone', field: 'mobile' },
                  { title: 'Updated Date', field: 'modifiedDate' },
                  { title: 'Designation', field: 'position' },
                ]}
                data={this.state.rowData}
                // onFilterChange
                actions={[
                  rowData => ({
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: (event,rowData) => this.setState({GetEmployeeID:rowData.employeeId},
                      () => this.EditEmployeeData())
                    // onClick: (event,rowData) => this.EditEmployeeData(rowData.employeeId)
                  }),
                  {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    // onClick: (event,rowData) => this.HandleClick()
                    onClick: (event,rowData) => this.setState({GetEmployeeID:""},
                        () => this.HandleClick())
                  },
                  rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => this.HandleDelete(rowData.employeeId)
                  })
                ]}
                options={{
                  filtering:true,
                  exportButton:true,
                  showSelectAllCheckbox:true,
                  actionsColumnIndex: -1
                }}
            />
            </div>
        ) 
    }
}


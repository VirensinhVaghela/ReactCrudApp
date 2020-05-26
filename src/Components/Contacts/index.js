import React, { Component } from 'react'
import AddOrEditContacts from './AddOrEditContacts'
import MaterialTable from 'material-table'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import './Contact.css'
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';


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
            DeleteIds:"",
            anchorEl:"",
            Checked:false,
            HideEmployeeCode:false,
            HideEmployeeName:false,
            HidePhone:false,
            HideDesignation:false,
            HideUpdatedDate:false,
            ColumnName:[],
            RowData:[]
        }
    }

    GetContactList(){
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

    actions=[
      {
        icon: 'edit',
        tooltip: 'Edit User',
        position:'row',
        onClick: (event,rowData) => this.setState({GetEmployeeID:rowData.employeeId},
          () => this.EditEmployeeData(rowData.employeeId))
      },
      {
        icon: 'add',
        tooltip: 'Add User',
        isFreeAction: true,
        onClick: (event,rowData) => this.setState({GetEmployeeID:""},
            () => this.HandleClick())
      },
      {
        icon: 'delete',
        tooltip: 'Delete User',
        onClick: (event, rowData) => {this.HandleMultipleDelete(rowData) } 
        // onClick: handleDeleteRows
      },
      {
        icon: 'delete',
        position:'row',
        tooltip: 'Delete User',
        onClick: (event, rowData) => this.HandleDelete(rowData.employeeId)
        // onClick: handleDeleteRows
      }
    ]

    RefreshContactList(){
        this.GetContactList()
    }

    HandleClick(){
      console.log(this.state.GetEmployeeID)
        this.setState({ShowModal:true})
    }

    EditEmployeeData(empcode){
      this.setState({ShowModal:true});
    }

    HandleDelete(Id){
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

    HandleMultipleDelete(rowData){

      var Id="";
      var Ids="";

      for(var i=0;i<rowData.length;i++){
        Id = rowData[i].employeeId;
        Ids = Ids + Id + ',';
      }

      Ids=Ids.substring(0,Ids.length -1);

      const headers = {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      }

      axios.delete('https://localhost:44377/api/Employee/DeleteEmployees?employeeIdsString='+Ids ,
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
        this.setState({OpenSanckbar:true,SnackbarMsg:"An error occurred while sending the request",SnackbarSeverity:"error"})
        this.RefreshContactList();
        console.log("Response error :",err);
      })
    }

    SnackbarClose = (event) =>{
        this.setState({OpenSanckbar:false})
      }

      ShowEmpoyeeName(event){
        if(event.checked === true){
          this.setState({HideEmpCode:true})
          alert(this.state.HideEmpCode)
        }
        else{
          this.setState({HideEmpCode:true})
          alert(this.state.HideEmpCode)
        }
      }
    
      
    render(){
        
        let ShowModalClose = () => this.setState({ShowModal:false});
        let OnSave = () => this.RefreshContactList();

        let HandleShowHideColumn = (event) => {
          if(event.target.checked === true){
            if(event.target.value === "Employee code"){
              this.setState({HideEmployeeCode:true})
            }
            else if(event.target.value === "Employee Name"){
              this.setState({HideEmployeeName:true})
            }
            else if(event.target.value === "Phone"){
              this.setState({HidePhone:true})
            }
            else if(event.target.value === "Designation"){
              this.setState({HideDesignation:true})

            }else if(event.target.value === "Updated Date"){
              this.setState({HideUpdatedDate:true})
            }
          }
          else{
            if(event.target.value === "Employee code"){
              this.setState({HideEmployeeCode:false})
            }
            else if(event.target.value === "Employee Name"){
              this.setState({HideEmployeeName:false})
            }
            else if(event.target.value === "Phone"){
              this.setState({HidePhone:false})
            }
            else if(event.target.value === "Designation"){
              this.setState({HideDesignation:false})
            }
            else if(event.target.value === "Updated Date"){
              this.setState({HideUpdatedDate:false})
              
            }
          }
        };

        const handleChange = (event) => {
          this.setState({ColumnName:event.target.value})
        };

        const names = [
          'Employee code',
          'Employee Name',
          'Phone',
          'Designation',
          'Updated Date'
        ];

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        };

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

                <FormControl className="btnshowColumn">
                  <InputLabel id="demo-mutiple-checkbox-label">Hide Cloumn</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={this.state.ColumnName}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox value={name} checked={this.state.ColumnName.indexOf(name) > -1} onClick={HandleShowHideColumn} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


            <MaterialTable style={{position:"relative", top:"-80px"}}  
                title="Employee Details"
                columns={[
                  { title: 'EmployeeID', field: 'employeeId', hidden:true},
                  { title: 'Employee code', field: 'empcode', hidden:this.state.HideEmployeeCode },
                  { title: 'Employee Name',field: 'fullName', hidden:this.state.HideEmployeeName},
                  { title: 'Phone', field: 'mobile' , hidden:this.state.HidePhone },
                  { title: 'Updated Date', field: 'modifiedDate', hidden:this.state.HideUpdatedDate },
                  { title: 'Designation', field: 'position' , hidden:this.state.HideDesignation},
                ]}
                data={this.state.rowData}
                actions={this.actions}
                
                options={{
                  filtering:true,
                  exportButton:true,
                  actionsColumnIndex: -1,
                  headerStyle: {
                    backgroundColor: '#D3D3D3'
                  },
                  selection: true,
                }}
            ></MaterialTable>
            </div>
        ) 
    }
}


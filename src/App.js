import React, { Component } from 'react';
import './App.css';
import DashBoard from './Components/Home/Home';
import Login from './Components/Login/Login';
import ForgetPassword from './Components/Login/ForgetPassword'
import Registration from './Components/Login/Registration'
import NavigationBar from './Components/Navigation/Navigation'
import ContactsIndex from './Components/Contacts/index'
import AppBar from './Components/Home'
import {BrowserRouter , Route , Switch} from 'react-router-dom'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      AppPath:false,
      MenuBar:false
    };
  }

  render(){
    let ShowAppBar = () => this.setState({AppPath:true})
    let HideAppBar = () => this.setState({AppPath:false})
    let ShowMenuBar= () => this.setState({MenuBar:true})
    let HideMenuBar = () => this.setState({MenuBar:false})

    return (
      <BrowserRouter>
      <div className="App">
         { this.state.AppPath===true ? <AppBar /> : null }
         { this.state.MenuBar === true ? < NavigationBar/> : null }   

         
        <Switch>
          <Route path='/' component = {AppBar} exact></Route>
          {/* <Route path='/Login' component = {Login} exact></Route>  */}
          <Route path='/Login' 
          render={(props) => 
          <Login {...props} OnShow={ShowAppBar} OnHideMenu={HideMenuBar} />} 
          exact/>

          <Route path='/ContactIndex'
           render={(props) => 
           <ContactsIndex {...props} OnHide={HideAppBar} OnShowMenu={ShowMenuBar} />}
            exact/>

          <Route path='/ForgetPassword' 
          render={(props) => 
          <ForgetPassword {...props} OnShow={ShowAppBar} OnHideMenu={HideMenuBar} />}
           exact/>

          <Route path='/Registration'
           render={(props) =>
            <Registration {...props} OnShow={ShowAppBar}  OnHideMenu={HideMenuBar}/>}
             exact/>

          <Route path='/DashBoard'
           render={(props) =>
            <DashBoard {...props} OnHide={HideAppBar}  ShowMenuBar={ShowMenuBar}/>}
             exact/>
          {/* <Route path='/Login' render={(props) => <Login {...props} OnShow={ShowAppBar} />} exact/> */}
          {/* <Route path='/Home' component = {Home} exact/>
          <Route path='/ContactIndex' component = {ContactsIndex} exact/>
          <Route path='/ForgetPassword' component = {ForgetPassword} exact/>
          <Route path='/Registration'component = {Registration} exact /> */}
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

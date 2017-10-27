import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import {notification} from 'antd'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Front from "./front"
import NotFound from "../components/notFound"
import {Loading} from "../components/loading"
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
const theme = createMuiTheme({
  palette: {
    error: red,
  },
});
class App extends Component{
    render(){
        return(
            <MuiThemeProvider theme={theme}>
            <Router>
               <div>
                   <Switch>
                       {/* <Route path='/404' component={NotFound}/>
                       <Route path='/admin' component={Admin}/> */}
                       <Route component={Front}/>
                   </Switch>
                   {/* {isFetching && <Loading/>} */}
                   {/* {this.props.notification && this.props.notification.content ?
                       (this.props.notification.type === 1 ?
                           this.openNotification('success', this.props.notification.content) :
                           this.openNotification('error', this.props.notification.content)) :
                       null} */}
               </div>
           </Router>
           </MuiThemeProvider>
        )
    }
}


export default App

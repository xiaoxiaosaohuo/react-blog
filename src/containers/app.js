import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
// import {notification} from 'antd'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Front from "./front"
import NotFound from "../components/notFound"
// import {Loading} from "../components/loading"
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import blue  from 'material-ui/colors/blue';
const theme = createMuiTheme({
  palette: {
    error: red,
    background:{
        footer:blue['500'],
        appBar:'#3f51b5'
    },
    shades:{
        light:{
            input:{
                bottomLine:"#fff",
                inputText:"#fff"
            }
        },
        dark:{
            input:{
                bottomLine:"#fff",
                inputText:"#fff"
            }
        }
    }

  },
});
// .fade-enter {
//   opacity: 0;
//   z-index: 1;
// }
// .fade-enter.fade-enter-active {
//   opacity: 1;
//   transition: opacity 250ms ease-in;
// }

class App extends Component{
    render(){
        return(
            <MuiThemeProvider theme={theme}>

            <Router>

               <Switch>
                   <Route path='/404' component={NotFound}/>
                   <Route path="/" component={Front}/>
               </Switch>

           </Router>

           </MuiThemeProvider>
        )
    }
}


export default App

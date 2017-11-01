import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Main from "./main";
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


class App extends Component{
    render(){
        return(
            <MuiThemeProvider theme={theme}>

                <Main></Main>

           </MuiThemeProvider>
        )
    }
}


export default App

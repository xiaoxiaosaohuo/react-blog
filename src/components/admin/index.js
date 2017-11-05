import React,{PureComponent} from "react";
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';

import Login from './login';
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundImage:'url("/header.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height:"100vh",
    minHeight:"100vh",
    maxHeight:"100vh"
  },
  header:{
      height:64,
      width:'100%',
    //   backgroundImage:'url("/header.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  },
  footer:{
      height:64,
       width:'100%',
    //   backgroundImage:'url("/footer.jpeg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  },
  login:{
      width:400,
      '&>div':{
          backgroundColor: 'rgba(0,0,0,0.5)',
      }
  }

});
class Admin extends PureComponent{


    render(){
        const { classes ,history} = this.props;
        return(
            <div className={classes.root}>
                <header className={classes.header}></header>
                <Login className={classes.login} history={history}></Login>
                <footer className={classes.footer}></footer>
            </div>
        )
    }
}

export default withStyles(styles)(Admin);

import React from 'react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
const styles = theme => {
    return({
      root: {
        width: '100%',
      },
      flex: {
        flex: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
    })
};


const  ButtonAppBar = (props)=> {
  const { classes,onClick } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
              className={classes.menuButton}
              onClick={onClick}
              color="contrast"
              aria-label="Menu"
              >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            苦瓜和尚
          </Typography>
          <SearchIcon></SearchIcon>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default withStyles(styles)(ButtonAppBar);

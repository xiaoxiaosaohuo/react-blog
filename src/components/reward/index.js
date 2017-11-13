import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import orange from 'material-ui/colors/orange';

const primary = orange[700];


const styles = theme => ({
  money:{
      color:primary,
      background: '#fff',
      '& span':{
          fontSize:'1.5em'
      },
      '&:hover':{
          background: primary,
          color:"#fff"
      }
  }

  })

  class Reward extends PureComponent {
      render(){
          const {classes} = this.props;
          return(
              <div    >
                  <Button
                      fab
                      aria-label="money"
                      className={classes.money}
                      title="赏"
                      >
                      <span>赏</span>
                  </Button>

              </div>
          )
      }
  }




  export default  withStyles(styles)(Reward);

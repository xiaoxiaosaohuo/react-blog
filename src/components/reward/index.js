import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
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
  },
  rewardWrapper:{
      display:'flex'
  }

  })

  class Reward extends PureComponent {
      constructor(props){
          super(props)
          this.state={
              visible:false
          }

      }
      onClick = ()=>{
          this.setState({
              visible:true
          })
      }
      onClose = ()=>{
          this.setState({
              visible:false
          })
      }
      render(){
          const {classes} = this.props;
          const {visible} = this.state;
          return(
              <div>
                  <Button
                      fab
                      aria-label="money"
                      className={classes.money}
                      title="赏"
                      onClick = {this.onClick}
                      >
                      <span>赏</span>
                  </Button>
                  <Dialog open={visible} onRequestClose = {this.onClose}>
                      <DialogTitle>谢谢您的鼓励！</DialogTitle>
                      <DialogContent>
                          <div className={classes.rewardWrapper}>
                               <img src="/reward.jpg" width='300' height="100%"></img>
                          </div>

                      </DialogContent>
                  </Dialog>

              </div>
          )
      }
  }




  export default  withStyles(styles)(Reward);

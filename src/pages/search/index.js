import React,{PureComponent} from 'react';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) =>{
        console.log(state);
        return(
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            I'm A fade Transition!
          </div>
        )
    } }
  </Transition>
);


const styles = theme => ({

    input:{

        padding:16,
        fontSize: 60,
        '&>div':{
            color: '#fff',
            '&:before':{
                    backgroundColor:"#fff"
            },
            '&:after':{
                    backgroundColor:"#fff"
            },
            '&:hover':{
                '&:before':{
                    backgroundColor:"#fff !important"
                }
            }
        },


    },




});
class Search extends PureComponent {
    constructor(props){
        super(props)
        this.state = { show: false }

    }
    handleToggle() {
    this.setState(({ show }) => ({
      show: !show
    }))
  }
    onChange = (e)=>{
        console.log(e.target.value);
    }
    componentDidMount(){
        // alert(2)
    }
    render(){
        const {classes} = this.props;
        const { show } = this.state;
        return(
            <Grid>
                <TextField
                    className={classes.input}
                    fullWidth
                    onChange = {this.onChange}
                    InputClassName="aa"
                />

                <img src="1.jpg"></img>


            </Grid>
        )
    }
}

export default withStyles(styles)(Search)

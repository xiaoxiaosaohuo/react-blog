import React,{PureComponent} from 'react';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
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

    }
    onChange = (e)=>{
        console.log(e.target.value);
    }
    render(){
        const {classes} = this.props;
        console.log(classes);
        return(
            <Grid>
                <TextField
                    className={classes.input}
                    fullWidth
                    onChange = {this.onChange}
                    InputClassName="aa"
                />
            </Grid>
        )
    }
}

export default withStyles(styles)(Search)

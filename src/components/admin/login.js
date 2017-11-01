import React,{Component} from "react";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

const styles = theme => ({
  root: {
    width:400

  },
  cardContent:{
      display: 'flex',
      flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },

});
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
        name: '',
        password: '',
        showPassword: false,
      }

    }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
    render(){
        const { classes,className } = this.props;

        return(
            <div className={className}>

                <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                          FormControlClasses={{
                            focused: classes.inputLabelFocused,
                          }}
                          htmlFor="custom-color-input"
                        >
                          Name
                        </InputLabel>
                        <Input
                          classes={{
                            inkbar: classes.inputInkbar,
                          }}
                          id="custom-color-input"
                        />
                      </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                          FormControlClasses={{
                            focused: classes.inputLabelFocused,
                          }}
                          htmlFor="password">Password</InputLabel>
                      <Input
                        id="password"
                        classes={{
                          inkbar: classes.inputInkbar,
                        }}
                        type={'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        // endAdornment={
                        //   <InputAdornment position="end">
                        //     <IconButton
                        //       onClick={this.handleClickShowPasssword}
                        //       onMouseDown={this.handleMouseDownPassword}
                        //     >
                        //       {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        //     </IconButton>
                        //   </InputAdornment>
                        // }
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Button raised color="primary" className={classes.button}>
                            登录
                      </Button>
                    </FormControl>
                </CardContent>

              </Card>

      </div>
        )
    }
}

export default withStyles(styles)(Login);

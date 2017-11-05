import React,{Component} from "react";

import PropTypes from 'prop-types';

import {  bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';
import Input, { InputLabel, } from 'material-ui/Input';
import { FormControl} from 'material-ui/Form';


import {actions as IndexActions} from '../../reducers/index'
console.log(IndexActions);
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

  input:{
      height:'2em'
  },
  button:{
      height:'3em'
  }




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

  handleSubmit = (e)=>{
      const {name,password} = this.state;
      this.props.login({username:name,password:password})
  }
  componentWillReceiveProps(nextProps){
      const {userInfo} = nextProps;
      console.log(userInfo);
      if(userInfo.username!=this.props.userInfo.username){
        //   alert(22)
          this.props.history.push("/edit")
      }
  }
    render(){
        const { classes,className,location } = this.props;
            console.log(this.props);
        return(
            <div className={className}>

                <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                          FormControlClasses={{
                            focused: classes.inputLabelFocused,
                          }}
                          htmlFor="name"
                        >
                          Name
                        </InputLabel>
                        <Input
                          classes={{
                            inkbar: classes.inputInkbar,
                            input:classes.input
                          }}
                          id="name"
                          onChange={this.handleChange('name')}
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
                          input:classes.input
                        }}
                        type={'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}

                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Button
                            onClick={this.handleSubmit}
                            raised
                            color="primary"
                            className={classes.button}
                            >
                            登录
                      </Button>
                    </FormControl>
                </CardContent>

              </Card>

      </div>
        )
    }
}

const mapStateToProps = state => ({
    location:state.route.location,
    userInfo:state.appState.userInfo
})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({login:IndexActions.login,},dispatch)

})

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Login));

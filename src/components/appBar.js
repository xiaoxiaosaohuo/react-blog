import React,{PureComponent} from 'react';
import cn from "classnames";
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';

import {throttle} from "lodash";
const styles = theme => {
    return({
      root: {
        width: '100%',
      },
      flex: {
        flex: 1,
      },
      header:{
        position: 'fixed',
        top: 0,
        width: '100%',
        zindex: 1100,
        willchange: 'transform, top',
        transition: 'top 0.5s',
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      fixedTop:{
          transition: 'top 0s',
      },
      transparent: {
        backgroundcolor: 'rgba(0, 0, 0, 0) !important',
        boxshadow: '0px 1px 6px rgba(0, 0, 0, 0), 0px 1px 4px rgba(0, 0, 0, 0) !important',
        willchange: 'box-shadow, background-color',
        '& .title': {
            opacity: 0,
        }
    },
    stopAt200: {
        position: 'absolute',
        top: -64,
        transform: 'translateY(228px)',
        transition: 'top 0s',
    },

    fixedTop: {
        transition: 'top 0s',
    },
    hidden: {
        top: -64,
    },

    })
};

class ButtonAppBar extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
          className: "",
          outClassName: ""
        }
        this.handleScroll = throttle(this.handleScroll,50)
    }
    componentDidMount(){
        const $body = document.querySelector("body")
        this.oldScrollTop = window.scrollY;
        this.onScroll()
    }
    onScroll = ()=>{
        document.addEventListener('scroll', this.handleScroll, false);
    }
    handleScroll = ()=>{
        let top = true;
        let scrollTop = window.scrollY
        const {classes} = this.props
        console.log(classes)

        if (scrollTop < 228 - 64 || (scrollTop < 228 && top)) {
        top = true
        let sum = scrollTop - 228 + 64;
        if (sum < 0) {
          if (this.state.className != classes.transparent || this.state.outClassName != classes.fixedTop) {
            this.setState({
              outClassName: classes.fixedTop,
              className: classes.transparent
            });
          }
        } else if (this.state.className != classes.transparent || this.state.outClassName != classes.stopAt200) {
          this.setState({
            outClassName: classes.stopAt200,
            className: classes.transparent
          });
        }
      } else if (scrollTop > 228 || (scrollTop > 228 - 64 && !top)) {
        top = false
        if (this.oldScrollTop < scrollTop && (this.state.className != "" || this.state.outClassName != classes.hidden)) {
          this.setState({
            outClassName: classes.hidden,
            className: ""
          });
        }
        if (this.oldScrollTop > scrollTop && (this.state.className != "" || this.state.outClassName != "")) {
          this.setState({
            outClassName: "",
            className: ""
          });
        }
      }
      this.oldScrollTop = scrollTop;
    }
    onSearch = ()=>{

    }
    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll, false);
    }
    render(){
        const { classes,onClick } = this.props;
        const {className,outClassName} = this.state;
        console.log(className);
        return (
          <div className={cn(classes.root,classes.header,outClassName)}>
            <AppBar position="static" className={className}>
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
                <IconButton onClick={this.onSearch} color="contrast">
                <SearchIcon></SearchIcon>
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}



export default withStyles(styles)(ButtonAppBar);

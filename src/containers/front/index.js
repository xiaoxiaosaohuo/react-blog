import React,{Component} from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Banner from "../../components/banner"
import Sider from "../../components/sider"
import {Home} from '../../components/home'
import NotFound from "../../components/notFound"
import Login from "../../components/login"
import Logined from "../../components/login/logined"
import {actions} from '../../reducers/tags'
import {actions as loginActions } from "../../reducers"
import style from "./style.css"

// import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import AppBar from "../../components/appBar";
import AppDrawer from "../../components/drawer";
const {get_all_tags} = actions;
const {get_login,get_register} = loginActions


const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
      '@media print': {
        background: theme.palette.common.white,
      },
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background:
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        borderRadius: 1,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 2,
        boxShadow: `${theme.palette.type === 'light'
          ? theme.palette.common.black
          : theme.palette.common.white} 1px 0 6px 1px`,
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite',
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)',
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)',
      },
    },
    '@keyframes nprogress-pulse': {
      '30%': {
        opacity: 0.6,
      },
      '60%': {
        opacity: 0,
      },
      to: {
        opacity: 0.6,
      },
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});
class Front extends Component{


    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false,
        }
    }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleTogglePaletteType = () => {
    this.props.dispatch({
      type: actionTypes.THEME_CHANGE_PALETTE_TYPE,
      payload: {
        paletteType: this.props.uiTheme.paletteType === 'light' ? 'dark' : 'light',
      },
    });
  };

  handleToggleDirection = () => {
    this.props.dispatch({
      type: actionTypes.THEME_CHANGE_DIRECTION,
      payload: {
        direction: this.props.uiTheme.direction === 'ltr' ? 'rtl' : 'ltr',
      },
    });
  };
    componentDidMount() {
        // this.props.get_all_tags();
    }
    render(){
        const {categories,history,userInfo,get_register,get_login} = this.props;
        const {url} = this.props.match;
        const { children, classes, uiTheme } = this.props;
        const title =null
        let disablePermanent = false;
        let navIconClassName = '';
        let appBarClassName = classes.appBar;

        if (title === null) {
          // home route, don't shift app bar or dock drawer
          disablePermanent = true;
          appBarClassName += ` ${classes.appBarHome}`;
        } else {
          navIconClassName = classes.navIconHide;
          appBarClassName += ` ${classes.appBarShift}`;
        }
        return(
            <div className={classes.root}>
                <AppBar onClick={this.handleDrawerToggle}>
                </AppBar>

                <AppDrawer
                  className={classes.drawer}
                  disablePermanent={disablePermanent}
                  onRequestClose={this.handleDrawerToggle}
                  mobileOpen={this.state.mobileOpen}
                />
            </div>
        )
    }
}

Front.defaultProps = {
    categories:[]
};

function mapStateToProps(state) {
    return{
        categories:state.tags,
        userInfo: state.globalState.userInfo
    }
}
const mapDispatchToProps = dispatch => ({
...bindActionCreators({get_all_tags,get_login,get_register},dispatch)

})
Front = withStyles(styles, {
    name: 'AppFrame',
})(Front)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)

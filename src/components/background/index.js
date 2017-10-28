import React,{PureComponent} from 'react';
// import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withStyles } from 'material-ui/styles';

const style = theme => {
    console.log(theme);
    return({
        root:{
            padding:16,
            backgroundColor:theme.palette.background.appBar,
            position: 'absolute',
            zIndex: -1,
            top: 0,
            width: '100%',
            height: 350,
            transition: 'transform  100ms,background-color 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },
        shadow:{

        }
    })
}

class Background extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      top: 0
    }
  }


  render() {
    let {fullModel = false,classes} = this.props;
    return (
      <div>
        <div className={classes.root} style={{
          transform: `translateY(${this.state.top}px)`
        }}>

        </div>
        <div className={classes.shadow}>

        </div>
      </div>
    )
  }
}


const BackgroundS = withStyles(style)(Background);

export default BackgroundS;

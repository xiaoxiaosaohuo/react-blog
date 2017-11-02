import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import ExpandLess from 'material-ui-icons/ExpandLess';
import getRequestAnimationFrame from '../../utils/getRequestAnimationFrame';
import getScroll from '../../utils/getScroll';
import {omit} from "lodash"
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root:{
      zIndex:theme.zIndex.tooltip,
      position: 'fixed',
      right: 100,
      bottom: 50,
      height: 40,
      width: 40,
      cursor: 'pointer'
  }

});
function noop() { }

function getDefaultTarget() {
  return window;
}
const reqAnimFrame = getRequestAnimationFrame();

const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

class BackTop extends PureComponent  {

    constructor(props) {
      super(props);
      this.state = {
        visible: false,
      };
    }

    getCurrentScrollTop = () => {
      const getTarget = this.props.target || getDefaultTarget;
      const targetNode = getTarget();
      if (targetNode === window) {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      }
      return targetNode.scrollTop;
    }

    scrollToTop = (e) => {
      const scrollTop = this.getCurrentScrollTop();
      const startTime = Date.now();
      const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
        if (time < 450) {
          reqAnimFrame(frameFunc);
        }
      };
      reqAnimFrame(frameFunc);
      (this.props.onClick || noop)(e);
    }

    setScrollTop(value) {
      const getTarget = this.props.target || getDefaultTarget;
      const targetNode = getTarget();
      if (targetNode === window) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
      } else {
        targetNode.scrollTop = value;
      }
    }

    handleScroll = () => {
      const { visibilityHeight, target = getDefaultTarget } = this.props;
      const scrollTop = getScroll(target(), true);
      this.setState({
        visible: scrollTop > visibilityHeight,
      });
    }

    componentDidMount() {
      const getTarget = this.props.target || getDefaultTarget;
      this.target = getTarget()
      this.scrollEvent = this.target.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    }

    componentWillUnmount() {
        this.target.removeEventListener('scroll', this.handleScroll);

    }
    render(){
        const { classes } = this.props;
        const backTopBtn = this.state.visible ? (
              <Button
                  onClick={this.scrollToTop}
                  fab
                  color="accent"
                  aria-label="edit"
                  className={classes.button}>
                <ExpandLess />
              </Button>
        ) : null;

        return(
            <div className={classes.root}>

              {backTopBtn}
            </div>
        )
    }

}
BackTop.defaultProps = {
  visibilityHeight: 40,
};
BackTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackTop);

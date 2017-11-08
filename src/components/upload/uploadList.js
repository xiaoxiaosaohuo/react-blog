import React ,{PureComponent} from "react"
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import cn from 'classnames'
const styles = {
  root: {
    width: '100%',
    marginTop: 30,
  },
};
class UploadList extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            buffer: 10,
          };
      }
    progress = () => {
        const { completed } = this.state;
        if (completed > 100) {
          this.setState({ completed: 0, buffer: 10 });
        } else {
          const diff = Math.random() * 10;
          const diff2 = Math.random() * 10;
          this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
        }
    }
    componentDidMount() {
        // this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
    }
    render(){
        const { classes,items = [] } = this.props;
        const { completed, buffer } = this.state;
        console.log(items);
        return(
            <div className={classes.root}>
                <LinearProgress mode="buffer" color="primary" value={completed} valueBuffer={buffer} />
             </div>
        )
    }
}

export default withStyles(styles)(UploadList);

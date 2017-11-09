import React ,{Component} from "react"
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import cn from 'classnames'
const styles = {
  root: {
    width: '100%',
    marginTop: 30,
  },
};
class UploadList extends Component{
    constructor(props) {
        super(props);

      }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    render(){
        const { classes,items = [] } = this.props;
        const list = items.map((file,index)=>{
            const {percent,status} = file;

            if(status=="uploading"|| (!file.thumbUrl && !file.url)){
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                let completed =percent+diff;
                let buffer = completed+ diff2
                if(completed>100){
                    completed =0
                    buffer = 10
                }
                return <LinearProgress key = {index} mode="buffer" color="primary" value={completed} valueBuffer={buffer} />
            }else{
                return <img key = {index} src={file.thumbUrl || file.url} alt={file.name} />
            }
        })
        return(
            <div className={classes.root}>
                {list}
             </div>
        )
    }
}

export default withStyles(styles)(UploadList);

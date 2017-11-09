import React ,{Component} from "react"
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import DeleteIcon from 'material-ui-icons/Delete';
import cn from 'classnames'
const styles = {
  root: {
    width: '100%',
    marginTop: 30,

  },
  previewWrapper:{
      position:'relative'
  },
  editWrapper:{
      height:42,
      position:'absolute',
      right:0,
      bottom:0,
      display:'flex',
      flexDirection:'row',
      background: 'rgba(0, 0, 0, .75)',
      borderRadius: '4px 0 0 0',
      border: 0,
      color:'#fff'


  }
};
class UploadList extends Component{
    constructor(props) {
        super(props);

      }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    handleClose = (file)=>{
        console.log(file);
    }
    render(){
        const { classes,items = [],listType,showRemoveIcon } = this.props;
        const list = items.map((file,index)=>{
            const {percent,status} = file;
            let content = null;
            if (listType === 'picture') {
                if(status=="uploading"|| (!file.thumbUrl && !file.url)){
                    const diff = Math.random() * 10;
                    const diff2 = Math.random() * 10;
                    let completed =percent+diff;
                    let buffer = completed+ diff2
                    if(completed>100){
                        completed =0
                        buffer = 10
                    }
                    content =  <LinearProgress key = {index} mode="buffer" color="primary" value={completed} valueBuffer={buffer} />
                }else{
                    content =  <div key = {index}>
                        <img width="100%" height="205" src={file.thumbUrl || file.url} alt={file.name}></img>
                    </div>

                    // return <img key = {index} src={file.thumbUrl || file.url} alt={file.name} />
                }
            }
            const actions = showRemoveIcon ? (
                <div className = {classes.editWrapper}>
                    <a onClick={() => this.handleClose(file)}>
                        <DeleteIcon></DeleteIcon>
                    </a>
                </div>) : null;

              return <div key={index} className={classes.previewWrapper}>
                  {content}
                  {actions}
              </div>
        })


        return(
            <div className={classes.root}>
                {list}

             </div>
        )
    }
}
UploadList.defaultProps={
    showRemoveIcon:true
}
export default withStyles(styles)(UploadList);

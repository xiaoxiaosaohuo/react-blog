import React ,{Component} from "react"
import cn from 'classnames'
import  RcUpload from 'rc-upload'
import Button from 'material-ui/Button';
// import green from 'material-ui/colors/green';

import { withStyles } from 'material-ui/styles';
import FileUpload from 'material-ui-icons/FileUpload';
import UploadList from './uploadList';
import { fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';
const styles = theme => ({
    root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  disabled: {
      cursor: 'not-allowed',
  },
  select:{
      position:'relative',
      cursor: 'pointer',
      '& span.rc-upload':{
          position:'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          paddingTop:theme.spacing.unit*2,
          paddingBottom:theme.spacing.unit*2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          '&:focus':{
              outline:'none',
          }
      },
      '&:hover':{
          '& .upload-text':{
              transform: 'translateY(0)',
              opacity: 1
          }
      },

      '& .upload-text':{
        marginTop:theme.spacing.unit,
        color: '#666',
        fontSize:16,
        opacity:0,
        color: '#b3b3b3',
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        left: 0,
        bottom: 40,
        lineHeight: 1,
        zIndex: 0,
        transform: 'translateY(-16px)',
        transition: 'all 0.2s',
      }
  },
  card:{
        border: '1px dashed #d9d9d9',
        width: 96,
        height: 96,
        borderRadius: 4,
        backgroundColor: '#fbfbfb',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'border-color .3s ease',
        display: 'inline-block',
        verticalAlign: 'top',
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,

        '&:hover': {
            background: 'transparent',
            borderColor: '#108ee9'
        },
        '&:focus':{
            outline:'none',
        },

  },

})
class MuUpLoad extends Component{

    constructor(props) {
        super(props);
        this.state = {
          fileList: this.props.fileList || this.props.defaultFileList || [],
        };
      }
      onStart = (file) => {
          // debugger;

        let targetItem;
        let nextFileList = this.state.fileList.concat();
        if (file.length > 0) {
          targetItem = file.map(f => {
            const fileObject = fileToObject(f);
            fileObject.status = 'uploading';
            return fileObject;
          });
          nextFileList = nextFileList.concat(targetItem);
        } else {
          targetItem = fileToObject(file);
          targetItem.status = 'uploading';
          nextFileList.push(targetItem);
        }
        this.onChange({
          file: targetItem,
          fileList: nextFileList,
        });
        // fix ie progress
        if (!window.FormData) {
          this.autoUpdateProgress(0, targetItem);
        }
    }
      autoUpdateProgress(_, file) {
        const getPercent = genPercentAdd();
        let curPercent = 0;
        this.clearProgressTimer();
        this.progressTimer = setInterval(() => {
          curPercent = getPercent(curPercent);
          this.onProgress({
            percent: curPercent,
          }, file);
        }, 200);
      }
      onSuccess = (response, file) => {

        this.clearProgressTimer();
        try {
          if (typeof response === 'string') {
            response = JSON.parse(response);
          }
        } catch (e) { /* do nothing */
        }
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
          return;
        }
        targetItem.status = 'done';
        targetItem.response = response;
        this.onChange({
          file: { ...targetItem },
          fileList,
        });
    }
    onProgress = (e, file) => {
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
          return;
        }
        targetItem.percent = e.percent;
        this.onChange({
          event: e,
          file: { ...targetItem },
          fileList: this.state.fileList,
        });
    }
    onError = (error, response, file) => {
        this.clearProgressTimer();
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
          return;
        }
        targetItem.error = error;
        targetItem.response = response;
        targetItem.status = 'error';
        this.onChange({
          file: { ...targetItem },
          fileList,
        });
  }
    handleRemove(file) {
    const { onRemove } = this.props;

    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
          // Prevent removing file
          if (ret === false) {
            return;
          }

          const removedFileList = removeFileItem(file, this.state.fileList);
          if (removedFileList) {
            this.onChange({
              file,
              fileList: removedFileList,
            });
          }
        });
    }
    handleManualRemove = (file) => {
        this.refs.upload.abort(file);
        file.status = 'removed'; // eslint-disable-line
        this.handleRemove(file);
    }
    onChange = (info) => {
        if (!('fileList' in this.props)) {
          this.setState({ fileList: info.fileList });
        }
        const { onChange } = this.props;
        if (onChange) {
          onChange(info);
        }
    }
    clearProgressTimer = ()=> {
        clearInterval(this.progressTimer);
    }
    beforeUpload = (file, fileList) => {
        if (!this.props.beforeUpload) {
          return true;
        }
        const result = this.props.beforeUpload(file, fileList);
        if (result === false) {
          this.onChange({
            file,
            fileList,
          });
          return false;
        } else if (result &&result.then) {
          return result;
        }
        return true;
    }
    componentWillReceiveProps(nextProps) {
        if ('fileList' in nextProps) {
          this.setState({
            fileList: nextProps.fileList || [],
          });
        }
    }
    clearProgressTimer = ()=> {
        clearInterval(this.progressTimer);
      }
    componentWillUnmount() {
        this.clearProgressTimer();
    }
    render(){
        const {
          showUploadList, listType, onPreview,
          type, disabled, children, className,
          classes,wrapperClass,
        } = this.props;
        const uploadButtonCls = cn({
          [classes.select]: true,
          [classes[listType]]: !wrapperClass,
          [wrapperClass]:!!wrapperClass,
          [classes.disabled]: disabled,
        });
        const rcUploadProps = {
          onStart: this.onStart,
          onError: this.onError,
          onProgress: this.onProgress,
          onSuccess: this.onSuccess,
          ...this.props,
          beforeUpload: this.beforeUpload,
        };
        delete rcUploadProps.className;
        delete rcUploadProps.classes;
        delete rcUploadProps.wrapperClass;
        const uploadList = showUploadList ? (
              <UploadList
                listType={listType}
                items={this.state.fileList}
                // onPreview={onPreview}
                onRemove={this.handleManualRemove}
                // showRemoveIcon={showRemoveIcon}
                // showPreviewIcon={showPreviewIcon}
              />
            ) : null;
        const uploadButton = (
          <div className={uploadButtonCls}
              style={{ display: children ? '' : 'none' }}
              >
            <RcUpload {...rcUploadProps} ref="upload" >

            </RcUpload>
          </div>
        );
        return(

            <span className={className}>
              {uploadList}
              {uploadButton}
            </span>

        )
    }
}
MuUpLoad.defaultProps={
    multiple: false,//多选
    action: '',//地址
    data: {},//上传所需参数或返回上传参数的方法
    accept: '',//接受上传的文件类型
    beforeUpload: ()=>{},
    showUploadList: true,//是否展示 uploadList,
    listType: 'text', //上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
    className: '',
    disabled: false,//是否禁用,
    defaultFileList:'',//默认已经上传的文件列表 []，
    wrapperClass:undefined,//自定义的类，用于改变显示的样式
}
export default withStyles(styles)(MuUpLoad)

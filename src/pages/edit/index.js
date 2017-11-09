
import React, { Component } from 'react';
import {  bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import Codemirror from 'react-codemirror';import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import purple from 'material-ui/colors/purple';
import Save from 'material-ui-icons/Save';
import Send from 'material-ui-icons/Send';
import MuUpLoad from '../../components/upload';
import {actions as IndexActions} from '../../reducers/article'
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
const styles = theme => ({
    root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    with:960
  }),
  container:{
      maxWidth:960,
      marginTop: theme.spacing.unit * 3,
      marginBottom:theme.spacing.unit * 3,
  },
  buttonGroup:{
      position:"fixed",
      right:0,
      top:-theme.spacing.unit,
      zIndex:theme.zIndex.dialog
  },
  editor: {
    width: '100%',
  },
  button:{
      margin:theme.spacing.unit * 3,
  },
  input:{
      marginTop:theme.spacing.unit * 2,
      marginBottom:theme.spacing.unit * 2,
      minHeight:44,
      fontSize: 32,
      fontWeight: 700,
      '&:after': {
          backgroundColor: purple[500],
        },
  },
  toolbar:{
      border:"none",
      '& .rdw-option-wrapper':{
          border:"none",
          minWidth:20
      },
      '& .rdw-option-wrapper:hover':{
          backgroundColor:"#ddd"
      },
      '& .rdw-option-wrapper:active':{
          backgroundColor:"#ddd"
      },
      '& .rdw-option-active':{
          backgroundColor:"#ddd"
      },
  },
  upload:{
      width:'100%',
      height:192,
      minHeight:192,
      textAlign: 'center',
      background: '#f2f3f4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  }


  })

  const toolbar = {
      options: ['inline', 'blockType','list',  'link', 'image'],
      inline: {
        inDropdown: false,
        options: ['bold', 'italic', 'monospace'],
      },
      blockType: {
        inDropdown: false,
        options: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
      },
      list: {
        inDropdown: false,
        options: ['unordered', 'ordered', ],
      },
      link: {
        inDropdown: false,
        showOpenOptionOnHover: true,
        defaultTargetOption: '_self',
        options: ['link'],
      },


    }
class EditorConvertToMarkdown extends Component {
    constructor(props){
        super(props)
        this.state = {
          editorState: undefined,
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        })
    }
    handleSave = ()=>{

        const data = convertToRaw(this.state.editorState.getCurrentContent())
        console.log(data)
        this.props.createArticle({
            author:"jinxin",
            "title":"第一票",
            content:JSON.stringify(data),
            isPublish:false,
            tags:["react","express"]
        })
    }
    handleChange = ({fileList})=>{
        console.log(fileList);
        fileList = fileList.map((file) => {
            if (typeof file.response ==="object") {
                file.url = "/uploads/"+file.response.src
                return file
            }
        })
        this.setState({ fileList })
    }


  render() {
    const { editorState } = this.state;
    const {classes} = this.props
    return (
        <div>
            <Grid   className={classes.buttonGroup}  >
                <Grid container justify="center" direction ="row" alignItems="center" >
                    <Grid    >
                        <Button
                            fab
                            color="primary"
                            aria-label="send"
                            className={classes.button}
                            onClick={this.handleSave}
                            title="发布"
                            >
                            <Send />
                        </Button>

                    </Grid>
                    <Grid>
                        <Button fab color="accent" aria-label="save" className={classes.button}>
                            <Save />
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        <Grid container  justify="center" className={classes.root} >
            <Grid   className={classes.container} item xs={12}>
                    <MuUpLoad
                        listType="card"
                        wrapperClass = {classes.upload}
                        action="/api/upload"
                        onChange={this.handleChange}
                        >

                    </MuUpLoad>
                    <img src="/uploads/file-1510122577190.jpeg"></img>

                      <TextField
                          className={classes.input}
                          fullWidth
                          onChange = {this.onChange}
                          placeholder="请输入标题"

                      />
                        <div className="demo-section-wrapper">
                          <div className="demo-editor-wrapper">
                            <Editor
                              wrapperClassName="demo-wrapper"
                              editorClassName={classes.editor}
                              toolbarClassName={classes.toolbar}
                              onEditorStateChange={this.onEditorStateChange}
                              toolbar={toolbar}
                              placeholder="请输入正文..."
                            />
                            {/* <textarea
                              disabled
                              className="demo-content no-focus"
                              value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
                            /> */}
                          </div>

                        </div>
            </Grid>

        </Grid>

        </div>
    );
  }
}


const mapStateToProps = state => ({
    location:state.route.location,
    userInfo:state.appState.userInfo
})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({createArticle:IndexActions.createArticle,},dispatch)

})

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditorConvertToMarkdown));

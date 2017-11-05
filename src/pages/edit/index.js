
import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import Codemirror from 'react-codemirror';import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';


const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
const styles = theme => ({
    root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  container:{
      maxWidth:960,
      marginTop: theme.spacing.unit * 3,
      marginBottom:theme.spacing.unit * 3,
  },
  editor: {
    width: '100%',
    minHeight:300,
    border:"1px solid #ddd"
  },
  button:{
      marginLeft:theme.spacing.unit * 3,
      marginRight:theme.spacing.unit * 3,
  }
  })
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
        console.log(this.state.editorState)
    }


  render() {
    const { editorState } = this.state;
    const {classes} = this.props
    return (
        <Grid container  justify="center" className={classes.root}>
            <Grid   className={classes.container} item xs={12}>
                  <Paper className={classes.root} elevation={4}>
                        <h3>编辑文章</h3>
                        <div className="demo-section-wrapper">
                          <div className="demo-editor-wrapper">
                            <Editor
                              wrapperClassName="demo-wrapper"
                              editorClassName={classes.editor}
                              onEditorStateChange={this.onEditorStateChange}
                            />
                            {/* <textarea
                              disabled
                              className="demo-content no-focus"
                              value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
                            /> */}
                          </div>

                        </div>
                </Paper>
            </Grid>
            <Grid   className={classes.container} item xs={12}>
                <Grid container justify="center" >
                    <Grid    >
                        <Button
                            onClick={this.handleSave}
                            raised
                            color="primary"
                            className={classes.button}
                            >
                            保存
                        </Button>
                        <Button
                            // onClick={this.handleSubmit}
                            raised
                            color="accent"
                            // className={classes.button}
                            >
                            发布
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
  }
}
export default withStyles(styles)(EditorConvertToMarkdown);

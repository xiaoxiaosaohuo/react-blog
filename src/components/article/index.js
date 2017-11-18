import React,{PureComponent} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PostCard   from '../card';


import {actions as ArticleActions } from "../../reducers/article"

const styles = theme => ({

    root:{

        padding:16,

    },
    container:{
        maxWidth:960,
        flexGrow:1,
    },

});

class  PaperSheets extends PureComponent {
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentWillMount(){
        this.props.getArticleList(["React"],1)
    }

  render(){
      const { classes,list:{records} } = this.props;
      return (
        <Grid container  justify="center" className={classes.root}>
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} md={12} sm={12}>
                    {records.map((record,index)=>{
                        return <PostCard
                            key={index}
                            record={record}

                            >
                        </PostCard>
                    })}

                </Grid>
            </Grid>
         </Grid>
      );
    }
}

PaperSheets.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return{
        list: state.article.list,
    }
}
const mapDispatchToProps = dispatch => ({
...bindActionCreators({getArticleList:ArticleActions.getArticleList},dispatch)

})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PaperSheets))

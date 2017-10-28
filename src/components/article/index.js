import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({

    root:{

        padding:16,

    },
    container:{
        maxWidth:960,
        flexGrow:1,
    },
      paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 1,
        '& img':{
            width:'50%',
            height:'50%',
        }
      }),

});

function PaperSheet(props) {
  const { classes } = props;
  return (
    <Grid container  justify="center" className={classes.root}>
        <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} md={12} sm={12}>
                  <Paper className={classes.paper} elevation={4}>
                       <img src="/2.jpg"></img>
                    <Typography type="headline" component="h3">
                      This is a sheet of paper.
                    </Typography>
                    <Typography type="body1" component="p">
                      Paper can be used to build surface or other elements for your application.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <Paper className={classes.paper} elevation={4}>
                      <img src="/1.jpg"></img>
                    <Typography type="headline" component="h3">
                      This is a sheet of paper.
                    </Typography>
                    <Typography type="body1" component="p">
                      Paper can be used to build surface or other elements for your application.
                    </Typography>
                  </Paper>
             </Grid>
             <Grid item xs={12} md={12} sm={12}>
               <Paper className={classes.paper} elevation={4}>
                   <img src="/3.png" ></img>
                 <Typography type="headline" component="h3">
                   This is a sheet of paper.
                 </Typography>
                 <Typography type="body1" component="p">
                   Paper can be used to build surface or other elements for your application.
                 </Typography>
               </Paper>
          </Grid>
    </Grid>
 </Grid>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);

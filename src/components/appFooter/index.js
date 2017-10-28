import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

const styleSheet = theme => {
    console.log(theme);
    return({
      root: {
        overflow: 'auto',
        backgroundColor:theme.palette.background.footer,
        marginTop: 50,
      },
      layout: {
        padding: theme.spacing.unit * 2,
      },
      list: {
        margin: 0,
        paddingLeft: 0,
        listStyle: 'none',
      },
      listItem: {
        paddingTop: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit / 2,
      },
    })
}

function AppFooter(props) {
  const { classes } = props;

  return (
    <footer className={classes.root}>
      <div className={classes.layout}>
        <Typography type="title" gutterBottom>
         联系方式
        </Typography>
        <Typography type="subheading" component="div">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link to="https://github.com/jinxin479">GitHub</Link>
                </li>
                <li className={classes.listItem}>
                  <Link to="https://twitter.com/SivenJin">Twitter</Link>
                </li>

              </ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  QQ:1030564475
                </li>
                <li className={classes.listItem}>
                  邮箱:jinxin479@126.com
                </li>

              </ul>
            </Grid>
          </Grid>
        </Typography>
      </div>
    </footer>
  );
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AppFooter);

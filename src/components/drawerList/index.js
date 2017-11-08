import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText,ListItemSecondaryAction } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import HomeIcon from 'material-ui-icons/Home';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import Divider from 'material-ui/Divider';
import DateRangeIcon from 'material-ui-icons/DateRange';
import ViewListIcon from 'material-ui-icons/ViewList';
import ContactsIcon from 'material-ui-icons/Contacts';
import Badge from 'material-ui/Badge';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  badgePosition:{
      marginTop:-16
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
  noUnderline:{
      textDecoration:'none'
  }
});

class NestedList extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            open: false
        }
    }
    handleClick = () => {
      this.setState({ open: !this.state.open });
    };
    render(){
        const { classes,children,title="" ,onRequestClose} = this.props;
        return(
            <div>


            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                {children[0]?children[0]:null}
              </ListItemIcon>
              <ListItemText inset primary={title} />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
              {children[1]?children[1]:null}
            </Collapse>
            </div>
        )
    }

}
class DrawerList extends PureComponent {


  render() {
      //点击关闭drawer
    const { classes,onRequestClose } = this.props;

    return (
      <List className={classes.root}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText inset primary="首页" />
        </ListItem>
        <Divider />
        <NestedList classes={classes} title="归档" >

            <DateRangeIcon/>
            <ListItem button className={classes.nested}>
                十月2017

              <ListItemSecondaryAction className={classes.badgePosition}>
                  <Badge className={classes.badge} badgeContent={4} color="primary">
                      <i></i>
                  </Badge>
              </ListItemSecondaryAction>
            </ListItem>
        </NestedList>
        <NestedList classes={classes} title="分类">
            <ViewListIcon/>
            <ListItem button className={classes.nested}>

                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText inset primary="Drafts" />

            </ListItem>
        </NestedList>
        <Link to="/about" className={classes.noUnderline}>
            <ListItem button onClick={onRequestClose}>
                <ListItemIcon>
                  <ContactsIcon />
                </ListItemIcon>

                <ListItemText inset primary="关于我" />

            </ListItem>
        </Link>


        <Divider />
      </List>
    );
  }
}

DrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerList);

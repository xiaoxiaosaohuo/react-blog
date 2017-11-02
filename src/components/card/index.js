
import React ,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cn from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import blue from 'material-ui/colors/blue';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
const styles = theme => ({

  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  iconHover: {
    fill: grey[500],
    '&:hover': {
      fill: red[200],
    },
  },
  favorite:{
      fill: red[500],
      '&:hover': {
        fill: red[200],
      },
  },
  number:{
      ...theme.typography.subheading,
      paddingLeft:theme.spacing.unit
  },
  title:theme.typography.title,
  tags:{
      paddingRight:theme.spacing.unit*2,
      '& a':{
          color:blue[500],
          paddingLeft:theme.spacing.unit,
          paddingRight:theme.spacing.unit
      }

  }
});

class PostCard extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            favorite: false,
            number:4
        }
    }


  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }
  handleFavorite = ()=>{
      this.setState((prevState)=>{
          return {
              favorite:!prevState.favorite,
              number:prevState.favorite?prevState.number-1:prevState.number+1
          }
      })
      console.log("我喜欢了啊啊 ");
  }

  render() {
    const { classes } = this.props;
    const {favorite,number} = this.state;

    return (
      <div>
        <Card className={classes.card} style={{maxWidth:960}}>
          <CardHeader
            avatar={
              <Avatar
                  aria-label="avatar"
                  src='/avatar.jpg'
                  className={classes.avatar}>

              </Avatar>
            }
            title={<span className={classes.title}>React源码解析</span>}
            subheader="2017-09-21"
          />
          <CardMedia
            className={classes.media}
            image="/2.jpg"
            title="media"
          />
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton
                onClick = {this.handleFavorite}
                aria-label="Add to favorites">
              <FavoriteIcon
                  className={cn(classes.iconHover,{[classes.favorite]:favorite})}
              />
              <span className={classes.number}>{number}</span>
            </IconButton>
            <div className={classes.flexGrow} />
            <div className={classes.tags}>
                <a aria-label="Share">
                    React
                </a>
                <a aria-label="Share">
                  算法
              </a>
                <a aria-label="Share">
                    Node
                </a>
            </div>

          </CardActions>



        </Card>
      </div>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);

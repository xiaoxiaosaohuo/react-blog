
import React ,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cn from 'classnames';
import {isPlainObject} from 'lodash';
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
  card:{
      marginBottom: theme.spacing.unit * 4,
  },
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
  getSummary = (block)=>{
      if(!isPlainObject(block)){
          return
      }

    if(block.text.length>200){
        return  block.text.slice(0,200)+"..."
    }
    return  block.text.slice(0,200)

  }

  render() {
    const { classes,record } = this.props;
    const {favorite,number} = this.state;
    const {blocks} = JSON.parse(record.content||"{}")
    const summary = this.getSummary(blocks[0])

    return (
        <Card className={classes.card} >
          <CardHeader
            avatar={
              <Avatar
                  aria-label="avatar"
                  src='/avatar.jpg'
                  className={classes.avatar}>

              </Avatar>
            }
            title={<span className={classes.title}>{record.title}</span>}
            subheader="2017-09-21"
          />
          <CardMedia
            className={classes.media}
            image={record.titleImage}
            title="media"
          />
          <CardContent>
            <Typography component="p">
              {summary}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>


            <div className={classes.tags}>
                {record.topics.map((topic,index)=>{
                    return <a aria-label="Share" key={index}>
                        {topic}
                    </a>
                })}


            </div>
            <div className={classes.flexGrow} />
            <IconButton
                onClick = {this.handleFavorite}
                aria-label="Add to favorites">
              <FavoriteIcon
                  className={cn(classes.iconHover,{[classes.favorite]:favorite})}
              />
              <span className={classes.number}>{number}</span>
            </IconButton>
            <IconButton aria-label="Share">
                  <ShareIcon />
            </IconButton>
          </CardActions>



        </Card>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);

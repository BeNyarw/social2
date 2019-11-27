import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  card: {
    width : '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
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
}));

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const sendComment = function(){
    let post = document.getElementById(props.id)
    axios
      .post("/api/post/comment/"+props.id, {pseudo: props.user,comment : post.value})
      .then(res => {
        console.log('comment send')
        props.rerender()
        post.value = '';
      }).catch(err=>{console.log(err)})
  }
  const deletePost = function(){

    axios
      .delete("/api/post/"+props.id,)
      .then(res => {
        console.log('Post deleted')
        props.rerender()
      }).catch(err=>{console.log(err)})
  }
  return(
      <Card className={classes.card + " post-dashboard"}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.user.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings"  onClick={deletePost}>
              <MoreVertIcon/>
            </IconButton>
          }
          title={(<a href={"/user/"+props.user}>{props.user}</a>)}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>

          {props.comment.length > 1 ? props.comment.length + " Commentaires" : props.comment.length + " Commentaire"}
          <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          {props.comment.length > 0 ?

            props.comment.map((comment,i)=>{
                return(
                  <div key={i} paragraph>
                    <p>De :<b><a href={'/user/'+Object.keys(comment)[0]}>{Object.keys(comment)[0] }</a></b></p>
                    <Typography paragraph> {comment[Object.keys(comment)[0]]} </Typography>
                  </div>)
              })
            :
            (<p>Aucun commentaire </p>)
          }
          </CardContent>
          <TextField
            autoFocus
            id={props.id}
            margin="dense"
            label="Ajouter un commentaire"
            type="text"
            fullWidth
          />
          <Button variant="outlined" color="primary" onClick={sendComment}>
            Valider
          </Button>
        </Collapse>
      </Card>
    )
}

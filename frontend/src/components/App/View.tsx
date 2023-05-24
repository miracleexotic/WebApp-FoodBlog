import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import AddCommentIcon from '@mui/icons-material/AddComment';
import TextField from '@mui/material/TextField';
import { grey, pink } from '@mui/material/colors';
import { useParams } from "react-router-dom";
import Moment from 'moment';

import { UserInterface } from '../../models/IUser';
import { PostInterface } from '../../models/IPost';
import { CommentPostInterface } from '../../models/ICommentPost';


interface DataCommentInterface {
  Comment: CommentPostInterface
}

function CommentComponent(props: DataCommentInterface) {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  const [likeToggle, setLikeToggle] = React.useState<{normal: boolean, smile: boolean, very: boolean}>({normal: false, smile: false, very: false});
  const [likeColor, setLikeColor] = React.useState<{normal: string, smile: string, very: string}>({normal: 'grey', smile: 'grey', very: 'grey'});
  const [countLike, setCountLike] = React.useState<{normal: number, smile: number, very: number}>({normal: 10, smile: 10, very: 10});

  const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id === "normal") {
      setLikeToggle((likeToggle) => {
        const newlikeToggle = {
          normal: !likeToggle.normal,
          smile: false,
          very: false
        };
        setLikeColor((likeColor) => {
          const newlikeColor = {
            normal: newlikeToggle.normal ? 'pink' : 'grey',
            smile: newlikeToggle.smile ? 'pink' : 'grey',
            very: newlikeToggle.very ? 'pink' : 'grey',
          }
          return {...likeColor, ...newlikeColor};
        })
        setCountLike((countLike) => {
          const newcountLike = {
            normal: countLike.normal + (newlikeToggle.normal ? 1 : -1), 
            smile: countLike.smile + (likeToggle.smile ? -1 : 0), 
            very: countLike.very + (likeToggle.very ? -1 : 0) 
          }
          return {...countLike, ...newcountLike};
        })
        return {...likeToggle, ...newlikeToggle};
      })
    } else if (e.currentTarget.id === "smile") {
      setLikeToggle((likeToggle) => {
        const newlikeToggle = {
          normal: false,
          smile: !likeToggle.smile,
          very: false
        };
        setLikeColor((likeColor) => {
          const newlikeColor = {
            normal: newlikeToggle.normal ? 'pink' : 'grey',
            smile: newlikeToggle.smile ? 'pink' : 'grey',
            very: newlikeToggle.very ? 'pink' : 'grey',
          }
          return {...likeColor, ...newlikeColor};
        })
        setCountLike((countLike) => {
          const newcountLike = {
            normal: countLike.normal + (likeToggle.normal ? -1 : 0), 
            smile: countLike.smile + (newlikeToggle.smile ? 1 : -1), 
            very: countLike.very + (likeToggle.very ? -1 : 0) 
          }
          return {...countLike, ...newcountLike};
        })
        return {...likeToggle, ...newlikeToggle};
      })
    } else if (e.currentTarget.id === "very") {
      setLikeToggle((likeToggle) => {
        const newlikeToggle = {
          normal: false,
          smile: false,
          very: !likeToggle.very
        };
        setLikeColor((likeColor) => {
          const newlikeColor = {
            normal: newlikeToggle.normal ? 'pink' : 'grey',
            smile: newlikeToggle.smile ? 'pink' : 'grey',
            very: newlikeToggle.very ? 'pink' : 'grey',
          }
          return {...likeColor, ...newlikeColor};
        })
        setCountLike((countLike) => {
          const newcountLike = {
            normal: countLike.normal + (likeToggle.normal ? -1 : 0), 
            smile: countLike.smile + (likeToggle.smile ? -1 : 0), 
            very: countLike.very + (newlikeToggle.very ? 1 : -1)
          }
          return {...countLike, ...newcountLike};
        })
        return {...likeToggle, ...newlikeToggle};
      })
    }
  }

  function getLike() {
    setCountLike({...countLike, normal: 10, smile: 10, very: 10});
  }

  React.useEffect(() => {
    getLike();
  }, []);

  return (
    <>
      <Box sx={{ ...commonStyles, marginTop: -2 }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={props.Comment.UserComment.Username} src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Box sx={{ display: 'flex', marginTop: 1 }}>
            <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
              {props.Comment.UserComment.Username}
            </Typography>
            <Typography variant='body2' sx={{ marginLeft: 1, marginTop: '5px' }} color={ grey[500] }>
              {Moment(props.Comment.Create_at).format('D MMM YYYY HH:mm')}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton 
              id="normal"
              sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}
              onClick={onLikeClick}
            >
              <SentimentSatisfiedIcon sx={{ color: likeColor.normal }}/>
            </IconButton>
            <Typography sx={{ marginTop: 1, marginLeft: 0.5, marginRight: 1, color: '#6e6e6e' }} >
              {countLike.normal}
            </Typography>
            <IconButton 
              id="smile"
              sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}
              onClick={onLikeClick}
            >
              <SentimentSatisfiedAltIcon sx={{ color: likeColor.smile }}/>
            </IconButton>
            <Typography sx={{ marginTop: 1, marginLeft: 0.5, marginRight: 1, color: '#6e6e6e' }} >
              {countLike.smile}
            </Typography>
            <IconButton 
              id="very"
              sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}
              onClick={onLikeClick}
            >
              <SentimentVerySatisfiedIcon sx={{ color: likeColor.very }}/>
            </IconButton>
            <Typography sx={{ marginTop: 1, marginLeft: 0.5, marginRight: 1, color: '#6e6e6e' }} >
              {countLike.very}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ margin: 0.5, marginTop: 1 }}>
          <Typography variant='body1' >
            {props.Comment.Comment}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

function ViewPage() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  const { viewID } = useParams();
  console.log(viewID)

  const dataUser: UserInterface = {
    ID: 1,
    Email: "mai.nutthawat@gmail.com",
    Username: "Nutthawat Boonsodakorn",
    Password: "test",
    Image: "test"
  }

  const dataPost: PostInterface = {
    ID: 1,
    Title: "Heading",
    Subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor",
    Image: "string",
    Create_at: new Date,
    Author: dataUser
  }

  const dataComment: CommentPostInterface[] = [
    {
      ID: 1,
      Comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      Create_at: new Date,
      Post: dataPost,
      UserComment: dataUser

    },
    {
      ID: 2,
      Comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor",
      Create_at: new Date,
      Post: dataPost,
      UserComment: dataUser

    },
    {
      ID: 3,
      Comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor",
      Create_at: new Date,
      Post: dataPost,
      UserComment: dataUser

    },
  ]

  const [likeToggle, setLikeToggle] = React.useState(false);
  const [likeColor, setLikeColor] = React.useState('grey');
  const [countLike, setCountLike] = React.useState(10);

  const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    setLikeToggle((likeToggle) => {
      likeToggle = !likeToggle;
      if (likeToggle) {
        setCountLike((countLike) => {
          const newCountLike = countLike + 1;
          setLike(newCountLike);
          return newCountLike;
        });
        setLikeColor('pink');
      } else {
        setCountLike((countLike) => {
          const newCountLike = countLike - 1;
          setLike(newCountLike);
          return newCountLike;
        });
        setLikeColor('grey');
      }
      return likeToggle;
    });
  }

  function setLike(like: number) {
    console.log(like);
  }

  function getLike() {
    setCountLike(countLike);
  }

  const [editComment, setEditComment] = React.useState("");

  const handleComment = ((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditComment(e.target.value);
  })

  function onClickComment() {
    console.log(editComment);
  }

  React.useEffect(() => {
    getLike();
  }, []);
 
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

        <Box sx={{ margin: '2em', padding: '1em' }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={dataPost.Author.Username} src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Box>
              <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                {dataPost.Author.Username}
              </Typography>
              <Typography variant='body2' sx={{ marginLeft: 1 }} color={ grey[500] }>
                {Moment(dataPost.Create_at).format('D MMM YYYY HH:mm')}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ marginTop: 1.5, marginRight: 1, color: '#6e6e6e' }}>
                {countLike}
              </Typography>
              <IconButton 
                sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}
                onClick={onLikeClick}  
              >
                <FavoriteIcon sx={{ color: likeColor }}/>
              </IconButton>
            </Box>
          </Box>
          <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1 }}>
            {dataPost.Title}
          </Typography>
          <Typography variant='body1' >
            {dataPost.Subject}  
          </Typography>
        </Box>

        <Box sx={{ marginLeft: '2em' }}>
          <Typography variant='h5'>
            <b>Comments</b>
          </Typography>
        </Box>

        <Box sx={{ ...commonStyles, marginTop: 0.5, maxHeight: "100%", overflow: "auto" }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={dataUser.Username} src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Box sx={{ display: 'flex', marginTop: 1 }}>
              <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                {dataUser.Username}
              </Typography>
              <Typography variant='body2' sx={{ marginLeft: 1, marginTop: '5px' }} color={ grey[500] }>
                {Moment(new Date).format('D MMM YYYY HH:mm')}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained"
                startIcon={<AddCommentIcon />}
                size='small'
                onClick={onClickComment}
              >
                Comment
              </Button>
            </Box>
          </Box>
          <TextField 
            id="comment" 
            label="Comment"
            placeholder='Write your comment.' 
            multiline
            fullWidth
            sx={{ marginTop: 1.5 }}
            onChange={handleComment}
          />
        </Box>

        {dataComment.map((comment: CommentPostInterface) => 
          <CommentComponent Comment={comment} />
        )}

      </Box>
    </Container>
  );
}
export default ViewPage;
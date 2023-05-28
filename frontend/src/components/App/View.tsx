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
import { grey } from '@mui/material/colors';
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

  const [previewImage, setPreviewImage] = React.useState<string>("/static/images/avatar/2.jpg");

  const [likeToggle, setLikeToggle] = React.useState<{normal: boolean, smile: boolean, very: boolean}>({normal: false, smile: false, very: false});
  const [likeColor, setLikeColor] = React.useState<{normal: string, smile: string, very: string}>({normal: 'grey', smile: 'grey', very: 'grey'});
  const [countLike, setCountLike] = React.useState<{normal: number, smile: number, very: number}>({normal: 0, smile: 0, very: 0});

  const [activeUserCurrentEmote, setActiveUserCurrentEmote] = React.useState("");

  const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id === "normal") {
      setEmotion(activeUserCurrentEmote, "normal")
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
      setEmotion(activeUserCurrentEmote, "smile")
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
      setEmotion(activeUserCurrentEmote, "very")
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

  function setEmotion(emote_prev: string, emote_curr: string) {
    let data = {
      Name_prev: emote_prev,
      Name_curr: emote_curr,
    };

    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/emotion/comment/${props.Comment.ID}/active`;
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setActiveUserCurrentEmote(emote_curr)
          // setSuccess(true);
        } else {
          // setError(true);
        }
      });
  }

  function getEmotions() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/emotion/comment/${props.Comment.ID}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCountLike({...countLike, normal: res.data.Normal, smile: res.data.Smile, very: res.data.Very});
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  function isUserEmotionComment() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/emotion/comment/${props.Comment.ID}/active`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          if (res.data.Emotional.Name == 'normal') {
            setLikeToggle({...likeToggle, normal: true})
            setLikeColor({...likeColor, normal: 'pink'})
            setActiveUserCurrentEmote('normal')
          } else if (res.data.Emotional.Name == 'smile') {
            setLikeToggle({...likeToggle, smile: true})
            setLikeColor({...likeColor, smile: 'pink'})
            setActiveUserCurrentEmote('smile')
          } else if (res.data.Emotional.Name == 'very') {
            setLikeToggle({...likeToggle, very: true})
            setLikeColor({...likeColor, very: 'pink'})
            setActiveUserCurrentEmote('very')
          }
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  React.useEffect(() => {
    if (props.Comment.UserComment.Image != "") {
      setPreviewImage(props.Comment.UserComment.Image)
    }
    getEmotions();
    isUserEmotionComment();
  }, []);

  return (
    <>
      <Box sx={{ ...commonStyles, marginTop: -2 }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={props.Comment.UserComment.Username} src={previewImage} />
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

  const [user, setUser] = React.useState<Partial<UserInterface>>({});
  const [previewImage, setPreviewImage] = React.useState<string>("/static/images/avatar/2.jpg");

  function getUser() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/user/${localStorage.getItem('id')}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUser((user) => {
            if (res.data.Image != "") {
              setPreviewImage(res.data.Image)
            }
            return {...user, ...res.data}
          })
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  const [post, setPost] = React.useState<PostInterface>();
  const [previewPostAuthorImage, setPreviewPostAuthorImage] = React.useState<string>("/static/images/avatar/2.jpg");
  const [previewPostImage, setPreviewPostImage] = React.useState<string>("");

  function getPost() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/post/${viewID}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPost((post) => {
            if (res.data.Author.Image != "") {
              setPreviewPostAuthorImage(res.data.Author.Image);
            }
            if (res.data.Image != "") {
              setPreviewPostImage(res.data.Image);
            }
            return res.data
          })
          // setSuccess(true);
        } else {
          // setError(true);
        }
      });
  }

  const [likeToggle, setLikeToggle] = React.useState(false);
  const [likeColor, setLikeColor] = React.useState('grey');
  const [countLike, setCountLike] = React.useState(0);

  const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    setLikeToggle((likeToggle) => {
      likeToggle = !likeToggle;
      if (likeToggle) {
        setCountLike((countLike) => {
          const newCountLike = countLike + 1;
          setLike();
          return newCountLike;
        });
        setLikeColor('pink');
      } else {
        setCountLike((countLike) => {
          const newCountLike = countLike - 1;
          setLike();
          return newCountLike;
        });
        setLikeColor('grey');
      }
      return likeToggle;
    });
  }

  function setLike() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/user/${localStorage.getItem("id")}/post/${viewID}`;
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  function getLike() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/post/${viewID}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCountLike(res.data.length)
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  function isUserLikePost() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/user/${localStorage.getItem("id")}/post/${viewID}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setLikeToggle(true)
          setLikeColor('pink')
          // setSuccess(true);
        } else {
          setLikeToggle(false)
          setLikeColor('grey')
          // setError(true);
        }
    });
  }

  const [comments, setComments] = React.useState<CommentPostInterface[]>([]);

  function getCommentPosts() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/comment/post/${viewID}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setComments(res.data)
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  const [editComment, setEditComment] = React.useState("");

  const handleComment = ((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditComment(e.target.value);
  })

  function onClickComment() {
    let data = {
      Comment: editComment,
    }

    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/comment/post/${post?.ID}`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload()
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  React.useEffect(() => {
    getUser();
    getPost();
    getLike();
    isUserLikePost();
    getCommentPosts();
  }, []);
 
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }} >
      <Box sx={{ display: 'block', justifyContent: 'center', width: "100%" }} >

        <Box sx={{ margin: '2em', padding: '1em' }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={post?.Author.Username} src={previewPostAuthorImage} />
            </IconButton>
            <Box>
              <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                {post?.Author.Username}
              </Typography>
              <Typography variant='body2' sx={{ marginLeft: 1 }} color={ grey[500] }>
                {Moment(post?.Create_at).format('D MMM YYYY HH:mm')}
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
            {post?.Title}
          </Typography>
          <Typography variant='body1' >
            {post?.Subject}  
          </Typography>
          <Box sx={{ marginTop: 1, width: 2 }}>
            <img width="200" src={previewPostImage} />
          </Box>
        </Box>

        <Box sx={{ marginLeft: '2em' }}>
          <Typography variant='h5'>
            <b>Comments</b>
          </Typography>
        </Box>

        <Box sx={{ ...commonStyles, marginTop: 0.5, maxHeight: "100%", overflow: "auto" }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={user.Username} src={previewImage} />
            </IconButton>
            <Box sx={{ display: 'flex', marginTop: 1 }}>
              <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                {user.Username}
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

        {comments.map((comment: CommentPostInterface) => 
          <CommentComponent Comment={comment} />
        )}

      </Box>
    </Container>
  );
}
export default ViewPage;
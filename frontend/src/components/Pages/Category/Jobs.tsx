import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Moment from 'moment';

import { PostInterface } from '../../../models/IPost';


interface DataPostInterface {
  Post: PostInterface
}

function PostComponent(props: DataPostInterface) {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '700px',
    height: '255px',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  const [previewImage, setPreviewImage] = React.useState<string>("/static/images/avatar/2.jpg");

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
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/user/${localStorage.getItem("id")}/post/${props.Post.ID}`;
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
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/post/${props.Post.ID}`;
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
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/user/${localStorage.getItem("id")}/post/${props.Post.ID}`;
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

  function handleReadMore() {
    window.location.href = '/view/' + props.Post.ID;
  }

  React.useEffect(() => {
    if (props.Post.Author.Image != "") {
      setPreviewImage(props.Post.Author.Image)
    }
    getLike()
    isUserLikePost()
  }, [])

  return (
    <>
      <Box sx={{ ...commonStyles }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={props.Post.Author.Username} src={previewImage} />
          </IconButton>
          <Box>
            <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
              {props.Post.Author.Username}
            </Typography>
            <Typography variant='body2' sx={{ marginLeft: 1 }} color={ grey[500] }>
              {Moment(props.Post.Create_at).format('D MMM YYYY HH:mm')}
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
              <FavoriteIcon sx={{ color: likeColor }} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1 }}>
          {props.Post.Title}
        </Typography>
        <Typography variant='body1' sx={{ overflow: "hidden", textOverflow: "ellipsis", height: '75px' }}>
          {props.Post.Preview}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Chip 
            label={props.Post.Category.Name} 
            sx={{ marginLeft: -0.75 }}
            onClick={() => window.location.href = `/${props.Post.Category.Name}`} 
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            sx={{ justifyContent: 'flex-end' }}
            onClick={handleReadMore}
          >
            Read More
          </Button>
        </Box>
      </Box>
    </>
  )
}

function JobsPage() {

  const PageName = "Jobs";
  const [category, setCategory] = React.useState(0);

  function getCategory() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/category`;
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
        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].Name === PageName) {
            setCategory((category) => {
              getPosts(res.data[i].ID)
              return res.data[i].ID
            });
          }
        }
      });
  }

  const [posts, setPosts] = React.useState<PostInterface[]>([]);

  function getPosts(id: number) {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/posts/category/${id}`;
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
          setPosts(res.data)
          // setSuccess(true);
        } else {
          // setError(true);
        }
      });
  }

  React.useEffect(() => {
    getCategory()
  }, [])

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

          {posts.map((data: PostInterface) => 
            <PostComponent Post={data}  />
          )}

      </Box>
    </Container>
  );
}
export default JobsPage;
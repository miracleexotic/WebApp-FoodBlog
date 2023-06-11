import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red, blue } from '@mui/material/colors';
import Moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import { PostInterface } from '../../models/IPost';
import { UserInterface } from '../../models/IUser';
import moment from 'moment';


const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

interface DataPostInterface {
  Post: PostInterface
}

function PostComponent(props: DataPostInterface) {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '700px',
    height: '265px',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  const [previewPostAuthorImage, setPreviewPostAuthorImage] = React.useState<string>("/static/images/avatar/2.jpg");

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

  function handleEdit() {
    window.location.href = '/edit/' + props.Post.ID;
  }

  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(false);
  const handleDeleteClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSuccess(false);
    setDeleteError(false);
  };

  function handleDelete() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/post/${props.Post.ID}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDeleteSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setDeleteError(true);
        }
    });
  }

  React.useEffect(() => {
    if (props.Post.Author.Image != "") {
      setPreviewPostAuthorImage(props.Post.Author.Image)
    }
    getLike()
    isUserLikePost();
  }, [])

  return (
    <>
      <Snackbar open={deleteSuccess} autoHideDuration={6000} onClose={handleDeleteClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleDeleteClose} severity="success">
          ลบโพสต์สำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={deleteError} autoHideDuration={6000} onClose={handleDeleteClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleDeleteClose} severity="error">
          ลบโพสต์ไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Box sx={{ ...commonStyles }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={props.Post.Author.Username} src={previewPostAuthorImage} />
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
        <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", height: '45px' }}>
          {props.Post.Title}
        </Typography>
        <Typography variant='body1' sx={{ overflow: "hidden", textOverflow: "ellipsis", height: '70px' }}>
          {props.Post.Preview}
        </Typography>
        <Box sx={{ display: 'flex', marginTop: 0.5 }} >
          <Chip 
            label={props.Post.Category.Name} 
            onClick={() => window.location.href = `/${props.Post.Category.Name}`} 
            sx={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: '#fff'}}
          />
          <Button 
            onClick={handleReadMore}
          >
              Read More
          </Button>
          <ThemeProvider theme={theme} >
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonGroup
                variant="contained"
              >
                <Button
                  color='primary'
                  variant="contained"
                  startIcon={<EditNoteIcon />}
                  onClick={handleEdit}
                  sx={{background: 'linear-gradient(90deg, #0c83e1 30%, #59b1f6 90%)'}}
                >
                  Edit
                </Button>
                <Button
                  color='secondary'
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  sx={{background: 'linear-gradient(90deg, #f20236 30%, #fe587c 90%)'}}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
    </>
  )
}

function ProfileComponent() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '700px',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

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
            if (res.data.image != "") {
              setPreviewImage(res.data.Image);
            }
            res.data.Password = "";
            return {...user, ...res.data}
          })
        } else {
          // setError(true);
        }
      });
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Box sx={{ ...commonStyles }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ textAlign:"center" }}>
            <IconButton>
              <Avatar alt={user.Username} src={previewImage} sx={{ width: 56, height: 56 }}/>
            </IconButton>
            <Typography variant='h3'>
              {user.Username}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ marginTop: 2 }}>
          <Chip label="Information"/>
        </Divider>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Fullname</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {user.Firstname+" "+user.Lastname}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Email</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {user.Email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Birthdate</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {moment(user.Birthdate).format('DD MMMM YYYY')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Career</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {user.Career}
            </Typography>
          </Box>
        </Box>

        <Divider />
      </Box>
    </>
  )

}

function ProfilePage() {

  const [posts, setPosts] = React.useState<PostInterface[]>([]);

  function getPosts() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/posts/active`;
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
    getPosts()
  }, [])

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

        <ProfileComponent />

        {posts.map((post: PostInterface) => 
          <PostComponent Post={post} />
        )}

      </Box>
    </Container>
  );
}
export default ProfilePage;
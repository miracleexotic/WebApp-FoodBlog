import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, blue, pink } from '@mui/material/colors';
import Moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { UserInterface } from '../../models/IUser';
import { PostInterface } from '../../models/IPost';
import { CategoryInterface } from '../../models/ICategory';
import Editor from '../Editor/Editor';


const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

function AddPage() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    boxShadow: '1px 2px 9px #9999',
    width: '700px',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const initEditor = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  function handlePublicClick() {
    console.log(post)
    
    let data = {
      ...post
    };

    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/post`;
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
          setSuccess(true);
          setTimeout(() => {
            localStorage.removeItem('postID');
            window.location.href = "/profile"
          }, 1500);
        } else {
          setError(true);
        }
      });
  }

  const [post, setPost] = React.useState<Partial<PostInterface>>({});

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id as keyof typeof user;
    const { value } = e.target;
    setPost({...post, [id]: value});
  }

  const [user, setUser] = React.useState<UserInterface>();
  const [previewAuthorImage, setPreviewAuthorImage] = React.useState<string>("");

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
              setPreviewAuthorImage(res.data.Image);
            }
            return {...user, ...res.data}
          })
          // setSuccess(true);
        } else {
          // setError(true);
        }
      });
  }

  const [categories, setCategory] = React.useState<CategoryInterface[]>([]);

  function handleCategoryChange(e: SelectChangeEvent) {
    const { value } = e.target;
    setPost({...post, Category: categories[+value - 1]});
  };

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
        if (res.data) {
          setCategory(res.data);
        } else {
          // setError(true);
        }
      });
  }

  React.useEffect(() => {
    localStorage.removeItem('postID');
    getUser();
    getCategory();
  }, []);

  return (
    <div>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          สร้างโพสต์สำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error">
          สร้างโพสต์ไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'block', justifyContent: 'center' }}>

          <Box sx={{ ...commonStyles }}>
            <Box sx={{ display: 'flex' }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt={user?.Username} src={previewAuthorImage} />
              </IconButton>
              <Box>
                <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                  {user?.Username}
                </Typography>
                <Typography variant='body2' sx={{ marginLeft: 1 }} color={ grey[500] }>
                  {Moment(new Date).format('D MMM YYYY HH:mm')}
                </Typography>
              </Box>
              <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="contained"
                    size="small"
                    sx={{ height: 30 }}
                    onClick={handlePublicClick}
                  >
                    Public
                  </Button>
                </Box>
              </ThemeProvider>
            </Box>
            <Box >
              <TextField 
                id="Title" 
                label="Title" 
                placeholder="Enter your title..."
                fullWidth
                required
                sx={{ marginTop: 3 }}
                onChange={handleInputChange}
              />
              <FormControl 
                fullWidth
                required
                variant="standard" 
                size="small"
                sx={{ marginTop: 1 }}
              >
                <InputLabel id="Category">Category</InputLabel>
                <Select
                  id="Category"
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {categories.map((category: CategoryInterface) => 
                    <MenuItem value={category.ID}>{category.Name}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box >
              <Editor post={post} setPost={setPost} content={initEditor}/>
            </Box>
          </Box>

        </Box>
      </Container>
    </div>
  );
}
export default AddPage;
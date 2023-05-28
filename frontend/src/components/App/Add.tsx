import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, blue, pink } from '@mui/material/colors';
import Moment from 'moment';

import { UserInterface } from '../../models/IUser';
import { PostInterface } from '../../models/IPost';


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

  const [currentImage, setCurrentImage] = React.useState<{name: string}>();
  const [previewImage, setPreviewImage] = React.useState<string>("");
  
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };

  function handlePublicClick() {
    fetch(previewImage)
        .then((res) => res.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {

                let data = {
                  ...post,
                  Image: reader.result
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
                      window.location.href = "/profile"
                      // setSuccess(true);
                    } else {
                      // setError(true);
                    }
                  });
            };
            reader.readAsDataURL(blob);
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

  React.useEffect(() => {
    getUser();
  }, []);

  return (
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
              placeholder="Enter your title."
              fullWidth
              sx={{ marginTop: 3 }}
              onChange={handleInputChange}
            />
          </Box>
          <Box >
            <TextField
              id="Subject"
              label="Subject"
              placeholder="Tell your story."
              multiline
              fullWidth
              rows={10} 
              sx={{ marginTop: 1 }}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ marginTop: 1 }}>
            <input type='file' multiple accept='image/*'
              onChange={selectImage}
            />
            <Box sx={{ marginTop: 1, width: 2 }}>
              <img width="200" src={previewImage} />
            </Box>
          </Box>
        </Box>

      </Box>
    </Container>
  );
}
export default AddPage;
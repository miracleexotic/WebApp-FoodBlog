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

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

        <Box sx={{ ...commonStyles }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Nutthawat Boonsodakorn" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Box>
              <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                Nutthawat Boonsodakorn
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
                >
                  Public
                </Button>
              </Box>
            </ThemeProvider>
          </Box>
          <Box >
            <TextField 
              id="title" 
              label="Title" 
              placeholder="Enter your title."
              fullWidth
              sx={{ marginTop: 3 }}
            />
          </Box>
          <Box >
            <TextField
              id="subject"
              label="Subject"
              placeholder="Tell your story."
              multiline
              fullWidth
              rows={10} 
              sx={{ marginTop: 1 }}
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
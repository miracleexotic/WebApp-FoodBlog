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

function SettingPage() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    boxShadow: '1px 2px 9px #9999',
    width: '400px',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  const [username, setUsername] = React.useState("Nutthawat Boonsodakorn");

  const [currentImage, setCurrentImage] = React.useState<{name: string}>();
  const [previewImage, setPreviewImage] = React.useState<string>("/static/images/avatar/2.jpg");
  
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

        <Box sx={{ ...commonStyles }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginBottom: 6 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={username} src={previewImage} />
            </IconButton>
            <Box>
              <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                {username}
              </Typography>
              <Typography variant='body2' sx={{ marginLeft: 1 }} color={ grey[500] }>
                14 May 2023 00:32
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: 1 }}>
            <TextField 
              id="Username" 
              label="Username" 
              placeholder="Enter new username."
              value={username}
              fullWidth
              sx={{ marginTop: 1 }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ marginTop: 1 }}>
            <Typography variant='subtitle2'>
                Upload your picture.
            </Typography>
            <input type='file' multiple accept='image/*'
              onChange={selectImage}
            />
          </Box>
          <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, display: 'flex', marginTop: 1.5 }}>
              <Button 
                variant="contained"
                size="small"
                sx={{ height: 30 }}
                color='secondary'
                fullWidth
              >
                Save
              </Button>
            </Box>
          </ThemeProvider>
        </Box>

      </Box>
    </Container>
  );
}
export default SettingPage;
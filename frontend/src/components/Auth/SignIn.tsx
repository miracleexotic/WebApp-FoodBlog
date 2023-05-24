import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, blue } from '@mui/material/colors';

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

function SignInPage() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '300px',
    height: '400px',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '2.5em',
    borderRadius: '16px'
  };

  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ ...commonStyles }}>
        <Typography variant='h4' sx={{ marginTop: 2, marginBottom: 1 }}>
          Sign In
        </Typography>

        <Typography variant='subtitle1' sx={{ marginTop: 3 }}>
          Email
        </Typography>
        <TextField 
          id="email" 
          // label="Email" 
          variant="outlined" 
          sx={{ display: 'flex' }}
          required
        />

        <Typography variant='subtitle1' sx={{ marginTop: 1 }}>
          Password
        </Typography>
        <TextField 
          id="password" 
          // label="Password" 
          variant="outlined" 
          sx={{ display: 'flex' }}
          type="password"
          required
        />
        
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 3 }}>
            <Button 
              variant="contained"
              onClick={() => {
                localStorage.setItem('token', 'value');
                window.location.reload();
              }}
            >
              SIGN IN
            </Button>
          </Box>
        </ThemeProvider>

        <Box sx={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'block', justifyContent: 'center' }}>
            <Typography variant='subtitle2' >
              Or Sign Up Using
            </Typography>
            <a href="/register" >
              <Button 
                variant="text"
                sx={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", marginTop: 2 }}
              >
                SIGN UP
              </Button>
            </a>
          </Box>
        </Box>

      </Box>
    </Container>
    </div>
  );
}
export default SignInPage;
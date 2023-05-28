import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, blue } from '@mui/material/colors';
import { UserInterface } from '../../models/IUser';

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

function SignUpPage() {
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

  const [user, setUser] = React.useState<Partial<UserInterface>>({});

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id as keyof typeof user;
    const { value } = e.target;
    setUser({...user, [id]: value});
  }

  function handleSignUpClick() {
    let data = {
      Email: user.Email ?? "",
      Password: user.Password ?? "",
    };

    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/signup`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ ...commonStyles }}>
        <Typography variant='h4' sx={{ marginTop: 2, marginBottom: 1 }}>
          Sign Up
        </Typography>

        <Typography variant='subtitle1' sx={{ marginTop: 3 }}>
          Email
        </Typography>
        <TextField 
          id="Email" 
          // label="Email" 
          variant="outlined" 
          sx={{ display: 'flex' }}
          required
          onChange={handleInputChange}
        />

        <Typography variant='subtitle1' sx={{ marginTop: 1 }}>
          Password
        </Typography>
        <TextField 
          id="Password" 
          // label="Password" 
          variant="outlined" 
          sx={{ display: 'flex' }}
          type="password"
          required
          onChange={handleInputChange}
        />
        
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 3 }}>
            <Button 
              variant="contained"
              onClick={handleSignUpClick}
            >
              SIGN UP
            </Button>
          </Box>
        </ThemeProvider>

        <Box sx={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'block', justifyContent: 'center' }}>
            <Typography variant='subtitle2' >
              Already a user?
            </Typography>
            <a href="/" >
              <Button 
                variant="text"
                sx={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", marginTop: 2 }}
              >
                SIGN IN
              </Button>
            </a>
          </Box>
        </Box>

      </Box>
    </Container>
    </div>
  );
}
export default SignUpPage;
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, blue } from '@mui/material/colors';

import { UserInterface } from '../../../models/IUser';

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

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const [user, setUser] = React.useState<Partial<UserInterface>>({});

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id as keyof typeof user;
    const { value } = e.target;
    setUser({...user, [id]: value});
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleSignInClick() {
    let data = {
      Email: user.Email ?? "",
      Password: user.Password ?? "",
    };

    const apiUrl = process.env.REACT_APP_BACKEND_API+'/signin';
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
          setSuccess(true);
          setTimeout(() => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            window.location.href = "/"
          }, 1500);
        } else {
          setError(true);
        }
      });
  }

  return (
    <div>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error">
          อีเมลหรือรหัสผ่านไม่ถูกต้อง
        </Alert>
      </Snackbar>
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
            <FormControl variant="outlined" sx={{ display: 'flex' }}>
              <OutlinedInput
                id="Password" 
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                required
                onChange={handleInputChange}
              />
            </FormControl>
            
            <ThemeProvider theme={theme}>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: 3 }}>
                <Button 
                  variant="contained"
                  onClick={handleSignInClick}
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
    </div>
  );
}
export default SignInPage;
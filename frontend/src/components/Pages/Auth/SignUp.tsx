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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, blue } from '@mui/material/colors';
import moment from 'moment';

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

function SignUpPage() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '400px',
    height: '600px',
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
  const [birthdate, setBirthdate] = React.useState<Date | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id as keyof typeof user;
    const { value } = e.target;
    setUser({...user, [id]: value});
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [confirmPassword, setConfirmPassword] = React.useState(true);
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != user.Password) {
      setConfirmPassword(false);
    } else {
      setConfirmPassword(true);
    }
  }

  function handleSignUpClick() {
    let data = {
      ...user,
      Birthdate: moment(birthdate).format("YYYY-MM-DDTHH:mm:ssZ"),
    };

    console.log(data)

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
          window.location.href = "/"
          setSuccess(true);
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
          สมัครสมาชิกสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error">
          สมัครสมาชิกไม่สำเร็จ
        </Alert>
      </Snackbar>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ ...commonStyles }}>
            <Typography variant='h4' >
              Sign Up
            </Typography>

            <Box sx={{ display: 'flex', marginTop: 4 }}>
              <Box sx={{ marginRight: 0.5 }}>
                <TextField 
                  id="Firstname" 
                  label="Firstname" 
                  variant="outlined" 
                  size="small"
                  required
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ marginLeft: 0.5 }}>
                <TextField 
                  id="Lastname" 
                  label="Lastname" 
                  variant="outlined" 
                  size="small"
                  required
                  onChange={handleInputChange}
                />
              </Box>
            </Box>

            <LocalizationProvider dateAdapter={AdapterMoment} >
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  label="Birthdate Picker"
                  sx={{ display: 'flex', flexGrow: 1 }}
                  value={birthdate} 
                  onChange={(newValue) => setBirthdate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>

            <TextField 
              id="Career" 
              label="Career"
              variant="outlined" 
              size="small"
              sx={{ display: 'flex', marginTop: 1 }}
              onChange={handleInputChange}
            />

            <TextField 
              id="Username" 
              label="Username" 
              variant="outlined" 
              size="small"
              sx={{ display: 'flex', marginTop: 1 }}
              required
              onChange={handleInputChange}
            />

            <Typography variant='subtitle1' sx={{ marginTop: 1 }}>
              Email
            </Typography>
            <TextField 
              id="Email" 
              variant="outlined" 
              size="small"
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
                size="small"
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

            <Typography variant='subtitle1' sx={{ marginTop: 1 }}>
              Confirm Password
            </Typography>
            <FormControl variant="outlined" sx={{ display: 'flex' }}>
              <OutlinedInput
                id="Password" 
                size="small"
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
                onChange={handleConfirmPassword}
                error={!confirmPassword}
              />
            </FormControl>
            
            <ThemeProvider theme={theme}>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: 3, marginBottom: 1 }}>
                <Button 
                  variant="contained"
                  onClick={handleSignUpClick}
                >
                  SIGN UP
                </Button>
              </Box>
            </ThemeProvider>

            <Box sx={{ marginTop: 0.5, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'block', justifyContent: 'center' }}>
                <Typography variant='subtitle2' >
                  Already a user?
                </Typography>
                <a href="/" >
                  <Button 
                    variant="text"
                    sx={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", marginTop: 1.5 }}
                  >
                    SIGN IN
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
export default SignUpPage;
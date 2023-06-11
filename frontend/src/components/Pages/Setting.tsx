import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, blue, pink } from '@mui/material/colors';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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

function SettingPage() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    boxShadow: '1px 2px 9px #9999',
    width: '410px',
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

  const [currentImage, setCurrentImage] = React.useState<{name: string}>();
  const [previewImage, setPreviewImage] = React.useState<string>("/static/images/avatar/2.jpg");
  
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };

  function handleSaveClick() {
    fetch(previewImage)
        .then((res) => res.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {

                let data = {
                  User: {
                    ...user,
                    Birthdate: birthdate != null ? moment(birthdate).format("YYYY-MM-DDTHH:mm:ssZ") : user.Birthdate,
                    Image: reader.result
                  },
                  NewPassword: (confirmPassword && newPassword != "") ? newPassword : user.Password
                };

                console.log(data)
            
                const apiUrl = `${process.env.REACT_APP_BACKEND_API}/user/${localStorage.getItem('id')}`;
                const requestOptions = {
                  method: "PATCH",
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
                        if (confirmPassword && newPassword != "") {
                          localStorage.clear();
                          window.location.href = "/"
                        } else {
                          window.location.reload();
                        }
                      }, 1500);
                    } else {
                      setError(true);
                    }
                  });
            };
            reader.readAsDataURL(blob);
        });

  }

  const [user, setUser] = React.useState<Partial<UserInterface>>({});
  const [birthdate, setBirthdate] = React.useState<Date | null | undefined>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id as keyof typeof user;
    const { value } = e.target;
    setUser({...user, [id]: value});
  }

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

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [newPassword, setNewPassword] = React.useState("");
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }

  const [confirmPassword, setConfirmPassword] = React.useState(true);
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != newPassword) {
      setConfirmPassword(false);
    } else {
      setConfirmPassword(true);
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          แก้ไขโปรไฟล์สำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error">
          แก้ไขโปรไฟล์ไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'block', justifyContent: 'center' }}>

          <Box sx={{ ...commonStyles }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginBottom: 6 }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt={user.Username} src={previewImage} />
              </IconButton>
              <Box>
                <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                  {user.Username}
                </Typography>
                <Typography variant='body2' sx={{ marginLeft: 1 }} color={ grey[500] }>
                  {moment(new Date).format('D MMM YYYY HH:mm')}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ marginTop: 1 }}>
              <TextField 
                id="Username" 
                label="Username"
                placeholder="Enter new username."
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginTop: 1 }}
                value={user.Username}
                fullWidth
                onChange={handleInputChange}
              />
            </Box>

            <Box sx={{ display: 'flex', flexGrow: 1, marginTop: 1.5 }}>
              <Box sx={{ marginRight: 0.5 }}>
                <TextField 
                  id="Firstname" 
                  label="Firstname" 
                  variant="outlined" 
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={user.Firstname}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ marginLeft: 0.5 }}>
                <TextField 
                  id="Lastname" 
                  label="Lastname"
                  variant="outlined" 
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={user.Lastname}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>

            <TextField 
              id="Original Birthdate" 
              label="Original Birthdate"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginTop: 1.5 }}
              value={moment(user?.Birthdate).format("DD/MM/YYYY")}
              fullWidth
              disabled
            />
            <LocalizationProvider dateAdapter={AdapterMoment} >
              <DemoContainer components={['DatePicker']} >
                <DatePicker 
                  label="Change Birthdate"
                  format='DD/MM/YYYY'
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
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ display: 'flex', marginTop: 1.5 }}
              value={user.Career}
              onChange={handleInputChange}
            />

            <Box sx={{ marginTop: 1 }}>
              <Typography variant='subtitle2'>
                  Upload your picture.
              </Typography>
              <input type='file' multiple accept='image/*'
                onChange={selectImage}
              />
            </Box>

            <Box sx={{ marginTop: 1 }}>
              <Accordion 
                expanded={expanded === 'panel-Advanced-settings'} 
                onChange={handleChange('panel-Advanced-settings')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '50%', flexShrink: 0 }}>
                    Advanced settings
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Change Password.</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField 
                    id="Email" 
                    label="Email"
                    variant="outlined" 
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ display: 'flex' }}
                    value={user.Email}
                    helperText="*Can't change email - use for identifier your account."
                    disabled
                  />

                  <Typography variant='subtitle1' sx={{ marginTop: 1 }}>
                    Change Password
                  </Typography>
                  <FormControl variant="outlined" sx={{ display: 'flex', marginTop: 1 }}>
                    <InputLabel htmlFor="Password">Old Password</InputLabel>
                    <OutlinedInput
                      id="Password" 
                      label="Old Password"
                      type="password"
                      required
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ display: 'flex', marginTop: 1 }}>
                    <InputLabel htmlFor="Password">New Password</InputLabel>
                    <OutlinedInput
                      id="Password" 
                      label="New Password"
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
                      onChange={handleNewPasswordChange}
                    />
                  </FormControl>

                  <FormControl variant="outlined" sx={{ display: 'flex', marginTop: 1 }}>
                    <InputLabel htmlFor="Password" error={!confirmPassword}>Confirm New Password</InputLabel>
                    <OutlinedInput
                      id="Password" 
                      label="Confirm New Password"
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
                </AccordionDetails>
              </Accordion>
            </Box>

            <ThemeProvider theme={theme}>
              <Box sx={{ flexGrow: 1, display: 'flex', marginTop: 1.5 }}>
                <Button 
                  variant="contained"
                  size="small"
                  sx={{ height: 30 }}
                  color='secondary'
                  fullWidth
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
              </Box>
            </ThemeProvider>

          </Box>

        </Box>
      </Container>
    </div>
  );
}
export default SettingPage;
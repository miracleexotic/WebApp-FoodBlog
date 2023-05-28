import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddIcon from '@mui/icons-material/Add';
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

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            if (res.data.Image != "") {
              setPreviewImage(res.data.Image)
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

  const settings = [
    {title: 'Profile', onClick: () => {window.location.href = '/profile';}},
    {title: 'Settings', onClick: () => {window.location.href = '/setting';} },
    {title: 'Log out', onClick: () => {localStorage.clear(); window.location.href = '/';}}
  ];

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FOOD BLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <a href="/add" >
              <Button
                  key="Add Post"
                  variant="contained"
                  startIcon={<AddIcon />}
                  color='secondary'
              >
                Add Post
              </Button>
            </a>
          </Box>

          <Box sx={{ marginRight: 1 }}>
            <Typography variant='subtitle1'>
              {user.Username}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.Username} src={previewImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
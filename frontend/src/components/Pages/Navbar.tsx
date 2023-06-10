import * as React from 'react';
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
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';

import { CategoryInterface } from '../../models/ICategory';


const drawerWidth = 200;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
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

  const [categories, setCategories] = React.useState<CategoryInterface[]>([]);

  function getCategories() {
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
          setCategories(res.data);
          // setSuccess(true);
        } else {
          // setError(true);
        }
      });
  }

  React.useEffect(() => {
    getUser();
    getCategories();
  }, []);

  const settings = [
    { title: 'Profile', onClick: () => {window.location.href = '/profile';} },
    { title: 'Settings', onClick: () => {window.location.href = '/setting';} },
    { title: 'Log out', onClick: () => {localStorage.clear(); window.location.href = '/';} }
  ];

  return (
    <div>
    <CssBaseline />
    <ThemeProvider theme={theme}>
    <AppBar position="static" open={open}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
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
            <Button
                key="Add Post"
                variant="contained"
                startIcon={<AddIcon />}
                color='secondary'
                onClick={() => {
                  localStorage.removeItem('postID'); 
                  window.location.href="/add";
                }}
            >
              Add Post
            </Button>
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
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {categories.map((category: CategoryInterface) => (
          <ListItem key={category.ID} disablePadding
            onClick={() => window.location.href = `/${category.Name}`}
          >
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary={category.Name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
    </ThemeProvider>
    </div>
  );
}
export default Navbar;
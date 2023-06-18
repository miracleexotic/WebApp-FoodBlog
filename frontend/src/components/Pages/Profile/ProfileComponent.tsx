import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import moment from 'moment';

import { UserInterface } from '../../../models/IUser';


function ProfileComponent() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '700px',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
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
  
  React.useEffect(() => {
    getUser();
  }, []);
  
  return (
    <>
      <Box sx={{ ...commonStyles }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ textAlign:"center" }}>
            <IconButton>
              <Avatar alt={user.Username} src={previewImage} sx={{ width: 56, height: 56 }}/>
            </IconButton>
            <Typography variant='h3'>
              {user.Username}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ marginTop: 2 }}>
          <Chip label="Information" sx={{color: '#fff', background: 'linear-gradient(90deg, #3923a4 30%, #c9459c 90%)'}}/>
        </Divider>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Fullname</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {user.Firstname+" "+user.Lastname}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Email</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {user.Email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Birthdate</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {moment(user.Birthdate).format('DD MMMM YYYY')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1 }}>
          <Box sx={{ width: '50%', textAlign: 'right', marginRight: 1}}>
            <Typography>
              <b>Career</b>
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography>
              {user.Career}
            </Typography>
          </Box>
        </Box>

        <Divider />
      </Box>
    </>
  )
}
export default ProfileComponent;
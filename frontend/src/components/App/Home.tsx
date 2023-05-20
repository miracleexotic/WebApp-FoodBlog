import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { grey, pink } from '@mui/material/colors';

function Home() {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '700px',
    height: '250px',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

        {/* 1 */}
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
                14 May 2023 00:32
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ marginTop: 1.5, marginRight: 1, color: '#6e6e6e' }}>
                99
              </Typography>
              <IconButton sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}>
                <FavoriteBorderIcon sx={{ color: 'pink' }}/>
              </IconButton>
            </Box>
          </Box>
          <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1 }}>
            Heading
          </Typography>
          <Typography variant='body1' sx={{ overflow: "hidden", textOverflow: "ellipsis", height: '100px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button >
              Read More
            </Button>
          </Box>
        </Box>

        {/* 2 */}
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
                14 May 2023 00:32
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ marginTop: 1.5, marginRight: 1, color: '#6e6e6e' }}>
                99
              </Typography>
              <IconButton sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}>
                <FavoriteBorderIcon sx={{ color: 'pink' }}/>
              </IconButton>
            </Box>
          </Box>
          <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1 }}>
            Heading
          </Typography>
          <Typography variant='body1' sx={{ overflow: "hidden", textOverflow: "ellipsis", height: '100px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button >
              Read More
            </Button>
          </Box>
        </Box>

        {/* 3 */}
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
                14 May 2023 00:32
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ marginTop: 1.5, marginRight: 1, color: '#6e6e6e' }}>
                99
              </Typography>
              <IconButton sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}>
                <FavoriteIcon sx={{ color: 'pink' }}/>
              </IconButton>
            </Box>
          </Box>
          <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1 }}>
            Heading
          </Typography>
          <Typography variant='body1' sx={{ overflow: "hidden", textOverflow: "ellipsis", height: '100px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button >
              Read More
            </Button>
          </Box>
        </Box>

      </Box>
    </Container>
  );
}
export default Home;
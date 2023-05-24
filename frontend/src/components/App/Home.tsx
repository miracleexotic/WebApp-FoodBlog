import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { grey, pink } from '@mui/material/colors';
import Moment from 'moment';

import { UserInterface } from '../../models/IUser';
import { PostInterface } from '../../models/IPost';


interface DataPostInterface {
  Post: PostInterface
}

function PostComponent(props: DataPostInterface) {
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

  const [likeToggle, setLikeToggle] = React.useState(false);
  const [likeColor, setLikeColor] = React.useState('grey');
  const [countLike, setCountLike] = React.useState(10);

  const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    setLikeToggle((likeToggle) => {
      likeToggle = !likeToggle;
      if (likeToggle) {
        setCountLike((countLike) => {
          const newCountLike = countLike + 1;
          setLike(newCountLike);
          return newCountLike;
        });
        setLikeColor('pink');
      } else {
        setCountLike((countLike) => {
          const newCountLike = countLike - 1;
          setLike(newCountLike);
          return newCountLike;
        });
        setLikeColor('grey');
      }
      return likeToggle;
    });
  }

  function setLike(like: number) {
    console.log(like);
  }

  function getLike() {
    setCountLike(countLike)
  }

  function handleReadMore() {
    window.location.href = '/view/' + props.Post.ID;
  }

  React.useEffect(() => {
    getLike()
  }, [])

  return (
    <>
      <Box sx={{ ...commonStyles }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={props.Post.Author.Username} src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Box>
            <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
              {props.Post.Author.Username}
            </Typography>
            <Typography variant='body2' sx={{ marginLeft: 1 }} color={ grey[500] }>
              {Moment(props.Post.Create_at).format('D MMM YYYY HH:mm')}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography sx={{ marginTop: 1.5, marginRight: 1, color: '#6e6e6e' }}>
              {countLike}
            </Typography>
            <IconButton 
              sx={{ p: 0, ":hover": {backgroundColor: 'transparent'} }}
              onClick={onLikeClick}
            >
              <FavoriteIcon sx={{ color: likeColor }} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1 }}>
          {props.Post.Title}
        </Typography>
        <Typography variant='body1' sx={{ overflow: "hidden", textOverflow: "ellipsis", height: '100px' }}>
          {props.Post.Subject}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            onClick={handleReadMore}
          >
            Read More
          </Button>
        </Box>
      </Box>
    </>
  )
}

function HomePage() {
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

  const user: UserInterface = {
    ID: 1,
    Email: "mai.nutthawat@gmail.com",
    Username: "Nutthawat Boonsodakorn",
    Password: "test",
    Image: "test"
  }

  const datas: PostInterface[] = [{
      ID: 1,
      Title: "Heading",
      Subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor",
      Image: "string",
      Create_at: new Date,
      Author: user
    },
    {
      ID: 2,
      Title: "Heading",
      Subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: "string",
      Create_at: new Date,
      Author: user
    },
    {
      ID: 3,
      Title: "Heading",
      Subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,  Lorem ipsum dolor sit amet",
      Image: "string",
      Create_at: new Date,
      Author: user
    },
  ]

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

          {datas.map((data: PostInterface) => 
            <PostComponent Post={data}  />
          )}

      </Box>
    </Container>
  );
}
export default HomePage;
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Moment from 'moment';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { PostInterface } from '../../../models/IPost';


interface DataPostInterface {
  Post: PostInterface
}

function PostComponent(props: DataPostInterface) {
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: '700px',
    height: '260px',
    boxShadow: '1px 2px 9px #9999',
    margin: '2em',
    padding: '1em',
    borderRadius: '16px'
  };

  const [previewImage, setPreviewImage] = React.useState<string>("/static/images/avatar/2.jpg");

  const [likeToggle, setLikeToggle] = React.useState(false);
  const [likeColor, setLikeColor] = React.useState('grey');
  const [countLike, setCountLike] = React.useState(0);

  const onLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    setLikeToggle((likeToggle) => {
      likeToggle = !likeToggle;
      if (likeToggle) {
        setCountLike((countLike) => {
          const newCountLike = countLike + 1;
          setLike();
          return newCountLike;
        });
        setLikeColor('pink');
      } else {
        setCountLike((countLike) => {
          const newCountLike = countLike - 1;
          setLike();
          return newCountLike;
        });
        setLikeColor('grey');
      }
      return likeToggle;
    });
  }

  function setLike() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/user/${localStorage.getItem("id")}/post/${props.Post.ID}`;
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
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

  function getLike() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/post/${props.Post.ID}`;
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
          setCountLike(res.data.length)
          // setSuccess(true);
        } else {
          // setError(true);
        }
    });
  }

  function isUserLikePost() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/like/user/${localStorage.getItem("id")}/post/${props.Post.ID}`;
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
          setLikeToggle(true)
          setLikeColor('pink')
          // setSuccess(true);
        } else {
          setLikeToggle(false)
          setLikeColor('grey')
          // setError(true);
        }
    });
  }

  function handleReadMore() {
    window.location.href = '/view/' + props.Post.ID;
  }

  React.useEffect(() => {
    if (props.Post.Author.Image != "") {
      setPreviewImage(props.Post.Author.Image)
    }
    getLike()
    isUserLikePost()
  }, [])

  return (
    <>
      <Box sx={{ ...commonStyles }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={props.Post.Author.Username} src={previewImage} />
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
        <Typography variant='h4' sx={{ marginTop: 3, marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", height: '45px' }}>
          {props.Post.Title}
        </Typography>
        <Typography variant='body1' sx={{ overflow: "hidden", textOverflow: "ellipsis", height: '75px' }}>
          {props.Post.Preview}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Chip 
            label={props.Post.Category.Name} 
            onClick={() => window.location.href = `/${props.Post.Category.Name}`} 
            sx={{ marginLeft: -0.75, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: '#fff'}}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            sx={{ justifyContent: 'flex-end' }}
            onClick={handleReadMore}
          >
            Read More
          </Button>
        </Box>
      </Box>
    </>
  )
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    width: '100%',   
  },
}));

function JobsPage() {

  const PageName = "Jobs";
  const [category, setCategory] = React.useState(0);

  function getCategory() {
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
        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].Name === PageName) {
            setCategory((category) => {
              getPosts(res.data[i].ID)
              return res.data[i].ID
            });
          }
        }
      });
  }

  const [posts, setPosts] = React.useState<PostInterface[]>([]);

  function getPosts(id: number) {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/posts/category/${id}`;
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
          setPosts((post) => {
            setFilteredList(res.data)
            return res.data
          })
          // setSuccess(true);
        } else {
          // setError(true);
        }
      });
  }

  const [openQuerySetting, setOpenQuerySetting] = React.useState(false);

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [startDate, setStartDate] = React.useState<Date | null | undefined>(null);
  const [endDate, setEndDate] = React.useState<Date | null | undefined>(null);

  const [query, setQuery] = React.useState({
    Search: "",
    From: {
      Title: true,
      Subject: true,
    },
    Category: {
      Reviews: true,
      Recipes: true,
      Jobs: true,
      Promote: true,
      Ask: true,

    }
  });

  const [filteredList, setFilteredList] = React.useState(posts);
  function filterBySearch() {
    var updatedList = [...posts];
    updatedList = updatedList.filter((item: PostInterface) => {
      return (
        ((query.From.Title   && item.Title.toLowerCase().indexOf(query.Search.toLowerCase()) !== -1) ||
         (query.From.Subject && item.Subject.toLowerCase().indexOf(query.Search.toLowerCase()) !== -1)) &&
       !((startDate != null  && Date.parse(startDate.toISOString()) > Date.parse(moment(item.Create_at).toISOString())) || 
         (endDate   != null  && Date.parse(endDate.toISOString()) < Date.parse(moment(item.Create_at).toISOString())))
      )
    });
    setFilteredList(updatedList);
  };

  React.useEffect(() => {
    filterBySearch();
  }, [query, startDate, endDate]);

  React.useEffect(() => {
    getCategory()
  }, [])

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

        <Box sx={{ width: '700px', height: '40px', boxShadow: '1px 2px 9px #9999', margin: '2em', padding: '1em', borderRadius: '20px' }}>
          <Box sx={{ display: 'flex', marginTop: '-0.4em'}}>
            <SearchIcon sx={{color: 'grey'}}/>
            <Box sx={{flexGrow: 1, marginTop: '-0.5em', marginLeft: 2}}>
              <StyledInputBase
                id="Search"
                placeholder="Search…"
                sx={{width: '100%'}}
                onChange={(e: any) => setQuery({...query, Search: e.target.value})}
                value={query.Search}
              />
            </Box>
            <IconButton sx={{marginTop: '-0.45em', marginRight: -1}}>
              <SettingsIcon 
                sx={{color: 'grey'}}
                onClick={() => setOpenQuerySetting(!openQuerySetting)}
              />
            </IconButton>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openQuerySetting}
            >
              <Box sx={{ background: 'black', width: '500px', boxShadow: '1px 2px 9px #9999', borderRadius: '20px', padding: 1 }}>
                <Box sx={{ display: 'flex', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', borderRadius: '20px' }} >
                  <SearchIcon sx={{color: '#fff', marginTop: 1, marginLeft: 1}}/>
                  <Box sx={{flexGrow: 1, marginTop: 0.2, marginLeft: 2}}>
                    <StyledInputBase
                      id="Search"
                      placeholder="Search…"
                      sx={{width: '100%'}}
                      onChange={(e: any) => setQuery({...query, Search: e.target.value})}
                      value={query.Search}
                    />
                  </Box>
                  <IconButton sx={{ marginTop: -0.25 }}
                    onClick={() => {
                      if (query.From.Title || query.From.Subject) {
                        setOpenQuerySetting(!openQuerySetting); 
                      }
                    }}
                  >
                    <CloseIcon sx={{color: '#fff'}} />
                  </IconButton>
                </Box>  

                <Box sx={{ marginTop: 1 }}>
                  <Accordion 
                    expanded={expanded === 'panel-Advanced-settings'} 
                    onChange={handleChange('panel-Advanced-settings')}
                    sx={{ background: 'linear-gradient(90deg, #2CD3E1 30%, #59b1f6 90%)', color: '#fff', borderRadius: '10px', }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }}/>}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: '50%', flexShrink: 0 }}>
                        Datetime Filter
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{background: '#fff', borderRadius: '0 0 4px 4px'}}
                    >
                      <Box>
                        <LocalizationProvider dateAdapter={AdapterMoment} >
                          <DemoContainer components={['DatePicker']} >
                            <DatePicker 
                              label="Start date"
                              format='DD/MM/YYYY'
                              sx={{ display: 'flex', flexGrow: 1 }}
                              value={startDate} 
                              onChange={(newValue) => setStartDate(newValue)}
                            />
                            <DatePicker 
                              label="End date"
                              format='DD/MM/YYYY'
                              sx={{ display: 'flex', flexGrow: 1 }}
                              value={endDate} 
                              onChange={(newValue) => setEndDate(newValue)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                      <Box sx={{ marginTop: 0.5, display: 'flex' }}>
                        <Button 
                          size='small'
                          variant="contained"
                          sx={{display: 'flex', flexGrow: 1}}
                          onClick={() => {
                            setStartDate(null)
                            setEndDate(null)
                          }}
                        >
                          Clear
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
            
                <Box sx={{display: 'flex', marginTop: 1}}>
                  <Box sx={{ marginLeft: 1.5, marginTop: 1, width: '40%', textAlign: 'left' }}>
                    <Typography>
                      Search from
                    </Typography>
                  </Box>
                  <Box>
                    <FormControl component="fieldset"
                      required
                      error={!(query.From.Title || query.From.Subject)}
                    >
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value="Title"
                          control={<Checkbox 
                            sx={{color: '#fff'}}
                            onChange={(e: any) => setQuery({ ...query, From: {...query.From, Title: e.target.checked}})}
                            checked={query.From.Title}
                          />}
                          label="Title"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Content"
                          control={<Checkbox
                            sx={{color: '#fff'}} 
                            onChange={(e: any) => setQuery({ ...query, From: {...query.From, Subject: e.target.checked}})}
                            checked={query.From.Subject}
                          />}
                          label="Content"
                          labelPlacement="end"
                        />
                      </FormGroup>
                      <FormHelperText sx={{color: '#fff'}}>*At least 1 or more filter.</FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
            
              </Box>
            </Backdrop>
          </Box>
        </Box>

        {filteredList.map((data: PostInterface) => 
          <PostComponent Post={data}  />
        )}

      </Box>
    </Container>
  );
}
export default JobsPage;
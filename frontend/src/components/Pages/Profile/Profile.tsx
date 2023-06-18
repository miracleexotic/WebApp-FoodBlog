import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ProfileComponent from './ProfileComponent';
import PostComponent from './PostComponent';
import FavoriteComponent from './FavoriteComponent';


interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 150,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    color: '#635ee7',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    sx: {
      display: 'flex', 
      flexGrow: 1, 
      width: '50%',
    }
  };
}

function ProfilePage() {

  const commonStyles = {
    width: '700px',
    margin: '0 0 0 2em',
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'block', justifyContent: 'center' }}>

        <ProfileComponent />

        <Box sx={{ ...commonStyles, marginTop: -2, borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs value={value} onChange={handleChange} >
            <StyledTab icon={<ArticleIcon />} iconPosition="start" label="My Post" {...a11yProps(0)} />
            <StyledTab icon={<FavoriteIcon />} iconPosition="start" label="My Favorite" {...a11yProps(1)} />
          </StyledTabs>
        </Box>
        <Box sx={{ marginLeft: 1 }}>
          <TabPanel value={value} index={0}>
            <PostComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FavoriteComponent />
          </TabPanel>
        </Box>

      </Box>
    </Container>
  );
}
export default ProfilePage;
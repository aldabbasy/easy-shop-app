import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import { useNavBarStyles } from './styled';
import UserContext from '../../contexts/UserContext';
import ThemeContext from '../../contexts/ThemeContext';

const NavBar = ({setQuery}) => {
  const classes = useNavBarStyles();
  const userData = useContext(UserContext);
  const {isDarkTheme, setIsDarkTheme} = useContext(ThemeContext);
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={'primary-search-account-menu-mobile'}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to='/' className={classes.link}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton aria-label="Home" color="inherit">
            <HomeRoundedIcon />
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </Link>
      <Link to='/cart' className={classes.link}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton aria-label="Cart" color="inherit">
            <ShoppingCartRoundedIcon />
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Link>
      <Link to='/logout' className={classes.link}>
        <MenuItem >
          <IconButton aria-label="Logout">
            <MeetingRoomRoundedIcon color={'error'} />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Link>
    </Menu>
  );

  useEffect(() => {
    userData.refetchUserData();
  }, [])

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color={isDarkTheme ? 'default': 'primary'}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            EasyShop
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => {setQuery(e.target.value.trim())}}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.usernameContainer} >
            <Typography className={classes.title} variant={'h6'} noWrap>
              {userData?.user_name}
            </Typography>
          </div>
          <IconButton aria-label="toggle-theme" onClick={() => {setIsDarkTheme(!isDarkTheme)}}>
              <Brightness4RoundedIcon />
          </IconButton>
          <div className={classes.sectionDesktop}>
            <Link to='/' className={classes.link}>
              <IconButton aria-label="Home" >
                <HomeRoundedIcon />
              </IconButton>
            </Link>
            <Link to='/cart' className={classes.link}>
              <IconButton aria-label="Cart" >
                <Badge badgeContent={userData?.cart_items_count} color="secondary">
                  <ShoppingCartRoundedIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link to='/logout' className={classes.link}>
              <IconButton aria-label="Logout">
                <MeetingRoomRoundedIcon color='error' />
              </IconButton>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={'primary-search-account-menu-mobile'}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
};

export default NavBar;

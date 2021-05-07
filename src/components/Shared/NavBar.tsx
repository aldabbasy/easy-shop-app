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
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import { useNavBarStyles } from './styled';
import UserContext from '../../contexts/UserContext';

const NavBar = () => {
  const classes = useNavBarStyles();
  const userData = useContext(UserContext);
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
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton aria-label="Home" color="inherit">
          <HomeRoundedIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton aria-label="Cart" color="inherit">
          <ShoppingCartRoundedIcon />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <Link to='/logout'>
        <MenuItem className={classes.logoutBtn} >
          <IconButton aria-label="Logout" color='inherit'>
            <MeetingRoomRoundedIcon />
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
      <AppBar position="static" color={'default'}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            EasyShop
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
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
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="Home" color="inherit">
              <HomeRoundedIcon />
            </IconButton>
            <IconButton aria-label="Cart" color="inherit">
              <Badge badgeContent={userData?.cart_items_count} color="secondary">
                <ShoppingCartRoundedIcon />
              </Badge>
            </IconButton>
            <Link to='/logout'>
              <IconButton aria-label="Logout" color='secondary'>
                <MeetingRoomRoundedIcon />
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

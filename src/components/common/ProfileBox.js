import React, { useState } from 'react';
import { Popover, Typography, Divider, List, ListItem, ListItemText, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import profile from "../../assets/images/profile.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import LoadingOverlay from './LoadingOverlay';

function ProfileBox() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  // Retrieve user data from local storage
  const userStoredData = JSON.parse(localStorage.getItem('userDetails'));


  const handleLogout = async () => {
    try {
      setIsLoading(true);
      toast.success("Signing Out!");
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      localStorage.clear();
      setIsLoading(false);
      setUser(null);
      navigate("/signin")
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {/* Display your profile circle here */}
        {/* You can use an Avatar component or a simple div */}
        <Avatar src={profile} alt="Your Name" sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }} />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* Profile card content */}
        <div style={{ width: 200, alignItems: 'center' }}>
          <div style={{ right: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="overline">Account</Typography>
            <Typography variant="body2">{userStoredData ? userStoredData?.emp_name : "User"}</Typography>
            <Box style={{ width: "100%", alignItems: "center", }}> <Divider ></Divider></Box>
            <List dense>
              <ListItem button
                onClick={handleLogout}
              >
                <ListItemText primary="Sign out" />
              </ListItem>
            </List>
          </div>
        </div>
      </Popover>
    </div>
  );
}

export default ProfileBox;

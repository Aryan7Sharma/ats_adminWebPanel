import React from 'react';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const LoadingOverlay = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <div className={classes.loadingContainer}>
        <CircularProgress color="inherit" />
        <p>Loading...</p>
      </div>
    </Backdrop>
  );
};

export default LoadingOverlay;

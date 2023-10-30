import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(2), 
    background: 'linear-gradient(to right, #BBD2C5, #536976)',
    //background: 'linear-gradient(45deg, rgba(34,164,116,1) 0%, rgba(41,47,143,1) 100%)',
    color: 'white',
  },
  button: {
    background: 'white',
    color: 'gray',
    marginTop: theme.spacing(2),
  },
}));

const InfoCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="div">
          Info Card Title
        </Typography>
        <Typography variant="body2">
          A brief description or summary goes here. It can be multiple lines if needed.
        </Typography>
        <Button variant="contained" className={classes.button}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

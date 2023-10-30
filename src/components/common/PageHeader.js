import React from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'
import Logo from "../../assets/images/company_logo.png";
import ProfileBox from './ProfileBox';
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#E4E5E6',
    },
    pageHeader: {
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#3c44b1',
        backgroundColor: '#E4E5E6'
    },
    pageTitle: {
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    },
    centeredImage: {
        width: '70%',
        display: 'flex',
        justifyContent: 'center'
    },
    centeredImageStyle: {
        height: 100,
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>{icon}</Card>
                <div className={classes.pageTitle}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {subTitle}
                    </Typography>
                </div>
                {/* Add the ProfileBox component here */}
                
                <div className={classes.centeredImage}>
                    <img className={classes.centeredImageStyle} src={Logo} alt="Centered Image" />
                </div>
                <ProfileBox />
            </div>
        </Paper>
    )
}

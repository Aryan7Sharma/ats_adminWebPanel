import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/index';
import { Container, Paper, Avatar, Typography, Button, Grid, Divider } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Toaster, toast } from 'react-hot-toast';
import LoadingOverlay from '../components/common/LoadingOverlay';
import { useAuth } from '../contexts/AuthContext';
import { CustomGetApi } from '../api';

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const getDashData = async () => {
        try {
            setIsLoading(true);
            const { data, error } = CustomGetApi('');
            if (data && !error) {

            } else {

            }
        } catch (err) {

        } finally {
            setIsLoading(false);
        }
    };
    const getUserDetails = async () => {
        try {
            const user = await JSON.parse(localStorage.getItem('userDetails'));
            if (user) {
                setUserDetails(user);
            }
            return
        } catch (err) {
        }
    }

    const handleLogout = () => {
        try {
            localStorage.clear();
            setUser(null);
            navigate("/signin")
            toast.success("Signed Out!");
        } catch (error) {
            toast.error("Something Went Wrong!");
        }
    };
    useEffect(() => {
        //getDashData();
        getUserDetails();
    }, [])
    return (
        <main style={{ display: 'flex' }}>
            {isLoading && <LoadingOverlay />}
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '20vw' }}>
                <Sidebar />
            </div>
            <div style={{ marginLeft: 240, width: '87vw', minHeight: '100vh', position: 'absolute', backgroundColor: '#dfe6e9' }}>
                <div style={{ position: 'relative' }}>
                    <div>
                        {/* main user profile */}
                        <div>
                            <Container maxWidth="s">
                                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#dfe6e9' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4}>
                                            <Avatar style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                                                <AccountCircleIcon style={{ width: '135px', height: '135px' }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="h4" gutterBottom>
                                                {userDetails?.emp_name}
                                            </Typography>
                                            <Typography variant="body1">
                                                {userDetails?.emp_emailid}
                                            </Typography>
                                            <Typography variant="body1">
                                                {userDetails?.emp_phoneno}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Divider style={{ margin: '20px 0' }} />

                                    <Typography variant="h5" gutterBottom>
                                        Personal Details
                                    </Typography>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <Typography variant="h5" gutterBottom>
                                        Admin Summary
                                    </Typography>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <Typography variant="h5" gutterBottom>
                                        Employees Summary
                                    </Typography>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <Typography variant="h5" gutterBottom>
                                        Attendance's Summary
                                    </Typography>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <Divider style={{ margin: '20px 0' }} />

                                    {/* Add a list of user's order history here */}

                                    <Divider style={{ margin: '20px 0' }} />
                                    <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="contained" color="primary"
                                            style={{ marginRight: '5px' }}
                                            onClick={() => window.alert("Currently is't not available for you!")}
                                        >

                                            Edit Profile
                                        </Button>
                                        <Button variant="contained" color="primary"
                                            style={{ marginLeft: '5px' }}
                                            onClick={handleLogout}
                                        >
                                            Sign-Out
                                        </Button>
                                    </Grid>
                                </Paper>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
};
export default UserProfile;

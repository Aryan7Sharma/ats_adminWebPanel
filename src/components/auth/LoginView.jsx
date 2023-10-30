import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

//import {useRouter} from '../../routes/hooks/index';

import { bgGradient } from '../../theme/css';

//import Logo from 'src/components/logo';
import Iconify from '../common/Iconify';

// ----------------------------------------------------------------------

export default function LoginView({setUserId, setPassword, handleSigin}) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const renderForm = (
        <>
            <div>
                <Stack spacing={3}>
                    <TextField name="email" label="Email address" 
                    onChange={(e) => setUserId(e.target.value)}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            maxLength: 16, // Adjust the maximum length as needed
                            minLength:8
                          }}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                    <Link variant="subtitle2" underline="hover">
                        Forgot password?
                    </Link>
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    onClick={handleSigin}
                >
                    SignIn
                </LoadingButton>
            </div>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
                background: 'linear-gradient(180deg, #DBE6F6 0%, #C5796D 100%)'
            }}
        >
            {/* <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            /> */}

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Sign in to ATS Admin Panel</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Don’t have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                            Get Request
                        </Link>
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                        >
                            <img
                                //srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={'./company_logo.png'}
                                //alt={item.title}
                                loading="lazy"
                            />
                            <Iconify icon="eva:facebook-fill" color="#1877F2" />
                        </Button>
                    </Stack>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            HAVI ATS Admin SignIn
                        </Typography>
                    </Divider>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import Drawer from '@mui/material/Drawer';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    sidebar: {
        background: 'linear-gradient(180deg, #DBE6F6 0%, #C5796D 100%)',
        color: 'black',
    },
    selectedMenuItemDesign: {
        background: 'blue', // Your professional blue color
        color: 'blue',
    },
}));

function Sidebar() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const [openDeptsSubmenu, setOpenDeptsSubmenu] = useState(false);
    const [openEmployeesSubmenu, setOpenEmployeesSubmenu] = useState(false);
    const [openSitesSubmenu, setOpenSitesSubmenu] = useState(false);
    const [openReportsSubmenu, setOpenReportsSubmenu] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

    // Add a function to handle menu item clicks
    const handleMenuItemClick = (item, url) => {
        setSelectedMenuItem(item);
        navigate(url);
    };



    return (
        <Drawer
            variant="permanent"
            anchor="left"
            classes={{
                paper: `${classes.drawer} ${classes.sidebar}`,
            }}
        >
            <List>
                <ListItem
                    button
                    selected={selectedMenuItem === 'Dashboard'}
                    onClick={() => handleMenuItemClick('Dashboard', '/')}
                    className={selectedMenuItem === 'Dashboard' ? classes.selectedMenuItemDesign : ''}
                >
                    <ListItemIcon>
                        <HomeIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setOpenDeptsSubmenu(!openDeptsSubmenu)}>
                    <ListItemIcon>
                        <CorporateFareIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary="Departments Section" />
                    {openDeptsSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Divider />
                <Collapse in={openDeptsSubmenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button
                            selected={selectedMenuItem === 'Manage Depts'}
                            onClick={() => handleMenuItemClick('Manage Depts', '/dept/managedepts')}
                            className={classes.nested}>
                            <ListItemIcon>
                                <RoomPreferencesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Manage Departments" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={() => setOpenEmployeesSubmenu(!openEmployeesSubmenu)}>
                    <ListItemIcon>
                        <PeopleAltIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary="Employees" />
                    {openEmployeesSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Divider />
                <Collapse in={openEmployeesSubmenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}
                            selected={selectedMenuItem === 'Manage Employees'}
                            onClick={() => handleMenuItemClick('Manage Employees', '/emp/manageemployees')}
                        >
                            <ListItemIcon>
                                <ManageAccountsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Manage Employees" />
                        </ListItem>
                        <ListItem button className={classes.nested}
                            selected={selectedMenuItem === 'Add New Employee'}
                            onClick={() => handleMenuItemClick('Add New Employee', '/emp/addemployee')}
                        >
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add New Employee" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={() => setOpenSitesSubmenu(!openSitesSubmenu)}>
                    <ListItemIcon>
                        <ShareLocationIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary="Sites" />
                    {openSitesSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Divider />
                <Collapse in={openSitesSubmenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button
                            selected={selectedMenuItem === 'Manage Sites'}
                            onClick={() => handleMenuItemClick('Manage Sites', '/site/managesites')}
                            className={classes.nested}>
                            <ListItemIcon>
                                <EditLocationAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Manage Sites" />
                        </ListItem>
                        <ListItem button className={classes.nested}
                            selected={selectedMenuItem === 'Add New Site'}
                            onClick={() => handleMenuItemClick('Add New Site', '/site/addsite')}
                        >
                            <ListItemIcon>
                                <AddLocationAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add New Site" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={() => setOpenReportsSubmenu(!openReportsSubmenu)}>
                    <ListItemIcon>
                        <FolderIcon fontSize={"large"} />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                    {openReportsSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Divider />
                <Collapse in={openReportsSubmenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            button
                            className={classes.nested}
                            selected={selectedMenuItem === 'Employee Attendance'}
                            onClick={() => handleMenuItemClick('Employee Attendance', '/rep/employeeAttenReport')}
                        >
                            <ListItemIcon>
                                <ContentPasteSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Employee Attendance" />
                        </ListItem>
                        <ListItem button className={classes.nested}
                            selected={selectedMenuItem === 'Consolidate Attendance Report'}
                            onClick={() => handleMenuItemClick('Consolidate Attendance Report', '/rep/employeesAttenSummReport')}
                        >
                            <ListItemIcon>
                                <SummarizeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Consolidate Attendance Report" />
                        </ListItem>
                        <ListItem button className={classes.nested}
                            selected={selectedMenuItem === 'All Employees Consolidated Report'}
                            onClick={() => handleMenuItemClick('All Employees Consolidated Report', '/rep/employeesAttenReport')}
                        >
                            <ListItemIcon>
                                <SummarizeIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Employees Consolidated Report" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
}

export default Sidebar;

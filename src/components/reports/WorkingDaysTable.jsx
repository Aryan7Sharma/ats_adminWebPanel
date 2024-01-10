import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import exportData from '../common/ExportToExcel';
import { StripedDataGrid } from '../common/constants/theme';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const workingDaysColumns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'year', headerName: 'YEAR', width: 100 },
    { field: 'month', headerName: 'MONTH', width: 100 },
    { field: 'working_days', headerName: 'Working Days', width: 300 },
];

const overlay = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', /* Semi-transparent background */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999', /* Ensure it's above other content */
}

const WorkingDaysTable = ({ allWorkingDays, updateWorkingDays }) => {
    const theme = createTheme();
    const workingDaysrows = allWorkingDays;
    const [selectedWorkingDaysRow, setSelectedWorkingDaysRow] = useState(null);
    const [openDialogOfWorkingDays, setOpenDialogOfWorkingDays] = useState(false);
    const [updatedWorkingDays, setUpdatedWorkingDays] = useState('');
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const handleExportToExcel = () => {
        exportData(workingDaysrows, workingDaysColumns);
    };

    const cancelupdationWorkingDays = () => {
        setOpenDialogOfWorkingDays(false);
        setRowSelectionModel([])
    };

    const updationWorkingDays = async () => {
        try {
            if (selectedWorkingDaysRow && selectedWorkingDaysRow < 12) {
                await updateWorkingDays(selectedWorkingDaysRow, updatedWorkingDays);
            } else {
                window.alert('You Did Not Select Any Row Yet.')
            }
        } catch (err) {
            window.alert('Failed!');
        } finally {
            setOpenDialogOfWorkingDays(false);
            setRowSelectionModel([]);
        }
    };
    const handleSelectionModelChange = (selectionModel) => {
        console.log("inside ", selectionModel);
        const selectedRowId = selectionModel?.length > 0 ? selectionModel[selectionModel.length - 1] : null;
        console.log(selectedRowId, "selectedRowId");
        setSelectedWorkingDaysRow(selectedRowId);
        if (selectedRowId) {
            setOpenDialogOfWorkingDays(true);
            setRowSelectionModel(selectedRowId);
        } else {
            setRowSelectionModel([]);
        }

    };

    return (
        <div style={{ backgroundColor: '#dfe6e9' }}>
            <h2 style={{ margin: 'auto' }}>Working Days Report Table:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div style={{ maxWidth: '84vw', margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20 }}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleExportToExcel()}
                        >
                            Export to Excel
                        </Button>
                        <Typography variant="h6">{`${new Date().getFullYear()} Working Days Report`}</Typography>
                        <Box >
                            <Box sx={{ mt: 1 }}>
                                {/* <ThemeProvider theme={theme}> */}
                                <DataGrid
                                    rows={workingDaysrows}
                                    columns={workingDaysColumns}
                                    getRowId={(row) => row._id}
                                    checkboxSelection
                                    // rowStyle={(params) => {
                                    //     if (params.rowIndex % 2 === 0) {
                                    //         return { backgroundColor: 'lightgray' }; // Even rows
                                    //     }
                                    //     return { backgroundColor: 'white' }; // Odd rows
                                    // }}
                                    // sx={{
                                    //     '& .MuiDataGrid-columnHeader': {
                                    //         backgroundColor: "lightgray",
                                    //         color: "white",
                                    //         fontWeight: 700,
                                    //     },
                                    // }}
                                    onRowSelectionModelChange={handleSelectionModelChange}
                                    rowSelectionModel={rowSelectionModel}
                                />
                                {openDialogOfWorkingDays && (
                                    <Box >
                                        <Dialog open={openDialogOfWorkingDays} onClose={() => setOpenDialogOfWorkingDays(false)}>
                                            <DialogTitle>Update Working Days</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    label="Updated Working Days"
                                                    type="number"
                                                    fullWidth
                                                    value={updatedWorkingDays}
                                                    onChange={(e) => setUpdatedWorkingDays(e.target.value)}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => cancelupdationWorkingDays()}>Cancel</Button>
                                                <Button onClick={() => updationWorkingDays()} variant="contained" color="primary">
                                                    Update
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Box>
                                )}

                                {/* </ThemeProvider> */}
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WorkingDaysTable;

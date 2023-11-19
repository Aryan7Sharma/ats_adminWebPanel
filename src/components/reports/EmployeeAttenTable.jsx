import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import exportData from '../common/ExportToExcel';
import { StripedDataGrid } from '../common/constants/theme';


const columns = [
    { field: 'Date', headerName: 'Date', width: 130 },
    { field: 'Day', headerName: 'Day', width: 130 },
    //{ field: 'Employee_Code', headerName: 'Employee_Code', width: 130 },
    //{ field: 'Employee_Name', headerName: 'Employee Name', width: 130 },
    //{ field: 'Employee_Designation', headerName: 'Employee Designation', width: 130 },
    { field: 'Punch_In_Time', headerName: 'Punch In Time', width: 130 },
    { field: 'PunchIn_Site_Address', headerName: 'PunchIn Site Address', width: 130 },
    {
        field: 'PunchIn_Distance_From_Exact_Location', headerName: 'PunchIn Distance From Exact Location', width: 130,
        valueGetter: (params) =>
            `${params.row.PunchIn_Distance_From_Exact_Location} Meters`
    },
    { field: 'PunchIn_Remark', headerName: 'PunchIn Remark', width: 130 },
    { field: 'Punch_Out_Time', headerName: 'Punch Out Time', width: 130 },
    { field: 'PunchOut_Site_Address', headerName: 'PunchOut Site Address', width: 130 },
    {
        field: 'PunchOut_Distance_From_Exact_Location', headerName: 'PunchOut Distance From Exact Location', width: 130,
        valueGetter: (params) =>
            `${params.row.PunchOut_Distance_From_Exact_Location} Meters`
    },
    { field: 'PunchOut_Remark', headerName: 'PunchOut Remark', width: 130 },
    { field: 'Weekly_OFF', headerName: 'Weekly OFF', width: 130 },
    { field: 'Working_hours_minutes', headerName: 'Working Hours', type: 'number', width: 130 },
    { field: 'Location_Error', headerName: 'Location Error', width: 130 },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];



const SmartSearchDropdown = ({ employees, startDate, setStartDate, endDate, setEndDate, emp, setEmp, getAttenRep1, empAttenRepo1 }) => {
    const rows = empAttenRepo1;
    const [selectedDate, setSelectedDate] = useState('2023-10-10');
    const [filter, setFilter] = useState("");
    const [openAutoComplete, setOpenAutoComplete] = useState(false);

    const handleExportToExcel = () => {
        exportData(rows, columns);
    };

    return (
        //backgroundColor: '#dfe6e9'
        <div style={{ backgroundColor: '#dfe6e9' }}>
            <h2 style={{ margin: 'auto' }}>Employee Attendance Report Table:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '40%', marginBottom: 5 }}>
                    <Autocomplete
                        open={openAutoComplete}
                        onOpen={() => setOpenAutoComplete(true)}
                        value={emp} // Use the controlled value
                        inputValue={filter}
                        onClose={() => setOpenAutoComplete(false)}
                        onChange={(event, newValue) => {
                            setEmp(newValue); // Update the controlled value
                        }}
                        onInputChange={(event, newInputValue) => setFilter(newInputValue)}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={employees}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Employee via Searching"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps
                                }}
                            />
                        )}
                    />
                </div>
                <div style={{ width: '40%', marginBlock: 5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => getAttenRep1()}
                >
                    Search
                </Button>
                <div>
                    <div style={{ maxWidth: '84vw', margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20 }}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleExportToExcel()}
                        >
                            Export to Excel
                        </Button>
                        {rows[0] && (<Typography variant="h6">{rows ? `Attendance Report of ${rows[0]?.Employee_Designation || " "} ${rows[0]?.Employee_Name || " "}   --   Employee Code(${rows[0]?.Employee_Code || ""})` : ""}</Typography>)}
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.id}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 31 },
                                },
                            }}
                            pageSizeOptions={[30, 31]}
                            checkboxSelection
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartSearchDropdown;

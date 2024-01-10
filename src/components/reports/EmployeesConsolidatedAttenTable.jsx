import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import exportData from '../common/ExportToExcel';
import { StripedDataGrid } from '../common/constants/theme';
import { dateToDayName, dateToDayMonthName, validateEmployeeCheckIn, validateEmployeeCheckOut, convertMinutesInHM } from "../../utils/DateConvertor";
import { createTheme, ThemeProvider } from '@mui/material/styles';



const EmployeesConsolidatedAttenTable = ({ startDate, setStartDate, endDate, setEndDate, empAttenRepo1, attensDates, getEmployeesConsolidatedAttendanceReport }) => {
    const theme = createTheme();
    const empsConsolidatedAttenTableColumns = [
        { field: 'e_code', headerName: 'E-Code', width: 100 },
        { field: 'employee_name', headerName: 'Employee Name', width: 200 },
        { field: 'degination', headerName: 'Degination', width: 130 },
        { field: 'doj', headerName: 'DOJ', width: 100 },
        { field: 'total_working_days', headerName: 'Total Working Days', width: 150 },
        { field: 'total_late_days', headerName: 'Late', width: 150 },
        { field: 'total_week_off', headerName: 'Week Off', width: 150 },
        {
            field: 'total_working_time', headerName: 'Working Hours', width: 150, renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: "lightblue", padding: '8px',
                    }}
                >
                    {convertMinutesInHM(params?.value)}
                </div>
            )
        },
        { field: 'total_check_in_location_error', headerName: 'CheckIn Location Error', width: 150 },
        { field: 'total_check_out_location_error', headerName: 'CheckOut Location Error', width: 150 },
        { field: 'system_remark', headerName: 'System Remark', width: 200 },
    ]
    for (let i = 0; i < attensDates.length; i++) {
        const date = attensDates[i];
        const dayName = dateToDayName(date);
        const dayMonth = dateToDayMonthName(date);
        const headingName = "IN-OUT ---- " + dayName + " " + dayMonth
        const inTimeHeadingName = "IN--" + dayName + " " + dayMonth
        const outTimeHeadingName = "OUT--" + dayName + " " + dayMonth
        const newInTimeDataField = {
            field: `${date}in_time`, headerName: `${inTimeHeadingName}`, width: 150, renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: params?.value === "NA" || params?.value === "NA" ? 'red'
                            : !validateEmployeeCheckIn(params?.value) ? 'yellow' : 'transparent',
                        padding: '8px',
                    }}
                >
                    {params.value}
                </div>
            ),
        }
        const newOutTimeDataField = {
            field: `${date}out_time`, headerName: `${outTimeHeadingName}`, width: 150, renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: params?.value === "NA" || params?.value === "NA" ? 'red'
                            : !validateEmployeeCheckOut(params?.value) ? 'yellow' : 'transparent',
                        padding: '8px',
                    }}
                >
                    {params.value}
                </div>
            )
        }
        empsConsolidatedAttenTableColumns.push(newInTimeDataField)
        empsConsolidatedAttenTableColumns.push(newOutTimeDataField)
    }
    const rows = empAttenRepo1;
    const [selectedDate, setSelectedDate] = useState('2023-10-10');
    const [filter, setFilter] = useState("");
    const [openAutoComplete, setOpenAutoComplete] = useState(false);

    const handleExportToExcel = () => {
        exportData(rows, empsConsolidatedAttenTableColumns);
    };

    return (
        //backgroundColor: '#dfe6e9'
        <div style={{ backgroundColor: '#dfe6e9' }}>
            <h2 style={{ margin: 'auto' }}>Employee Attendance Report Table:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* <div style={{ width: '40%', marginBottom: 5 }}>
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
                </div> */}
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
                    onClick={() => getEmployeesConsolidatedAttendanceReport()}
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
                        {rows[0] && (<Typography variant="h6">`Consolidated Attendance Report.</Typography>)}
                        {/* <DataGrid
                            rows={rows}
                            columns={empsConsolidatedAttenTableColumns}
                            getRowId={(row) => row.id}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 31 },
                                },
                            }}
                            pageSizeOptions={[30, 31]}
                            checkboxSelection
                        /> */}

                        <ThemeProvider theme={theme}>
                            <StripedDataGrid
                                rows={rows}
                                columns={empsConsolidatedAttenTableColumns}
                                getRowId={(row) => row.id}
                                getRowClassName={(params) =>
                                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                }
                                sx={{
                                    '& .MuiDataGrid-columnHeader': {
                                        backgroundColor: "blue",
                                        color: "white",
                                        fontWeight: 700,
                                    },
                                }}
                            // checkboxSelection
                            />
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesConsolidatedAttenTable;

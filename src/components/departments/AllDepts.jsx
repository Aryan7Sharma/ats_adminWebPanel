import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import exportData from '../common/ExportToExcel';
import { StripedDataGrid } from '../common/constants/theme';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();



const columns = [
    { field: 'department_name', headerName: 'Department name', width: 500 },
    { field: 'department_id', headerName: 'Department ID', width: 500 },
];



const AllDepts = ({ depts }) => {
    const rows = depts;

    const handleExportToExcel = () => {
        exportData(rows, columns);
    };

    return (
        <div style={{ backgroundColor: '#dfe6e9' }}>
            <h2 style={{ margin: 'auto' }}>All Department's:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div style={{ margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20, minHeight: '82vh', minWidth: '84vw' }}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleExportToExcel()}
                        >
                            Export to Excel
                        </Button>
                        <ThemeProvider theme={theme}>
                            <StripedDataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.department_id}
                                getRowClassName={(params) =>
                                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                }
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDepts;


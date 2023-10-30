import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import exportData from '../common/ExportToExcel';


const columns = [
    { field: 'department_name',  headerName: 'Department name', width: 400 },
    { field: 'department_id', headerName: 'Department ID', width: 400 },
];



const AllDepts = ({depts}) => {
    const rows = depts;

    const handleExportToExcel = () => {
        exportData(rows, columns);
    };

    return (
        <div style={{ backgroundColor: '#dfe6e9' }}>
            <h2 style={{ margin: 'auto' }}>All Department's:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div style={{ width: '70%', margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20 }}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => handleExportToExcel()}
                        >
                            Export to Excel
                        </Button>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.department_id} 
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDepts;


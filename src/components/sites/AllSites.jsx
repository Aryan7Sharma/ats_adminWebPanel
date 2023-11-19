import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import exportData from '../common/ExportToExcel';


const columns = [
    { field: 'location_id', headerName: 'Location/Site ID', width: 200 },
    { field: 'location_name',  headerName: 'Site Name', width: 400 },
    { field: 'location_alias',  headerName: 'Site Alias', width: 400 },
    //{ field: 'latitude', headerName: 'Location/Site Latitude', width: 200 },
    ,//{ field: 'longitude', headerName: 'Location/Site Longitude', width: 200 },
    { field: 'creater_id', headerName: 'Creater ID', width: 200 },
    { field: 'creation_date', headerName: 'Creation Date', width: 200 },
];



const AllSites = ({sites}) => {
    const rows = sites;

    const handleExportToExcel = () => {
        exportData(rows, columns);
    };

    return (
        <div>
            <h2 style={{ margin: 'auto' }}>All Location-Sites:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div style={{width:'100%', margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20, minHeight:'82vh',minWidth:'84vw'   }}>
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
                            getRowId={(row) => row.location_id} 
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

export default AllSites;


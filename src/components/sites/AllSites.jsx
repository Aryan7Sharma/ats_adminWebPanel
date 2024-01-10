import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import exportData from '../common/ExportToExcel';







const AllSites = ({ sites, handleChangeSiteStatus }) => {
    const rows = sites;
    const columns = [
        {
            field: 'location_id', headerName: 'Location/Site ID', width: 200, renderCell: (params) => (
                <Link href={`https://www.google.com/maps?q=${params.row.latitude},${params.row.longitude}`} target="_blank">{params.value}</Link>

            )
        },
        { field: 'location_name', headerName: 'Site Name', width: 300 },
        { field: 'location_alias', headerName: 'Site Alias', width: 300 },
        //{ field: 'latitude', headerName: 'Location/Site Latitude', width: 200 },
        ,//{ field: 'longitude', headerName: 'Location/Site Longitude', width: 200 },
        { field: 'creater_id', headerName: 'Creater ID', width: 200 },
        { field: 'creation_date', headerName: 'Creation Date', width: 200 },
        {
            field: 'active_status', headerName: 'Status', width: 100, renderCell: (params) => (
                params.value == 0 ?
                    <Button variant="contained" style={{ backgroundColor: '#FF0000' }} onClick={() => handleChangeSiteStatus(params.row.location_id)}>
                        Blocked
                    </Button>
                    :
                    <Button variant="contained" disableElevation onClick={() => handleChangeSiteStatus(params.row.location_id)}>
                        Active
                    </Button>
            )
        },
    ];

    const handleExportToExcel = () => {
        exportData(rows, columns);
    };

    return (
        <div>
            <h2 style={{ margin: 'auto' }}>All Location-Sites:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div style={{ width: '100%', margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20, minHeight: '82vh', minWidth: '84vw' }}>
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


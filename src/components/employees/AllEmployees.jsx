import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import exportData from '../common/ExportToExcel';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import { makeStyles } from '@mui/styles';


const columns = [
    { field: 'emp_id', headerName: 'Employee ID', width: 100 },
    { field: 'emp_name', headerName: 'Employee Name', width: 100 },
    { field: 'emp_degination', headerName: 'Employee Designation', width: 200 },
    { field: 'department_id', headerName: 'Employee Department', width: 100 },
    { field: 'emp_emailid', headerName: 'Employee Email ID', width: 300 },
    { field: 'emp_phoneno', headerName: 'Employee Phone No', width: 100 },
    { field: 'emp_address', headerName: 'Employee Address', width: 200 },
    { field: 'emp_joiningdate', headerName: 'Employee Joining Date', width: 150 },
    { field: 'emp_leavingdate', headerName: 'Employee Leaving Date', width: 150 },
    { field: 'creater_id', headerName: 'Creater ID', width: 300 },
    { field: 'creation_date', headerName: 'Creation Date', width: 200 },
    {
        field: 'emp_status',
        headerName: 'Active',
        width: 100,
        renderCell: (params) => (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16 }}
                    tabIndex={params.hasFocus ? 0 : -1}
                >
                    {params.value === 1 ? 'Yes' : 'No'}
                </Button>
            </strong>
        ),
    },
];

const useStyles = makeStyles((theme) => ({
    overlay: {
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
}));



const AllEmployees = ({ employees }) => {
    const classes = useStyles();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
    const rows = employees;

    const handleExportToExcel = () => {
        exportData(rows, columns);
    };

    const handleRowClick = (params) => {
        setSelectedEmployee(params.row);
        setUpdateFormOpen(true);
    };

    const handleUpdateFormClose = () => {
        setUpdateFormOpen(false);
    };
    const handleCloseUpdateForm = () => {
        setUpdateFormOpen(false);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        // Implement the logic to update the employee
        // You can send a request to your API or update the data in the state
        // Once the update is complete, you can close the form.
        setUpdateFormOpen(false);
    };

    return (
        <div style={{ backgroundColor: '#dfe6e9' }}>
            <h2 style={{ margin: 'auto' }}>All Locations-Sites:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div style={{ width: '70%', margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20 }}>
                        <Button variant='contained' color='primary' onClick={handleExportToExcel}>
                            Export to Excel
                        </Button>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.emp_id}
                            onRowClick={handleRowClick}
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
            {isUpdateFormOpen && (
                <div className={classes.overlay}>
                    <UpdateEmployeeForm
                        employee={selectedEmployee}
                        isOpen={isUpdateFormOpen}
                        onClose={handleCloseUpdateForm}
                        onUpdate={handleUpdateEmployee}
                    />
                </div>
            )}
        </div>

    );
};

export default AllEmployees;


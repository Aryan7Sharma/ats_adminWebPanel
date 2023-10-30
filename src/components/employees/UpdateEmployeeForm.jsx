import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CustomPostApi } from '../../api';
import { Toaster, toast } from 'react-hot-toast';
import LoadingOverlay from '../common/LoadingOverlay';

const UpdateEmployeeForm = ({ employee, isOpen, onClose, onUpdate }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee, password: "" });
  const [passChangeChecked, setPassChangeChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handlepassChangeChecked = () => {
    if (passChangeChecked === true) {
      setUpdatedEmployee({ ...updatedEmployee, password: "" })
    }
    setPassChangeChecked(!passChangeChecked);
  }
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      if (!updatedEmployee.emp_name || !updatedEmployee.emp_name || !updatedEmployee.emp_name || !updatedEmployee.emp_name || !updatedEmployee.emp_name) {
        return toast.error('Failed!, Empty value are not Allowed Please re-check all fields before Update')
      }
      if (passChangeChecked && !updatedEmployee.password) {
        return toast.error('Failed!, Password Should not be empty!');
      }
      if (passChangeChecked && (updatedEmployee.password.length < 8 || updatedEmployee.password.length > 16)) {
        return toast.error('Failed!, Invalid Password Length It Should be between 8 to 16 character');
      }
      if (updatedEmployee.emp_phoneno.toString().length !== 10) {
        return toast.error('Failed!, Invalid Phone No');
      }
      const apidata = updatedEmployee;
      const { data, error } = await CustomPostApi('/superadmin/updateemp', apidata);
      if (!data) toast.error(`Failed!, ${error}`)
      else {
        toast.success(`Success!, ${data?.msg}`);
        onClose();
        return;
      }
    } catch (err) {
      toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen || !employee) return null;

  return (
    <div className="update-employee-form" style={{ background: 'wheat', width: '80%', margin: 'auto', marginLeft: 300, alignContent: 'center', alignItems: 'center' }}>
      {isLoading && <LoadingOverlay />}
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <h3>Update Employee</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingInline: 30, justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex' }}>
            <TextField
              name="emp_name"
              label="Employee Name"
              fullWidth
              value={updatedEmployee.emp_name}
              onChange={handleChange}
              style={{ margin: '8px', fontWeight: 'bolder' }}
            />
            <TextField
              name="emp_emailid"
              label="Employee Email ID"
              fullWidth
              value={updatedEmployee.emp_emailid}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <TextField
              name="emp_phoneno"
              label="Employee Phone No"
              fullWidth
              value={updatedEmployee.emp_phoneno}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
            />
            <TextField
              name="emp_address"
              label="Employee Address"
              fullWidth
              value={updatedEmployee.emp_address}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <TextField
              name="emp_id"
              label="Employee ID"
              fullWidth
              value={updatedEmployee.emp_id}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
              disabled
            />
            <TextField
              name="emp_type"
              label="Employee Role"
              fullWidth
              value={updatedEmployee.emp_type === 3 ? "Employee" : updatedEmployee.emp_type === 2 ? "Admin" : "Super Admin"}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
              disabled
            />
          </div>
          <div style={{ display: 'flex' }}>
            <TextField
              name="emp_degination"
              label="Employee Designation"
              fullWidth
              value={updatedEmployee.emp_degination}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
            />
            <TextField
              name="department_id"
              label="Employee Department"
              fullWidth
              value={updatedEmployee.department_id}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
              disabled
            />
          </div>
          <div style={{ display: 'flex' }}>
            <TextField
              name="emp_joiningdate"
              label="Employee Joining Date"
              type="date"
              fullWidth
              value={updatedEmployee.emp_joiningdate}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
            />
            <TextField
              name="emp_status"
              label="Employee Status"
              fullWidth
              value={updatedEmployee.emp_status == 1 ? "Active" : "Block"}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
              disabled
            />
          </div>
          <div style={{ display: 'flex' }}>
            <TextField
              name="creater_id"
              label="Creater ID"
              fullWidth
              value={updatedEmployee.creater_id}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
              disabled
            />
            <TextField
              name="creation_date"
              label="Creation Date"
              type="date"
              fullWidth
              value={updatedEmployee.creation_date}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
              disabled
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <FormControlLabel control={
                <Switch
                  checked={passChangeChecked}
                  onChange={handlepassChangeChecked}
                />
              } label="Click here for Changing an Password*" />
            </div>
            <TextField
              name="password"
              label="Change Password"
              type="password"
              fullWidth
              value={updatedEmployee.password}
              onChange={handleChange}
              style={{ marginBlock: '8px' }}
              disabled={!passChangeChecked}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
          <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: 10 }}>
            Update
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;

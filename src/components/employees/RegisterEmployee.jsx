import { useState } from "react";
import { Autocomplete, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { withStyles } from "@material-ui/core/styles";
import { register } from "./RegisterEmployeeStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";


const Registration = ({ classes, departments, formData, setFormData, submitRegistration }) => {
  const [filter, setFilter] = useState("");
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);


  const errorClose = () => {
    setFormData({ ...formData, errorOpen: false });
  };

  const handleChange = (name) => (e) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const passwordMatch = () => formData.password === formData.passwordConfrim;

  const showPassword = () => {
    setFormData((prevState) => ({ ...formData, hidePassword: !prevState.hidePassword }));
  };

  const isValid = () => {
    if (formData.email === "") {
      return false;
    }
    return true;
  };

  // const submitRegistration = (e) => {
  //   e.preventDefault();
  //   // if (!passwordMatch()) {
  //   //   setFormData({ ...formData, errorOpen: true, error: "Passwords don't match" });
  //   // }
  //   const newUserCredentials = {
  //     email: formData.email,
  //     password: formData.password,
  //     passwordConfrim: formData.passwordConfrim,
  //   };
  //   console.log("newUserCredentials", formData);
  //   // Dispatch to userActions or perform the necessary actions
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
    setFormData({ ...formData, image: file });

    // You can also add code to upload the image to your server here if needed
  };

  return (
    <div>
      <h2 style={{ margin: 'auto' }}>Register New Employee :</h2>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <div style={{ maxWidth: '84vw', margin: 'auto', backgroundColor: '#F9FAFB', marginBlock: 20 }}>
            <div className={classes.main}>
              <CssBaseline />

              <Paper className={classes.paper}>
                <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                  <Avatar className={classes.avatar}>
                    {avatarImage ? (
                      <img
                        src={URL.createObjectURL(avatarImage)}
                        alt="Avatar"
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                      />
                    ) : (
                      <PeopleAltIcon className={classes.icon} />
                    )}
                  </Avatar>
                  <input
                    type="file"
                    id="avatar-upload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <form className={classes.form} onSubmit={submitRegistration}>
                  <div style={{ display: 'flex' }}>
                    <FormControl required fullWidth margin="normal">
                      <InputLabel htmlFor="name" className={classes.labels}>
                        Full Name:
                      </InputLabel>
                      <Input
                        name="name"
                        type="text"
                        autoComplete="text"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("emp_name")}
                      />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                      <InputLabel htmlFor="email" className={classes.labels}>
                        E-Mail:
                      </InputLabel>
                      <Input
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("emp_emailid")}
                      />
                    </FormControl>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <FormControl required fullWidth margin="normal">
                      <InputLabel htmlFor="phoneno" className={classes.labels}>
                        Phone No:
                      </InputLabel>
                      <Input
                        name="phoneno"
                        type="number"
                        autoComplete="number"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("emp_phoneno")}
                      />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                      <InputLabel htmlFor="address" className={classes.labels}>
                        Employee Address:
                      </InputLabel>
                      <Input
                        name="address"
                        type="text"
                        autoComplete="text"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("emp_address")}
                      />
                    </FormControl>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <FormControl required fullWidth margin="normal">
                      {/* <InputLabel >
                Role:
              </InputLabel> */}
                      <InputLabel htmlFor="name" className={classes.labels}>
                        Employee Role:
                      </InputLabel>
                      <Select
                        value={formData?.emp_type}
                        onChange={handleChange("emp_type")}
                        label="aa"
                        sx={{
                          borderRadius: "8px", marginRight: '5px',
                          border: "1.4px solid",
                          boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
                          borderColor: "rgba(206,212,218, .993)",
                        }}
                      >
                        <MenuItem value={2}>Admin</MenuItem>
                        <MenuItem value={3}>Employee</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                      <Autocomplete
                        open={openAutoComplete}
                        onOpen={() => setOpenAutoComplete(true)}
                        value={formData.department} // Use the controlled value
                        inputValue={filter}
                        onClose={() => setOpenAutoComplete(false)}
                        onChange={(event, newValue) => {
                          setFormData({ ...formData, department: newValue, department_id: newValue?._id }); // Update the controlled value
                        }}
                        sx={{
                          borderRadius: "8px", marginLeft: '5px',
                          border: "1.4px solid",
                          boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
                          borderColor: "rgba(206,212,218, .993)",
                        }}
                        onInputChange={(event, newInputValue) => setFilter(newInputValue)}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={departments}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Deparment via Searching"
                            variant="outlined"
                            InputProps={{
                              ...params.InputProps
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <FormControl required fullWidth margin="normal">
                      <InputLabel htmlFor="empid" className={classes.labels}>
                        Employee-Id:
                      </InputLabel>
                      <Input
                        name="empid"
                        type="text"
                        autoComplete="text"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("emp_id")}
                      />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                      <InputLabel htmlFor="desg" className={classes.labels}>
                        Employee Designation:
                      </InputLabel>
                      <Input
                        name="desg"
                        type="text"
                        autoComplete="text"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("emp_degination")}
                      />
                    </FormControl>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <FormControl required fullWidth margin="normal">
                      <InputLabel htmlFor="password" className={classes.labels}>
                        password
                      </InputLabel>
                      <Input
                        name="password"
                        autoComplete="password"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={handleChange("password")}
                        type={formData.hidePassword ? "password" : "input"}
                        endAdornment={
                          formData.hidePassword ? (
                            <InputAdornment position="end">
                              <VisibilityOffTwoToneIcon
                                fontSize="default"
                                className={classes.passwordEye}
                                onClick={showPassword}
                              />
                            </InputAdornment>
                          ) : (
                            <InputAdornment position="end">
                              <VisibilityTwoToneIcon
                                fontSize="default"
                                className={classes.passwordEye}
                                onClick={showPassword}
                              />
                            </InputAdornment>
                          )
                        }
                      />
                    </FormControl>

                    <FormControl required fullWidth margin="normal">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                          <DatePicker
                            label="Employee Joining  Date"
                            value={formData.emp_joiningdate}
                            className={classes.inputs}
                            sx={{
                              borderRadius: "8px", paddingTop: '10px',
                              border: "1.4px solid", marginRight: '10px',
                              boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
                              borderColor: "rgba(206,212,218, .993)",
                            }}
                            onChange={(newValue) => setFormData({ ...formData, emp_joiningdate: newValue })}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </FormControl>
                  </div>




                  <Button
                    disabled={!isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={classes.button}
                    type="submit"
                    onClick={submitRegistration}
                  >
                    Create
                  </Button>
                </form>

                {formData.error ? (
                  <Snackbar
                    variant="error"
                    key={formData.error}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    open={formData.errorOpen}
                    onClose={errorClose}
                    autoHideDuration={3000}
                  >
                    <SnackbarContent
                      className={classes.error}
                      message={
                        <div>
                          <span style={{ marginRight: "8px" }}>
                            <ErrorIcon fontSize="large" color="error" />
                          </span>
                          <span> {formData.error} </span>
                        </div>
                      }
                      action={[
                        <IconButton key="close" aria-label="close" onClick={errorClose}>
                          <CloseIcon color="error" />
                        </IconButton>
                      ]}
                    />
                  </Snackbar>
                ) : null}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(register)(Registration);

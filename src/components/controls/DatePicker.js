import React from 'react'
import DatePicker from '@mui/lab/DatePicker'; // Updated import
import TextField from '@mui/material/TextField';


// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // date-fns
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // or for dayjs
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // or for luxon
// import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// // or for moment
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import DateFnsUtils from "@date-io/date-fns";

export default function DatePickers(props) {

    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value
        }
    });

    return (
        <DatePicker
            label={label}
            name={name}
            value={value}
            onChange={date => onChange(convertToDefEventPara(name, date))}
            renderInput={(params) => <TextField {...params} variant="outlined" />} // You'll need to import TextField
        />
    );
}

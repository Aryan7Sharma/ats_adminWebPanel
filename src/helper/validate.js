import toast from 'react-hot-toast';
import * as Yup from 'yup';

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    if(values.username){
        // check user exist or not
        //const { status } = await authenticate(values.username);
        const status = 200;
        if(status !== 200){
            errors.exist = toast.error('User does not exist...!')
        }
    }

    return errors;
}

/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

/** validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}


/** ************************************************* */

/** validate password */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 8){
        errors.password = toast.error("Password must be equal or more than 8 characters long");
    }else if(values.password.length > 16){
        errors.password = toast.error("Password must be equal or less than 16 characters.");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}


/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/** validate email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}






// Form Validation
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const fieldsValidation = (...objects) =>{ 
    const objArr  = [...objects]
    const fields = {
        name: Yup.string().required('Name is Required'),
        address: Yup.string().required('Address is Required'),
        username: Yup.string().required('User Name is Required').email('Invalid User Name'),
        email: Yup.string().email('Invalid email'),
        //email_id: Yup.string().required('Mail ID is Required').email('Invalid email'),
        email_id: Yup.string().required('Mail ID is Required'),
        password:Yup.string().required('password is Required').min(8, "Password* Length Can't be Less than 8").max(16, "Password* Length Can't be Greater than 16"),
        old_password:Yup.string().required('Old password is Required').min(8, "Password* Length Can't be Less than 8").max(16, "Password* Length Can't be Greater than 16"),
        new_password:Yup.string().required('New password is Required').min(8, "Password* Length Can't be Less than 8").max(16, "Password* Length Can't be Greater than 16"),
        confirm_new_password:Yup.string().required('Confirm New password is required').oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
        phone_no: Yup.string().required('Phone No is Required').matches(phoneRegExp, 'Phone number is not valid').min(10, "Phone No Can't be Less than 10").max(10, "Phone No Can't be Greater than 10"),
        flat_no: Yup.string().required('Flat/House No  is Required').min(2, "Block/House* No Can't be Less than 2").max(10, "Block/House* Can't be Greater than 10"),
        block_no: Yup.string().required('Block/Street  is Required').min(1, "Block/House* No Can't be Less than 2").max(10, "Block/House* Can't be Greater than 10"),
        society_name: Yup.string().required('Society/Area Name is Required').max(40, "Society/Street* Name Can't be Greater than 40"),
        city_name:Yup.string().required('City Name is Required'),
        address: Yup.string().required('Address is Required'),
        amount: Yup.string().required('Amount is Required'),
        reference_no: Yup.string().required('Reference No is Required'),
        message: Yup.string().required('Message is Required'),
        collected_ammount: Yup.string().required('Amount is Required').matches(/^[0-9]+$/, 'Collected Ammount must contain only digits'),
        pan_no: Yup.string().max(10, "Pan No Can't be Greater than 10"),    
        receipt_no:Yup.string().required('Receipt No is Required').min(7, "Invalid Receipt No").max(11, "Invalid Receipt No"),
        receipt_no2:Yup.string().required('Receipt No2 is Required').min(11, "Invalid Receipt No").max(11, "Invalid Receipt No"),
        donation_type:Yup.string().required('Donation Type Required'),
        payment_type:Yup.string().required('Payment Type is Required')
        }
    const requiredFieldsForValidation = {}
    for(let i = 0; i<objArr[0].length; i++){requiredFieldsForValidation[objArr[0][i]] = fields[objArr[0][i]];};
    return Yup.object().shape(requiredFieldsForValidation);
};

export const validatingForm = (...objects) => fieldsValidation(objects); // Spread the objects array to pass them as arguments
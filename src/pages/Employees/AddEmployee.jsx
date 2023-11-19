import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Toaster, toast } from 'react-hot-toast';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Sidebar, PageHeader, RegisterEmployee, LoadingOverlay } from '../../components/index';
import { CustomGetApi, CustomPostApi } from '../../api';
const AddEmployee = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [dept, setDept] = useState(null);
    const [formData, setFormData] = useState({
        emp_id: "",
        emp_name: "",
        emp_phoneno: "",
        emp_emailid: "",
        emp_phone_imeino: "123456789123456",
        department_id: "",
        department: null,
        emp_address: "",
        emp_type: 0,
        emp_joiningdate: dayjs(new Date()),
        image: 'NA',
        emp_degination: "",
        password: "",
        hidePassword: true,
        //error: null,
        //errorOpen: false,
    });

    const getAllDepartments = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await CustomGetApi('/public/getalldept');
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`)
                const deptData = data?.data;
                setDepartments(deptData.map((dept, i) => {
                    return { _id: dept.department_id, name: dept.department_name };
                }));
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    const submitRegistration = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formDatakeys = Object.keys(formData);
            for (let i = 0; i < formDatakeys.length; i++) {
                if (!formData[formDatakeys[i]]) return toast.error('Failed!, Please Fill Up All the Fields Correctly');
            }
            let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!formData.emp_emailid.match(emailRegex)) return toast.error('Failed!, Invalid Email');
            if (formData.emp_phoneno.toString().length !== 10) return toast.error('Failed!, Invalid Phone No');
            if (formData.password.length < 8 || formData.password.length > 16) return toast.error('Failed!, Invalid Password make sure password length must be between 8 to 16 character');
            if (formData.emp_type != "2" && formData.emp_type != "3") return toast.error('Failed!, Invalid User Role It must be Admin Or Employee');
            const apidata = new FormData();
            apidata.append('emp_id', formData.emp_id);
            apidata.append('emp_name', formData.emp_name);
            apidata.append('emp_phoneno', formData.emp_phoneno);
            apidata.append('emp_emailid', formData.emp_emailid);
            apidata.append('emp_phone_imeino', formData.emp_phone_imeino);
            apidata.append('department_id', formData.department_id);
            apidata.append('emp_address', formData.emp_address);
            apidata.append('emp_type', formData.emp_type);
            apidata.append('emp_joiningdate', formData.emp_joiningdate);
            apidata.append('emp_degination', formData.emp_degination);
            apidata.append('password', formData.password);
            apidata.append('image', formData.image);
            const { data, error } = await CustomPostApi('/superadmin/addnewemployee', apidata, 'multipart/form-data');
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`)
                return;
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getAllDepartments();
    }, []);
    return (
        <main style={{ display: 'flex' }}>
            {isLoading && <LoadingOverlay />}
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '20vw' }}>
                <Sidebar />
            </div>
            <div style={{ marginLeft: 240, width: '87vw',minHeight:'100vh' ,position: 'absolute',backgroundColor: '#dfe6e9' }}>
                <div style={{ position: 'relative' }}>
                    {/* <PageHeader
                        title="Add Emplyee"
                        subTitle="From Here You Can Add a New Employee"
                        icon={<PersonAddIcon fontSize="large" />}
                    /> */}
                    <RegisterEmployee
                        departments={departments}
                        dept={dept}
                        setDept={setDept}
                        formData={formData}
                        setFormData={setFormData}
                        submitRegistration={submitRegistration}
                    />
                </div>
            </div>
        </main>
    );
};
export default AddEmployee;

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { Sidebar, PageHeader, LoadingOverlay } from '../../components/index';
import { AllEmployees } from '../../components/index';
import { CustomGetApi } from '../../api';
const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllEmps = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await CustomGetApi('/superadmin/getallemployees');
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`)
                setEmployees(data?.data);
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getAllEmps();
    }, [])
    return (
        <main style={{ display: 'flex' }}>
            {isLoading && <LoadingOverlay />}
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '20vw' }}>
                <Sidebar />
            </div>
            <div style={{ marginLeft: 240, width: '87vw', position: 'absolute' }}>
                <div style={{ position: 'relative' }}>
                    <PageHeader
                        title="Manage Sites"
                        subTitle="Maintain Your Sites Details."
                        icon={<EditLocationAltIcon fontSize="large" />}
                    />
                    <AllEmployees
                    employees={employees}
                    />
                </div>
            </div>
        </main>
    );
};
export default ManageEmployees;


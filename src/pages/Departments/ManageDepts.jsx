import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import { Sidebar, PageHeader, LoadingOverlay } from '../../components/index';
import { AllDepts } from '../../components/index';
import { CustomGetApi } from '../../api';
const ManageDepts = () => {
    const [depts, setDepts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllDepts = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await CustomGetApi('/public/getalldept');
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`)
                setDepts(data?.data);
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getAllDepts();
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
                        icon={<RoomPreferencesIcon fontSize="large" />}
                    />
                    <AllDepts
                    depts={depts}
                    />
                </div>
            </div>
        </main>
    );
};
export default ManageDepts;

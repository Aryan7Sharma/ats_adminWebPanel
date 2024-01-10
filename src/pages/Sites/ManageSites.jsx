import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { Sidebar, PageHeader, LoadingOverlay } from '../../components/index';
import { AllSites } from '../../components/index';
import { CustomGetApi, CustomPostApi } from '../../api';
const ManageSites = () => {
    const [sites, setSites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllSites = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await CustomGetApi('/superadmin/getallsites');
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`)
                setSites(data?.data);
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    const handleChangeSiteStatus = async (location_id) => {
        try {
            const isConfirmed = window.confirm(`Are You Sure you want to Change the status of ${location_id}th Site/Location`);
            if (isConfirmed) {
                setIsLoading(true);
                const apiData = {
                    location_id: location_id
                }
                const { data, error } = await CustomPostApi('/superadmin/updatesitestatus', apiData);
                if (!data) toast.error(`Failed!, ${error}`)
                else {
                    toast.success(`Success!, ${data?.msg}`)
                    getAllSites();
                }
            } else {
                toast.error('Cancelled!')
            }

        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllSites();
    }, [])
    return (
        <main style={{ display: 'flex' }}>
            {isLoading && <LoadingOverlay />}
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '20vw' }}>
                <Sidebar />
            </div>
            <div style={{ marginLeft: 240, width: '87vw', minHeight: '100vh', position: 'absolute', backgroundColor: '#dfe6e9' }}>
                <div style={{ position: 'relative' }}>
                    {/* <PageHeader
                        title="Manage Sites"
                        subTitle="Maintain Your Sites Details."
                        icon={<EditLocationAltIcon fontSize="large" />}
                    /> */}
                    <AllSites
                        sites={sites}
                        handleChangeSiteStatus={handleChangeSiteStatus}
                    />
                </div>
            </div>
        </main>
    );
};
export default ManageSites;

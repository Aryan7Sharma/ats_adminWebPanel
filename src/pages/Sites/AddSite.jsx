import { useState } from 'react';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Sidebar, PageHeader, SiteLocator, LoadingOverlay } from '../../components/index';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPostApi } from '../../api';
const AddSite = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchBox, setSearchBox] = useState(null);
    const [siteAlias, setSiteAlias] = useState("");

    const handleaddNewSite = async () => {
        try {
            window.alert('Are you sure you want to Add this Site/Location.');
            setIsLoading(true);
            if(!selectedLocation){return toast.error('Failed!, location is not selected yet.')};
            if(!selectedLocation?.formatted_address){return toast.error('Failed!, unable to get location name please reselect your location.')};
            if(!selectedLocation?.geometry?.location?.lat() || !selectedLocation?.geometry?.location?.lng()){return toast.error('Failed!, unable to get latitude and longitude of the location please reselect your location.')}
            if(!siteAlias){return toast.error('Failed!, Site/Location Alias is not Provided, Plesae Enter an Alias')};
            const apidata = {
                location_name: selectedLocation?.formatted_address,
                latitude: selectedLocation?.geometry?.location?.lat(),
                longitude: selectedLocation?.geometry?.location?.lng(),
                location_alias:siteAlias
            }
            const { data, error } = await CustomPostApi('/superadmin/addnewsite', apidata);
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`);
                return;
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }
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
                        title="Add Site"
                        subTitle="From Here You Can Add a New Site"
                        icon={<AddLocationAltIcon fontSize="large" />}
                    /> */}
                    <SiteLocator
                        handleaddNewSite={handleaddNewSite}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        searchBox={searchBox}
                        setSearchBox={setSearchBox}
                        siteAlias={siteAlias}
                        setSiteAlias={setSiteAlias}
                    />
                </div>
            </div>
        </main>
    );
};
export default AddSite;

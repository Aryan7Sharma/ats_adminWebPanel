import { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { Sidebar } from '../../components/common'
import { WorkingDaysTable, PageHeader, LoadingOverlay } from '../../components/index';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPostApi, CustomGetApi } from '../../api';

const WorkingdaysReport = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonths] = useState("");
    const [allWorkingDays, setAllWorkingDays] = useState([]);


    const getCurrYearWorkingDays = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await CustomGetApi('/superadmin/getCurrYearWorkingDays');
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`)
                const workingDaysData = data?.data;
                console.log("workingDaysData", workingDaysData)
                setAllWorkingDays(workingDaysData.map((data, i) => {
                    return { _id: data?.month, ...data };
                }));
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    const updateWorkingDays = async (month, working_days) => {
        try {
            setIsLoading(true);
            if (!month || !working_days) {
                return toast.error("We didn't find working_days")
            }
            const apiData = {
                month: month,
                workingDays: working_days
            };
            const { data, error } = await CustomPostApi('/superadmin/updateWorkingDays', apiData);
            if (!data) toast.error(`Failed!, ${error}`)
            else {
                toast.success(`Success!, ${data?.msg}`)
                getCurrYearWorkingDays();
            }
        } catch (err) {
            toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getCurrYearWorkingDays();
    }, []);
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
            title="Employee Attendance Report"
            subTitle="Check Any Employee Attendance Report Via Filters."
            icon={<ContentPasteSharpIcon fontSize="large" />}
          /> */}
                    <WorkingDaysTable
                        allWorkingDays={allWorkingDays}
                        updateWorkingDays={updateWorkingDays}
                    />
                </div>
            </div>
        </main>
    )
}

export default WorkingdaysReport

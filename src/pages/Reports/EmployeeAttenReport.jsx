import { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { Sidebar } from '../../components/common'
import { EmployeeAttenTable, PageHeader, LoadingOverlay } from '../../components/index';
import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPostApi, CustomGetApi } from '../../api';

const EmployeeAttenReport = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [emp, setEmp] = useState(null);
  const [empAttenRepo1, setEmpAttenRepo1] = useState([]);


  const getAllEmps = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await CustomGetApi('/superadmin/getallemployees');
      if (!data) toast.error(`Failed!, ${error}`)
      else {
        toast.success(`Success!, ${data?.msg}`)
        const empData = data?.data;
        setEmployees(empData.map((emp, i) => {
          return { _id: emp.emp_id, name: emp.emp_name };
        }));
      }
    } catch (err) {
      toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  const getAttenRep1 = async () => {
    try {
      setIsLoading(true);
      if(!emp){return toast.error('Failed, You did not Select an Employee!')}
      if(!startDate || !endDate){return toast.error('Failed, You did not Select an Correct Date!')}
      const apidata = {
        emp_id: emp._id,
        start_date: startDate,
        end_date: endDate,
      }
      const { data, error } = await CustomPostApi('/superadmin/rep/empattenrep1', apidata);
      if (!data) toast.error(`Failed!, ${error}`)
      else {
        toast.success(`Success!, ${data?.msg}`)
        const Empdata = data?.data;
        setEmpAttenRepo1(Empdata.map((data, i)=>{
          return {id:i, ...data}
        }));
        return;
      }
    } catch (err) {
      toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getAllEmps();
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
            title="Employee Attendance Report"
            subTitle="Check Any Employee Attendance Report Via Filters."
            icon={<ContentPasteSharpIcon fontSize="large" />}
          /> */}
          <EmployeeAttenTable
            employees={employees}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            emp={emp}
            setEmp={setEmp}
            getAttenRep1={getAttenRep1}
            empAttenRepo1={empAttenRepo1}
          />
        </div>
      </div>
    </main>
  )
}

export default EmployeeAttenReport

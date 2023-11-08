import { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { Sidebar } from '../../components/common'
import { EmployeeAttenSummTable, PageHeader, LoadingOverlay } from '../../components/index';
import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPostApi, CustomGetApi } from '../../api';

const EmployeeMonthlyAttenSummaryReport = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [emp, setEmp] = useState(null);
  const [empAttenRepo2, setEmpAttenRepo2] = useState([]);


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

  const groupedReportData = (data) => {
    const groupedData = data.reduce((result, current) => {
      // Find if a group with the current Date exists
      const group = result.find((item) => item.Date === current.Date);

      if (group) {
        group.No_of_sites_PIN+=1;
        group.Punch_In_Time += ', ' + current.Punch_In_Time;
        group.PunchIn_Site_Address += ', ' + current.PunchIn_Site_Address;
        group.PunchIN_Distances += ', ' + current.PunchIn_Distance_From_Exact_Location || "NA";
        group.No_of_sites_POut+=1;
        group.Punch_Out_Time += ', ' + current.Punch_Out_Time;
        group.PunchOut_Site_Address += ', ' + current.PunchOut_Site_Address;
        group.PunchOut_Distances += ', ' + current.PunchOut_Distance_From_Exact_Location;
        group.working_minutes_onSites+= parseInt(current.Working_minutes);
        group.last_punchOut = current.Punch_Out_Time;
      } else {
        // Create a new group for the unique Date
        result.push({
          Date: current.Date,
          Day:current.Day,
          Employee_Code: current.Employee_Code,
          Employee_Name: current.Employee_Name,
          Employee_Designation:current.Employee_Designation,
          No_of_sites_PIN:1,
          Punch_In_Time: current.Punch_In_Time || "NA",
          PunchIn_Site_Address: current.PunchIn_Site_Address || "NA",
          PunchIN_Distances:current.PunchIn_Distance_From_Exact_Location || "NA",
          No_of_sites_POut:1,
          Punch_Out_Time: current.Punch_Out_Time || "NA",
          PunchOut_Site_Address: current.PunchOut_Site_Address || "NA",
          PunchOut_Distances:current.PunchOut_Distance_From_Exact_Location || "NA",
          working_minutes_onSites: parseInt(current.Working_minutes) || 0,
          first_punchIn: current.Punch_In_Time,
          last_punchOut: current.Punch_Out_Time,
        });
      }
      return result;
    }, []);
    return groupedData
  }
  const getAttenRep2 = async () => {
    try {
      setIsLoading(true);
      if (!emp) { return toast.error('Failed, You did not Select an Employee!') }
      if (!startDate || !endDate) { return toast.error('Failed, You did not Select an Correct Date!') }
      const apidata = {
        emp_id: emp._id,
        start_date: startDate,
        end_date: endDate,
      }
      const { data, error } = await CustomPostApi('/superadmin/rep/empattenrep1', apidata);
      if (!data) toast.error(`Failed!, ${error}`)
      else {
        toast.success(`Success!, ${data?.msg}`)
        const repdata = data?.data;
        const reportgroupdata = groupedReportData(repdata);
        setEmpAttenRepo2(reportgroupdata);
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
      <div style={{ marginLeft: 240, width: '87vw', position: 'absolute' }}>
        <div style={{ position: 'relative' }}>
          {/* <PageHeader
            title="Employee Attendance Report"
            subTitle="Check Any Employee Attendance Report Via Filters."
            icon={<ContentPasteSharpIcon fontSize="large" />}
          /> */}
          <EmployeeAttenSummTable
            employees={employees}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            emp={emp}
            setEmp={setEmp}
            getAttenRep2={getAttenRep2}
            empAttenRepo2={empAttenRepo2}
          />
        </div>
      </div>
    </main>
  )
}

export default EmployeeMonthlyAttenSummaryReport;


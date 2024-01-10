import { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import moment from 'moment-timezone';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPostApi } from '../../api';
import { Sidebar } from '../../components/common';
import { EmployeesConsolidatedAttenTable, LoadingOverlay } from '../../components/index';
import { dateToDayName, getDateTimeDifferenceInMinutes, convertToIndianTime2 } from "../../utils/DateConvertor";


// Custom comparator function for date strings
const dateComparator = (a, b) => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  // Compare dates
  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  }

  return 0; // Dates are equal
};

const EmployeesAttenReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [attensDates, setAttensDates] = useState([]);
  const [empsAttenData, setEmpsAttenData] = useState([]);

  const getEmployeesConsolidatedAttendanceReport = async () => {
    try {
      setIsLoading(true);
      if (!startDate || !endDate) { return toast.error('Failed, You did not Select an Correct Date!') }
      const apiData = {
        start_date: startDate,
        end_date: endDate,
      }
      const { data, error } = await CustomPostApi('/superadmin/rep/empConsolidatedAttendanceReport', apiData);
      if (!data) toast.error(`Failed!, ${error}`)
      else {
        const fetchedAttendData = data?.data;
        console.log("data", data)
        console.log("fetchedAttendData", fetchedAttendData)
        const empAdded = {};
        const allAttenDates = {};
        let empAttenDataArray = [];
        let objectId = 0;
        fetchedAttendData.map((attenData, ind1) => {
          if (!allAttenDates.hasOwnProperty(attenData.date)) {
            allAttenDates[attenData.date] = "1"
          }
          if (empAdded.hasOwnProperty(attenData.e_code)) {
            empAttenDataArray.map((updatedAttenData, ind2) => {
              if (attenData.e_code === updatedAttenData.e_code) {
                const empNestedAttenData = empAttenDataArray[ind2]
                empNestedAttenData["total_late_days"] += attenData.total_late_days;
                empNestedAttenData["total_not_checked_out"] += attenData.total_not_checked_out;
                empNestedAttenData["total_working_days"] += attenData.total_working_days;
                empNestedAttenData[attenData.date] = attenData.date;
                empNestedAttenData[`${attenData.date}in_time`] = attenData.in_time == null || attenData.in_time === "NA" ? attenData.in_time : convertToIndianTime2(attenData.in_time);
                empNestedAttenData[`${attenData.date}out_time`] = attenData.out_time == null || attenData.out_time === "NA" ? attenData.out_time : convertToIndianTime2(attenData.out_time);
                if ((attenData.in_time == null || attenData.in_time === "NA") && dateToDayName(attenData.date) === "Sunday") {
                  empNestedAttenData["total_week_off"] += 1;
                }
                empNestedAttenData["total_working_time"] += attenData.in_time == null || attenData.in_time === "NA" ? 0 : getDateTimeDifferenceInMinutes(attenData.in_time, attenData.out_time);
                empNestedAttenData["total_check_in_location_error"] += parseInt(attenData.total_check_in_location_error);
                empNestedAttenData["total_check_out_location_error"] += parseInt(attenData.total_check_out_location_error);
                empAttenDataArray[ind2] = empNestedAttenData;
              }
            })
          } else {
            empAdded[attenData.e_code] = "1"
            const newEmpAttenData = {
              "id": objectId,
              "degination": attenData.degination,
              "doj": attenData.doj,
              "e_code": attenData.e_code,
              "employee_name": attenData.employee_name,
              "total_late_days": attenData.total_late_days,
              "total_not_checked_out": attenData.total_not_checked_out,
              "total_working_days": attenData.total_working_days,
              "total_week_off": parseInt(0),
              "total_working_time": 0,
              "total_check_in_location_error": 0,
              "total_check_out_location_error": 0,
              "system_remark": "NA"
            }
            newEmpAttenData[attenData.date] = attenData.date;
            newEmpAttenData[`${attenData.date}in_time`] = attenData.in_time == null || attenData.in_time === "NA" ? attenData.in_time : convertToIndianTime2(attenData.in_time)
            newEmpAttenData[`${attenData.date}out_time`] = attenData.out_time == null || attenData.out_time === "NA" ? attenData.out_time : convertToIndianTime2(attenData.out_time)
            if ((attenData.in_time == null || attenData.in_time === "NA") && dateToDayName(attenData.date) === "Sunday") {
              newEmpAttenData["total_week_off"] += 1;
            }
            newEmpAttenData["total_working_time"] += attenData.in_time == null || attenData.in_time === "NA" ? 0 : getDateTimeDifferenceInMinutes(attenData.in_time, attenData.out_time);
            newEmpAttenData["total_check_in_location_error"] += parseInt(attenData.total_check_in_location_error);
            newEmpAttenData["total_check_out_location_error"] += parseInt(attenData.total_check_out_location_error);
            empAttenDataArray.push(newEmpAttenData);
            objectId += 1;
          }
        })
        const datesInArrya = Object.keys(allAttenDates);
        const sortedDateArray = datesInArrya.sort(dateComparator);
        console.log("sortedDateArray", empAttenDataArray)
        setAttensDates(sortedDateArray)
        setEmpsAttenData(empAttenDataArray);
        toast.success(`Success!, ${data?.msg}`)
        // const Empdata = data?.data;
        // setEmpAttenRepo1(Empdata.map((data, i) => {
        //   return { id: i, ...data }
        // }));
        return;
      }
    } catch (err) {
      toast.error(`Something Went Wrong!, Getting Exception, ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getEmployeesConsolidatedAttendanceReport();
  }, []);


  return (
    <main style={{ display: 'flex' }}>
      {isLoading && <LoadingOverlay />}
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Sidebar style={{ width: '20%' }} />
      </div>
      <div style={{ marginLeft: 240, width: '87vw', minHeight: '100vh', position: 'absolute', backgroundColor: '#dfe6e9' }}>
        <div style={{ position: 'relative' }}>
          {/* <PageHeader
            title="Employee Attendance Report"
            subTitle="Check Any Employee Attendance Report Via Filters."
            icon={<ContentPasteSharpIcon fontSize="large" />}
          /> */}
          <EmployeesConsolidatedAttenTable
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            emp={attensDates}
            setEmp={setAttensDates}
            attensDates={attensDates}
            getEmployeesConsolidatedAttendanceReport={getEmployeesConsolidatedAttendanceReport}
            empAttenRepo1={empsAttenData}
          />
        </div>
      </div>
    </main>
  )
}

export default EmployeesAttenReport

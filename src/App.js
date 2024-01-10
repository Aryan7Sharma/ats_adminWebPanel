import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ThemeProvider from './theme';
import LoginPage from './pages/Login.jsx';
import Testing from "./Testing.jsx";
import { SitesTable } from './components';
import {
  SignIn,
  DashboardPage,
  PageNotFound,
  EmployeeAttenReport,
  EmployeesAttenReport,
  EmployeeMonthlyAttenSummaryReport,
  WorkingdaysReport,
  AddEmployee,
  ManageEmployees,
  AddSite,
  ManageSites,
  ManageDepts,
  UserProfile
} from './pages/index';
import SiteForm from './components/sites/SiteForm';

/* auth middleware */
import { IsUserLoggedIN, ProtectAllUserRoute } from './middleware/auth';
/** root routes */
const router = createBrowserRouter([
  {
    path: '/signin',
    element: <IsUserLoggedIN><SignIn /></IsUserLoggedIN>
  },
  {
    path: '/',
    element: <ProtectAllUserRoute><UserProfile /></ProtectAllUserRoute>
  },
  {
    path: '/rep/employeeAttenReport',
    element: <ProtectAllUserRoute><EmployeeAttenReport /></ProtectAllUserRoute>
  },
  {
    path: '/rep/employeesAttenReport',
    element: <ProtectAllUserRoute><EmployeesAttenReport /></ProtectAllUserRoute>
  },
  {
    path: '/rep/employeesAttenSummReport',
    element: <ProtectAllUserRoute><EmployeeMonthlyAttenSummaryReport /></ProtectAllUserRoute>
  },
  {
    path: '/rep/workingdaysReport',
    element: <ProtectAllUserRoute><WorkingdaysReport /></ProtectAllUserRoute>
  },
  {
    path: '/dept/managedepts',
    element: <ProtectAllUserRoute><ManageDepts /></ProtectAllUserRoute>
  },
  {
    path: '/emp/addemployee',
    element: <ProtectAllUserRoute><AddEmployee /></ProtectAllUserRoute>
  },
  {
    path: '/emp/manageemployees',
    element: <ProtectAllUserRoute><ManageEmployees /></ProtectAllUserRoute>
  },
  {
    path: '/site/addsite',
    element: <ProtectAllUserRoute><AddSite /></ProtectAllUserRoute>
  },
  {
    path: '/site/managesites',
    element: <ProtectAllUserRoute><ManageSites /></ProtectAllUserRoute>
  },
  {
    path: '/test/testing',
    element: <ProtectAllUserRoute><Testing /></ProtectAllUserRoute>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  },

])






function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;

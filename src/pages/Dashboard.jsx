import React from 'react';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import { Sidebar, PageHeader, InfoCard } from '../components/index';
import { HorizontalBars, DashBarGraph, PieActiveArc, PieChartWithCustomizedLabel, BasicArea, PieArcLabel } from '../components/dashboard/Charts';
import commingsoon from "../assets/images/commingsoon.jpg";
const Dashboard = () => {
    return (
        <main style={{ display: 'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '20vw' }}>
                <Sidebar />
            </div>
            <div style={{ marginLeft: 240, width: '87vw',minHeight:'100vh' ,position: 'absolute',backgroundColor: '#dfe6e9' }}>
                <div style={{ position: 'relative' }}>
                    {/* <PageHeader
                        title="ATS Dashboard"
                        subTitle="Employee's  Attendance Insights."
                        icon={<HomeIcon fontSize="large" />}
                    /> */}
                    <div style={{ backgroundColor: '#dfe6e9' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBlock: 20 }}>
                                <InfoCard />
                                <InfoCard />
                                <InfoCard />
                                <InfoCard />
                            </div>
                        </div>
                        <div>
                            <h2>Attendance Statistic's</h2>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBlock: 20 }}>
                                <DashBarGraph />
                                <HorizontalBars />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBlock: 20 }}>
                                <PieArcLabel />
                                <PieArcLabel />
                                <BasicArea />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
};
export default Dashboard;

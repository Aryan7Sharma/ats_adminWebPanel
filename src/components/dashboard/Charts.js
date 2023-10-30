import * as React from 'react';
import { BarPlot, BarChart } from '@mui/x-charts/BarChart';
import { LinePlot, LineChart } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { PieChart, pieArcClasses, pieArcLabelClasses } from '@mui/x-charts/PieChart';



const series = [
  {
    type: 'bar',
    stack: '',
    yAxisKey: 'eco',
    data: [2, 5, 3, 4, 1],
  },
  {
    type: 'bar',
    stack: '',
    yAxisKey: 'eco',
    data: [5, 6, 2, 8, 9],
  },
  {
    type: 'line',
    yAxisKey: 'pib',
    color: 'red',
    data: [1000, 1500, 3000, 5000, 10000],
  },
];

export function DashBarGraph() {
  return (
    <ChartContainer
      series={series}
      width={500}
      height={400}
      xAxis={[
        {
          id: 'years',
          data: [2010, 2011, 2012, 2013, 2014],
          scaleType: 'band',
          valueFormatter: (value) => value.toString(),
        },
      ]}
      yAxis={[
        {
          id: 'eco',
          scaleType: 'linear',
        },
        {
          id: 'pib',
          scaleType: 'log',
        },
      ]}
    >
      <BarPlot />
      <LinePlot />
      <ChartsXAxis label="Years" position="bottom" axisId="years" />
      <ChartsYAxis label="Results" position="left" axisId="eco" />
      <ChartsYAxis label="PIB" position="right" axisId="pib" />
    </ChartContainer>
  );
}


const chartSetting = {
  xAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}mm`;

export function HorizontalBars() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'seoul', label: 'Attendance Stats Month Wise', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}



const data = [
  { id: 0, value: 10, label: 'series A' },
  { id: 1, value: 15, label: 'series B' },
  { id: 2, value: 20, label: 'series C' },
];

export function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
      sx={{
        [`& .${pieArcClasses.faded}`]: {
          fill: 'gray',
        },
      }}
      height={200}
    />
  );
}




const data2 = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: '#00C49F' },
  { label: 'Group C', value: 300, color: '#FFBB28' },
  { label: 'Group D', value: 200, color: '#FF8042' },
];

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export function PieChartWithCustomizedLabel() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data2,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}


export function BasicArea() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
  );
}


export function PieArcLabel() {
  const data = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'D' },
  ];

  const size = {
    width: 400,
    height: 200,
  };

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}



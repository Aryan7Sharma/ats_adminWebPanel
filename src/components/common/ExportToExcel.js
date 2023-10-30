import * as XLSX from 'xlsx';


// function exportDataToExcel(data, filename) {
//     // Prepare the worksheet
//     const ws = XLSX.utils.json_to_sheet(data);

//     // Create a workbook
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Data');

//     // Save the Excel file
//     XLSX.writeFile(wb, `${filename}.xlsx`);
// }

// function ExportToExcelButton({ exportData }) {
//     const handleExport = () => {
//         // Call the exportData function to export the data to Excel.
//         exportDataToExcel(exportData);
//     };

//     return (
//         <button onClick={handleExport}>Export to Excel</button>
//     );
// }

// export default ExportToExcelButton;

function exportData(rows, columns) {
  // Create a new worksheet
  const ws = XLSX.utils.aoa_to_sheet([columns.map((column) => column.field)]);
  
  // Convert DataGrid data to an array of arrays
  const dataRows = rows.map((row) => columns.map((column) => row[column.field]));

  // Add the data rows to the worksheet
  XLSX.utils.sheet_add_aoa(ws, dataRows, { origin: 'A2' });

  // Create a new workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'DataGridData');

  // Save the Excel file
  XLSX.writeFile(wb, 'DataGridExport.xlsx');
}

export default exportData;






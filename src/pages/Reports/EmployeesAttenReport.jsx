import React from 'react';
import { Sidebar } from '../../components/common';

const EmployeesAttenReport = () => {
  return (
    <main style={{ display: 'flex' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Sidebar style={{ width: '20%' }} />
      </div>
      <div style={{ marginLeft: 300, position: 'relative', width: '100%' }}>
        <div style={{ position: 'absolute' }}>
          <h1>Comming Soon...</h1>
        </div>
      </div>
    </main>
  )
}

export default EmployeesAttenReport

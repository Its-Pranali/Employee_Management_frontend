import { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './components/pages/Dashboard';
import Employee from './components/pages/Employee';
import Department from './components/pages/Department';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/employee" element={<Employee/>}/>
      <Route path="/department" element={<Department/>}/>
    </Routes>
  );
}

export default App;

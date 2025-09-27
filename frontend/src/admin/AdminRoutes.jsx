import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import ManageCanteen from './activity/ManageCanteen';
import ManageStudents from './activity/ManageStudents';
import AdminComplains from './pages/AdminComplains';
import AdminActions from './pages/AdminActions';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="canteen" element={<ManageCanteen />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="complains" element={<AdminComplains />} />
        <Route path="actions" element={<AdminActions />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

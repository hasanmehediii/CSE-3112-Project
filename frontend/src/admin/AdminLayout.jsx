import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavbar from './AdminNavbar';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 2rem;
  background-color: #f7fafc;
`;

const AdminLayout = () => {
  return (
    <PageContainer>
      <AdminNavbar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default AdminLayout;

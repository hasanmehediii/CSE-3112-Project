import React, { useState } from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7f6; /* Light, professional background */
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50; /* Dark blue for professionalism */
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: none;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  &:focus {
    border-color: #2c3e50;
    outline: none;
  }
`;

const StudentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  overflow: hidden;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #2c3e50; /* Dark blue for header */
    color: white;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:nth-child(even) {
    background-color: #f8f8f8; /* Light gray for even rows */
  }

  tbody tr:hover {
    background-color: #e0f7fa; /* Light blue hover */
  }
`;

const TotalStudents = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50; /* Dark blue text */
  text-shadow: none;
`;

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Placeholder student data
  const allStudents = [
    {
      id: 1,
      name: 'Rahim Ahmed',
      regNo: '2020-123-456',
      department: 'CSE',
      session: '2020-21',
      email: 'rahim.a@example.com',
      phone: '01711223344',
    },
    {
      id: 2,
      name: 'Karim Khan',
      regNo: '2020-123-457',
      department: 'EEE',
      session: '2020-21',
      email: 'karim.k@example.com',
      phone: '01722334455',
    },
    {
      id: 3,
      name: 'Fatima Begum',
      regNo: '2021-123-458',
      department: 'CSE',
      session: '2021-22',
      email: 'fatima.b@example.com',
      phone: '01733445566',
    },
    {
      id: 4,
      name: 'Jamal Uddin',
      regNo: '2021-123-459',
      department: 'BBA',
      session: '2021-22',
      email: 'jamal.u@example.com',
      phone: '01744556677',
    },
    {
      id: 5,
      name: 'Aisha Rahman',
      regNo: '2022-123-460',
      department: 'CSE',
      session: '2022-23',
      email: 'aisha.r@example.com',
      phone: '01755667788',
    },
  ];

  const filteredStudents = allStudents.filter((student) => {
    const matchesSearchTerm = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === '' || student.department.toLowerCase() === departmentFilter.toLowerCase();
    return matchesSearchTerm && matchesDepartment;
  });

  return (
    <PageContainer>
      <AdminNavbar />
      <ContentWrapper>
        <Title>Student Management</Title>

        <SearchContainer>
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Filter by department..."
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          />
        </SearchContainer>

        <TotalStudents>Total Students: {filteredStudents.length}</TotalStudents>

        <StudentTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Reg. No.</th>
              <th>Department</th>
              <th>Session</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td>{student.department}</td>
                <td>{student.session}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default StudentManagement;

import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 2rem;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  width: 250px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
`;

const StudentList = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1rem;
`;

const StudentItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d3748;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #edf2f7;
  }

  &.active {
    background-color: #48bb78;
    color: white;
  }
`;

const StudentDetails = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
`;

const DetailTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const Info = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const studentsData = [
  {
    id: 1,
    name: 'John Doe',
    reg: '2018331001',
    email: 'john.doe@example.com',
    phone: '111-222-3333',
    department: 'CSE'
  },
  {
    id: 2,
    name: 'Jane Smith',
    reg: '2018331002',
    email: 'jane.smith@example.com',
    phone: '444-555-6666',
    department: 'EEE'
  },
  {
    id: 3,
    name: 'Peter Jones',
    reg: '2018331003',
    email: 'peter.jones@example.com',
    phone: '777-888-9999',
    department: 'CSE'
  },
    {
    id: 4,
    name: 'Kamal Hossain',
    reg: '2018331004',
    email: 'kamal.hossain@example.com',
    phone: '123-456-7890',
    department: 'ME'
  },
];

const ManageStudents = () => {
  const [selectedStudent, setSelectedStudent] = useState(studentsData[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const departments = ['All', ...new Set(studentsData.map(s => s.department))];

  const filteredStudents = useMemo(() => {
    return studentsData
      .filter(student => 
        selectedDept === 'All' || student.department === selectedDept
      )
      .filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedDept]);

  useEffect(() => {
    if (filteredStudents.length > 0) {
      setSelectedStudent(filteredStudents[0]);
    } else {
      setSelectedStudent(null);
    }
  }, [filteredStudents]);

  return (
    <Container>
      <Title>Manage Students</Title>
      <Controls>
        <Input 
          type="text" 
          placeholder="Search by name..." 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Select onChange={(e) => setSelectedDept(e.target.value)}>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </Select>
      </Controls>
      <p>Total Students: {filteredStudents.length}</p>
      <MainLayout>
        <StudentList>
          {filteredStudents.map((student) => (
            <StudentItem
              key={student.id}
              className={selectedStudent && selectedStudent.id === student.id ? 'active' : ''}
              onClick={() => handleStudentClick(student)}
            >
              {student.name}
            </StudentItem>
          ))}
        </StudentList>
        <StudentDetails>
          {selectedStudent ? (
            <>
              <DetailTitle>{selectedStudent.name}</DetailTitle>
              <Info><strong>Registration No:</strong> {selectedStudent.reg}</Info>
              <Info><strong>Email:</strong> {selectedStudent.email}</Info>
              <Info><strong>Phone:</strong> {selectedStudent.phone}</Info>
              <Info><strong>Department:</strong> {selectedStudent.department}</Info>
            </>
          ) : (
            <p>No student found.</p>
          )}
        </StudentDetails>
      </MainLayout>
    </Container>
  );
};

export default ManageStudents;
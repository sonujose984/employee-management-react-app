import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import EmployeeDetailsModal from './ViewModal'; // Import the modal component
const Read = () => {

    const [showModal, setShowModal] = useState(false);
    const [APIData, setAPIData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/Employee`)
            .then((response) => {
                setAPIData(response.data);
            })

    }, [])
    useEffect(() => {
        getData();
        fetchDepartments();
    }, []);

    const getData = () => {
        axios.get(`http://localhost:8000/Employee`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }

    const fetchDepartments = () => {
        axios.get(`http://localhost:8000/Department`)
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching department data:', error);
            });
    }
    const getDepartmentNameById = (departmentId) => {
        var department = departments.find(dep => dep.id === departmentId);
        return department ? department.DepartmentName : 'Unknown';
    }
    const setData = (data) => {
        localStorage.clear();
        console.log(data);
        let { id, Name, DepartmentId, Age, GenderId, Salary, YearsOfExperience } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('Name', Name);
        localStorage.setItem('DepartmentId', DepartmentId);
        localStorage.setItem('Age', Age);
        localStorage.setItem('GenderId', GenderId);
        localStorage.setItem('Salary', Salary);
        localStorage.setItem('YearsOfExperience', YearsOfExperience);
        setSelectedEmployee(data);
        setShowModal(true);

    }
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/Employee/${id}`)
            .then(() => {
                getData();
            })
    }
    return (
        <div className="container">
            <div className="card p-3">
                <div className="card-title">
                    <h2>Employee Management System</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn mb-2">
                        <Link to='/create' className="btn btn-success">Add New Employee</Link>
                        <br></br>
                    </div>
                    <table className="table table-bordered table-striped" >
                        <thead className="text-white font-weight-bold">
                            <tr>
                                <td className="col-2"><b>Employee ID</b></td>
                                <td className="col-4"><b>Name</b></td>
                                <td className="col-4"><b>Department</b></td>
                                <td className="col-2"><b>Actions</b></td>
                            </tr>
                        </thead>
                        <tbody>

                            {APIData && APIData.map(data => (
                                <tr >
                                    <td>{data.id}</td>
                                    <td>{data.Name}</td>
                                    <td>{getDepartmentNameById(data.DepartmentId)}</td>
                                    <td style={{ display: 'flex', gap: '10px' }}>
                                        <button className='btn btn-secondary btn-sm mr-1' onClick={() => setData(data)}>View</button>
                                        <Link to='/update' className='mr-1' >
                                            <a onClick={() => setData(data)} className="btn btn-primary btn-sm">Edit</a>
                                        </Link>

                                        <a onClick={() => { onDelete(data.id) }} className="btn btn-danger btn-sm">Delete</a>
                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
            <EmployeeDetailsModal employee={selectedEmployee} handleClose={handleCloseModal} show={showModal} />
        </div>

    )
}


export default Read

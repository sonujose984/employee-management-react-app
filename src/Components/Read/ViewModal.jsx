import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ViewModal = ({ employee, handleClose, show }) => {

    const [departments, setDepartments] = useState([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        fetchGender();
        fetchDepartments();
    }, []);

    const getDepartmentNameById = (departmentId) => {
        var department = departments.find(dep => dep.id === departmentId);
        return department ? department.DepartmentName : 'Unknown';
    }
    const getGenderById = (genderId) => {
        var gender = genders.find(gender => gender.id === genderId);
        return gender ? gender.Type : 'Unknown';
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
    const fetchGender = () => {
        axios.get(`http://localhost:8000/Gender`)
            .then((response) => {
                setGenders(response.data);
            })
            .catch((error) => {
                console.error('Error fetching Gender data:', error);
            });
    }
    if (!employee) {
        return null; // Render nothing if employee is null
    }
    return (
        <Modal show={show} onHide={handleClose} className="custom-modal">
            <Modal.Header closeButton >
                <Modal.Title ><b>{employee.Name}</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Employee ID: </strong> {employee.id}</p>
                <p><strong>Name: </strong> {employee.Name}</p>
                <p><strong>Department: </strong>{getDepartmentNameById(employee.DepartmentId)}</p>
                <p><strong>Age: </strong> {employee.Age}</p>
                <p><strong>Gender:</strong> {getGenderById(employee.GenderId)}</p>
                <p><strong>Salary:</strong> {employee.Salary}</p>
                <p><strong>Experience:</strong> {employee.YearsOfExperience} years</p>
            </Modal.Body>
            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ViewModal
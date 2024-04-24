import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Update = () => {
    let navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [genders, setGenders] = useState([]);
    const [id, setEmployeeID] = useState('');
    const [Name, setName] = useState('');
    const [DepartmentId, setDepartment] = useState('');
    const [GenderId, setGender] = useState('');
    const [Age, setAge] = useState('');
    const [Salary, setSalary] = useState('');
    const [YearsOfExperience, setExperience] = useState('');


    useEffect(() => {
        fetchDepartments();
        fetchGender();
        console.log(localStorage);
        setEmployeeID(localStorage.getItem('id'))
        setName(localStorage.getItem('Name'));
        setDepartment(localStorage.getItem('DepartmentId'));
        setGender(localStorage.getItem('GenderId'));
        setAge(localStorage.getItem('Age'));
        setSalary(localStorage.getItem('Salary'));
        setExperience(localStorage.getItem('YearsOfExperience'));
    }, []);

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

    const updateAPIData = () => {
        if (!id || !Name || !DepartmentId || !Age || !GenderId || !Salary || !YearsOfExperience) {
            alert('Please fill out all required fields.');
            return;
        }
        axios.put(`http://localhost:8000/Employee/${id}`, {
            id,
            Name,
            DepartmentId,
            Age,
            GenderId,
            Salary,
            YearsOfExperience
        })
            .then(() => {
                navigate('/') //root page
                alert("Updated Successfully")
            })
            .catch(function (error) {
                alert(error.message)
            })
    }
    return (
        <div className="container">
            <div className='card text-dark bg-light mb-3 p-3'>
                <h2 className='text-dark mb-3'>Update Employee Details</h2>
                <form >
                    <div className="form-group mb-2">
                        <label>Employee ID:</label>
                        <input type="text" className="form-control" name="EmployeeID" value={id} disabled />
                    </div>
                    <div className="form-group mb-2">
                        <label>Name:</label>
                        <input type="text" className="form-control" name="Name" value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="DepartmentId">Department</label>
                        <select
                            className="form-control"
                            id="DepartmentId"
                            name="DepartmentId"
                            value={DepartmentId} // Set the value attribute             
                            onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">-- Select Department --</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.DepartmentName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="Age">Age</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Age"
                            name="Age" value={Age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="GenderId">Gender</label>
                        <select
                            className="form-control"
                            id="GenderId"
                            name="GenderId"
                            value={GenderId} // Set the value attribute       
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">-- Select Gender --</option>
                            {genders.map((gender) => (
                                <option key={gender.id} value={gender.id}>
                                    {gender.Type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="Salary">Salary</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Salary"
                            name="Salary" value={Salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="YearsOfExperience">Years of Experience</label>
                        <input
                            type="text"
                            className="form-control"
                            id="YearsOfExperience"
                            name="YearsOfExperience" value={YearsOfExperience}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" onClick={updateAPIData} className="btn btn-primary">Submit</button>
                        <Link to='/'>
                            <a className="btn btn-secondary">Close</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Update
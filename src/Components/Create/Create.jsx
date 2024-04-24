import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Create = () => {
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
    const postData = () => {
        if (!id || !Name || !DepartmentId || !Age || !GenderId || !Salary || !YearsOfExperience) {
            alert('Please fill out all required fields.');
            return;
        }
        axios.post(`http://localhost:8000/Employee`, {
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
                alert("Successfully Created")
            })
            .catch(function (error) {
                alert(error.message)
            })
    }
    return (
        <div className="container">
            <div className='card text-dark bg-light mb-3 p-3'><h2 className='text-dark mb-3'>Create Employee</h2>
                <form >

                    <div className="form-group mb-2">
                        <label htmlFor="EmployeeID">Employee ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="EmployeeID"
                            name="EmployeeID"
                            onChange={(e) => setEmployeeID(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="Name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Name"
                            name="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="DepartmentId">Department</label>
                        <select
                            className="form-control"
                            id="DepartmentId"
                            name="DepartmentId"
                            onChange={(e) => setDepartment(e.target.value)}
                        >
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
                            name="Age"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="GenderId">Gender</label>
                        <select
                            className="form-control"
                            id="GenderId"
                            name="GenderId"
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
                            name="Salary"
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="YearsOfExperience">Years of Experience</label>
                        <input
                            type="text"
                            className="form-control"
                            id="YearsOfExperience"
                            name="YearsOfExperience"
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" onClick={postData} className="btn btn-primary">Submit</button>
                        <Link to='/'>
                            <a className="btn btn-secondary">Close</a>
                        </Link></div>
                </form>
            </div>
        </div >
    )
}


export default Create

import React, { useState, useEffect } from 'react';
import GetManagerID from './GetManagerID';


const DEV = () => {

    const [dev, setDev] = useState([])
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/employees/Developer');
                const json = await response.json();
                setDev(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    error && console.log(error);

    return (
        dev.map((dev) => (
            <div key={dev.id} className="card p-2 my-1" draggable>
                <p className="mb-2 h6">Name: {dev.name}</p>
                <p className="m-0 h6 small text-secondary">Designation: {dev.designation}</p>
                <p className="m-0 h6 small text-secondary">Team: {dev.team}</p>
                <p className="m-0 h6 small text-secondary">Reporting to: <GetManagerID  managerId={dev.manager}/> </p>
            </div>
        ))
    )
}
export default DEV;
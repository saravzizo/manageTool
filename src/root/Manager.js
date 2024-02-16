import React, { useState, useEffect } from 'react';
import GetManagerID from './GetManagerID';

const Manager = () => {

    const [manager, setManager] = useState([])
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/employees/Manager');
                const json = await response.json();
                setManager(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);


    error && console.log(error);
    
    return(
        manager.map((manager) => (
            <div key={manager.id} className="card p-2 my-1" draggable style={{maxWidth:292+"px"}}>
                <p className="mb-2 h6">Name: {manager.name}</p>
                <p className="m-0 h6 small text-secondary">Designation: {manager.designation}</p>
                <p className="m-0 h6 small text-secondary">Team: {manager.team}</p>
                <p className="m-0 h6 small text-secondary">Reporting to: <GetManagerID managerId={manager.manager}/></p>
            </div>
        ))
    );
}
export default Manager;
import React, { useState, useEffect } from 'react';
import GetManagerID from './GetManagerID';

const CEO = () => {
    const [ceo, setCeo] = useState([])
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/employees/CEO');
                const json = await response.json();
                setCeo(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    error && console.log(error);

    return (


        ceo.map((ceo) => (
            <div key={ceo.id} className="card p-2 my-1" draggable>
                <p className="mb-2 h6">Name: {ceo.name}</p>
                <p className="m-0 h6 small text-secondary">Designation: {ceo.designation}</p>
                <p className="m-0 h6 small text-secondary">Team: {ceo.team}</p>
                <p className="m-0 h6 small text-secondary">Reporting to: <GetManagerID  managerId={ceo.manager}/> </p>
            </div>
        ))
    );
}
export default CEO;
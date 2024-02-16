import React, { useState, useEffect } from 'react';
import GetManagerID from './GetManagerID';

const Tester = () => {

    const [test, settest] = useState([])
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/employees/Tester');
                const json = await response.json();
                settest(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    error && console.log(error);

    return (
        test.map((test) => (
            <div key={test.id} className="card p-2 my-1" draggable>
                <p className="mb-2 h6">Name: {test.name}</p>
                <p className="m-0 h6 small text-secondary">Team: {test.team}</p>
                <p className="m-0 h6 small text-secondary">Manager: <GetManagerID  managerId={test.manager}/> </p>
            </div>
        ))
    )
}
export default Tester;
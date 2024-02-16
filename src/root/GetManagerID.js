import { useState, useEffect } from 'react';

const GetManagerID = (managerId) => {

    const [users, setUsers] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/employees');
                const json = await response.json();
                setUsers(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);



    const manager = users.find((user) => user.id === managerId.managerId);

    error && console.log(error);
    
    return manager ? manager.name : 'not applicable';
}

export default GetManagerID;
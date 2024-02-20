import React, { useEffect, useState } from 'react';
import GetManagerID from '../GetManagerID';

const LeftPanel = () => {

    const [res, setRes] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/employees');
                const json = await response.json();
                setRes(json);
            } catch (error) {
                setError(error);
            }

        };
        fetchData();
    }, []);

    error && console.log(error);

    return (
        <div className='col-3 bg-dark' >
            <div className='mx-3 mt-3'>
                <p className='text-white h5'>Organizer</p>
            </div>
            <div className="card m-3 " style={{ height: "auto", maxHeight: 90 + "vh" }}>
                <div className="card-header">
                    <form>
                        <input className='form-control form-control-sm' type='text' placeholder='search here'   />
                    </form>
                </div>
                <div className="card-body m-0" style={{ overflow: "scroll" }}>
                    <ul className="m-0 p-0" >
                        <li className="list-unstyled">
                                {res.map((res) => (
                                        <div key={res.id} id={res.id} className="card p-2 my-2 " draggable style={{ width: 290 + "px", cursor: "grab" }}
                                        >
                                            <p className="mb-2 h6">Name: {res.name}</p>
                                            <p className="m-0 h6 small text-secondary">Designation: {res.designation}</p>
                                            <p className="m-0 h6 small text-secondary">Team: {res.team}</p>
                                            <p className="m-0 h6 small text-secondary">Reporting to: <GetManagerID managerId={res.manager} /></p>
                                        </div>
                                ))}
                        </li>
                    </ul>

                </div>
            </div>

        </div>
    );
}
export default LeftPanel;
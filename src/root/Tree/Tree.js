
import RightPanel from './RightPanel';
import React, { useEffect, useState } from 'react';
import FuzzySearch from 'fuzzy-search';
import Draggable from 'react-draggable';

function Tree() {

    // employee data from api
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



    // fuzzy search
    const [searchResult, setSearchResult] = useState('');
    const fuzzy = new FuzzySearch(res, ['name', 'team']);



    // drag and drop
    const [id, setId] = useState('');
    const drag = (ev) => {
        let id = ev.target.id;
        setId(id);
        ev.dataTransfer.setData("text", id);
        let data = res.filter((res) => res.id === id);
    }

    function allowDrop(ev) {
        ev.preventDefault();

    }

    function Drop(ev) {
        let id1 = id
        ev.target.appendChild(document.getElementById(id1));
        document.getElementById(id1).removeAttribute('draggable');
        ev.preventDefault();
        setSearchResult('');
    }


    //api for patch requests
    const handleNameChangeApi = (e) => {

        const patchName = async (id, str) => {
            let key = str
            try {
                const response = await fetch(`/api/employees/${id}`, {
                    method: 'put',
                    body: JSON.stringify({
                        [key]: e.target.innerText
                    }),
                });
                const json = await response.json();
                console.log(json);
            } catch (error) {
                console.log(error);
            }
        }

        let element = e.target;
        element.setAttribute('contenteditable', 'true');
        element.focus();
        element.onblur = function () {
            let id = e.target.id;

            if (element.className.includes('name')) {
                patchName(id, "name");
            }
            else if (element.className.includes('designation')) {
                patchName(id, "designation");
            }
            else if (element.className.includes('manager')) {
                patchName(id, 'manager')
            }
            else if (element.className.includes('team')) {
                patchName(id, 'team')
            }
            element.removeAttribute('contenteditable');
        }
    }


    return (

        <div className='d-flex flex-row' style={{ height: 100 + "%" }}>
            <div className='col-3 bg-dark' >
                <div className='mx-3 mt-3'>
                    <p className='text-white h5'>Organizer</p>
                </div>
                <div className="card m-3 " style={{ height: "auto", maxHeight: 90 + "vh" }}>
                    <div className="card-header">
                        <form>
                            <input className='form-control form-control-sm' type='text' placeholder='search by name or team...'
                                value={searchResult}
                                onChange={(e) => setSearchResult(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="card-body m-0" style={{ overflow: "scroll" }}>
                        <ul className="m-0 p-0" >
                            <li className="list-unstyled">

                                {
                                    searchResult ?
                                        fuzzy.search(searchResult).map((res) => (
                                            <Draggable key= {res.key}>
                                                <div key= {res.key} id= {res.key} className="card p-2 my-2 " draggable style={{ width: 290 + "px", cursor: "grab" }}
                                                    onDragStart={drag}
                                                >
                                                    <div className='d-flex felx-row align-items-baseline '>
                                                        <label className='h6'>Name: </label>
                                                        <p id={res.key} className="m-0 h6 p-1 name" onDoubleClick={handleNameChangeApi}> {res.name}</p>
                                                        <span className='flex-grow-1'></span>
                                                        <p className='m-0 small text-secondary'>Id: {res.key}</p>
                                                    </div>

                                                    <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                        <label className='small'>Designation: </label>
                                                        <p id={res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small designation">{res.designation}</p>
                                                    </div>
                                                    <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                        <label className='small'>Team: </label>
                                                        <p id= {res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small team">{res.team}</p>
                                                    </div>

                                                    <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                        <label className='small'>Reporting to: </label>
                                                        <p id= {res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small manager">{res.parent}</p>
                                                    </div>

                                                </div>
                                            </Draggable>

                                        ))
                                        :
                                        res.map((res) => (
                                            <Draggable key= {res.key}>
                                                <div key= {res.key} id= {res.key} className="card p-2 my-2 " draggable style={{ width: 290 + "px", cursor: "grab" }}
                                                    onDragStart={drag}
                                                >
                                                    <div className='d-flex felx-row align-items-baseline '>
                                                        <label className='h6'>Name: </label>
                                                        <p id= {res.key} className="m-0 h6 p-1 name" onDoubleClick={handleNameChangeApi}> {res.name}</p>
                                                        <span className='flex-grow-1'></span>
                                                        <p className='m-0 small text-secondary'>Id: {res.key}</p>
                                                    </div>

                                                    <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                        <label className='small'>Designation: </label>
                                                        <p id= {res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small designation">{res.designation}</p>
                                                    </div>
                                                    <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                        <label className='small'>Team: </label>
                                                        <p id= {res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small team">{res.team}</p>
                                                    </div>

                                                    <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                        <label className='small'>Reporting to: </label>
                                                        <p id= {res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small manager">{res.parent}</p>
                                                    </div>

                                                </div>
                                            </Draggable>

                                        ))}
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
            <RightPanel allow={allowDrop} drop={Drop} />
        </div>
    );
}

export default Tree;
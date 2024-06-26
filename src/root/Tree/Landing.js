
import RightPanel from './RightPanel';
import React, { useEffect, useState } from 'react';
import FuzzySearch from 'fuzzy-search';
import tippy from 'tippy.js';

function Landing() {

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

    tippy('[data-tippy-content]',
        {
            theme: 'light'
        })

    const handleAddNew = (e) => {
        document.getElementById('dragcard').classList.add('d-none');
        document.getElementById('formCard').classList.remove('d-none');
        document.getElementById('formCard').classList.add('d-block');
        e.preventDefault();
    }



    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [team, setTeam] = useState('');
    const [parent, setParent] = useState('');


    const addNew = async (e) => {
        try {
            const response = await fetch('/api/newEmployee', {
                method: 'post',
                body: JSON.stringify({
                    name:name,
                    designation: designation,
                    team: team,
                    parent: parent
                }),
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }



    return (

        <div className='d-flex flex-row' style={{ height: 100 + "%" }}>
            <div className='col-3 bg-dark' >
                <div className='mx-3 mt-3'>
                    <p className='text-white h5'>Organizer</p>
                </div>
                <div className="card m-3 " style={{ height: 90 + "vh", maxHeight: 90 + "vh" }}>
                    <div className="card-header">
                        <form className='d-flex flex-row align-items-center'>
                            <input className='form-control form-control-sm border-dark' type='text' placeholder='search by name or team...'
                                value={searchResult}
                                onChange={(e) => setSearchResult(e.target.value)}
                                style={{ boxShadow: "none" }}
                            />
                            <button data-tippy-content="Add New" className='btn btn-sm btn-outline-dark p-0 px-1' style={{ marginLeft: 10 + "px" }}
                            onClick={handleAddNew}

                            >
                                <i className="fa fa-plus"  ></i>
                            </button>

                        </form>

                    </div>
                    <div className="card-body m-0" style={{ overflow: "scroll" }}>
                        <ul className="m-0 p-0" >
                            <li className="list-unstyled" id="dragcard" >

                                {
                                    searchResult ?
                                        fuzzy.search(searchResult).map((res) => (

                                            <div key={res.key} id={res.key} className="card p-2 my-2 " draggable style={{ width: 290 + "px", cursor: "grab" }}
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
                                                    <p id={res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small team">{res.team}</p>
                                                </div>

                                                <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                    <label className='small'>Reporting to: </label>
                                                    <p id={res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small manager">{res.parent}</p>
                                                </div>

                                            </div>


                                        ))
                                        :
                                        res.map((res) => (

                                            <div key={res.key} id={res.key} className="card p-2 my-2 " draggable style={{ width: 290 + "px", cursor: "grab" }}
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
                                                    <p id={res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small team">{res.team}</p>
                                                </div>

                                                <div className='d-flex felx-row align-items-baseline text-secondary'>
                                                    <label className='small'>Reporting to: </label>
                                                    <p id={res.key} onDoubleClick={handleNameChangeApi} className="m-0 h6 p-1 small manager">{res.parent}</p>
                                                </div>

                                            </div>


                                        ))}
                            </li>   
                            <li className="list-unstyled d-none" id="formCard">
                                <div className="card p-2 my-2 " style={{ width: 290 + "px" }}>
                                    <div className='d-flex felx-row align-items-baseline justify-content-between px-1'>
                                        <label className='h6'>Name: </label>
                                        <input className="form-control form-control-sm w-50 my-1" 
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        />
                                    </div>

                                    <div className='d-flex felx-row align-items-baseline text-secondary justify-content-between px-1'>
                                        <label className='small'>Designation: </label>
                                        <input className="form-control form-control-sm  w-50 my-1" 
                                        onChange={(e) => setDesignation(e.target.value)}
                                        value={designation}
                                        />
                                    </div>
                                    <div className='d-flex felx-row align-items-baseline text-secondary justify-content-between px-1'>
                                        <label className='small'>Team: </label>
                                        <input className="form-control form-control-sm  w-50 my-1"
                                        onChange={(e) => setTeam(e.target.value)}
                                        value={team}
                                        />
                                    </div>

                                    <div className='d-flex felx-row align-items-baseline text-secondary justify-content-between px-1'>
                                        <label className='small'>Reporting to: </label>
                                        <input className="form-control form-control-sm  w-50 my-1" type='number'
                                        onChange={(e) => setParent(e.target.value)}
                                        value={parent}
                                        />
                                    </div>

                                    <div className='px-1'>
                                        <button className='btn btn-sm btn-outline-dark p-0 px-1 mt-3' style={{float:"right"}} onClick={addNew}>Add</button>
                                    </div>

                                </div>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
            <RightPanel id={id} />
        </div>
    );
}

export default Landing;
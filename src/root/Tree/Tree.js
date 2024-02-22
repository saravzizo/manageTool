
import RightPanel from './RightPanel';
import React, { useEffect, useState } from 'react';
import GetManagerID from '../GetManagerID';
import FuzzySearch from 'fuzzy-search';
import Draggable from 'react-draggable';

function Tree() {


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

  const [searchResult, setSearchResult] = useState('');
  const fuzzy = new FuzzySearch(res, ['name', 'team']);


  const [data, setData] = useState([]);
  const [id, setId] = useState('');

  const drag = (ev) => {
    let id = ev.target.id;
    setId(id);
    ev.dataTransfer.setData("text",id);
    let data  = res.filter((res) => res.id == id);
    setData(data);
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
                                searchResult?
                                fuzzy.search(searchResult).map((res) => (
                                  <Draggable>
                                    <div key={res.id} id={res.id} className="card p-2 my-2 " draggable style={{ width: 290 + "px", cursor: "grab" }}
                                    onDragStart={drag}
                                    >
                                        <p className="mb-2 h6">Name: {res.name}</p>
                                        <p className="m-0 h6 small text-secondary">Designation: {res.designation}</p>
                                        <p className="m-0 h6 small text-secondary">Team: {res.team}</p>
                                        <p className="m-0 h6 small text-secondary">Reporting to: <GetManagerID managerId={res.manager} /></p>
                                    </div>

                                    </Draggable>
                                ))
                                :
                                res.map((res) => (
                                      <Draggable>
                                        <div key={res.id} id={res.id} className="card p-2 my-2 " draggable style={{ width: 290 + "px", cursor: "grab" }}
                                        onDragStart={drag}
                                        >
                                            <p className="mb-2 h6">Name: {res.name}</p>
                                            <p className="m-0 h6 small text-secondary">Designation: {res.designation}</p>
                                            <p className="m-0 h6 small text-secondary">Team: {res.team}</p>
                                            <p className="m-0 h6 small text-secondary">Reporting to: <GetManagerID managerId={res.manager} /></p>
                                        </div>
                                        </Draggable>

                                ))}
                        </li>
                    </ul>

                </div>
            </div>

        </div>


        <RightPanel  allow = {allowDrop} drop = {Drop}/>

        
    </div>




  );
}

export default Tree;
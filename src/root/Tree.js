

import { useState } from "react";

function Tree() {

  return (
    <div style={{ height: 400 }} className="d-flex flex-row" id="Tree">

      <ul>
        <li>
        <a>
        <div className="card p-2 my-1" draggable style={{width:290+"px"}}>
          <p className="mb-2 h6">Name: </p>
          <p className="m-0 h6 small text-secondary">Designation:</p>
          <p className="m-0 h6 small text-secondary">Team: </p>
          <p className="m-0 h6 small text-secondary">Reporting to: </p>
        </div>
      </a>
        </li>
      </ul>
      

    </div>
  );
}

export default Tree;
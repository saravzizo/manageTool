
import React from 'react';
import Landing from '../Landing';


const RightPanel = (sendId) => {

    let id1 = sendId.id;

    function allowDrop(ev) {
        ev.preventDefault();

    }

    function Drop(ev) {
        let id = id1;
        ev.dataTransfer.setData("text", id);
        let element = document.getElementById(id);
        ev.target.appendChild(element);
    }

    return (
        <div className='col-9 bg-light'>


            <div id='myDiagramDiv' className="m-3 bg-dark border-black card p-2" style={{ height: 95 + "vh", overflowX: "scroll", overflowY: "scroll" }}
                onDrop={Drop}
                onDragOver={allowDrop}
            >

                <Landing />
            </div>
        </div>
    );
}
export default RightPanel;


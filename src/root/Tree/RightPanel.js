
import React from 'react';
import Draggable from 'react-draggable';
import { useState } from 'react';

const RightPanel = ({ allow, drop }) => {

    return (
        <div className='col-9 bg-light'>

            <div className="m-3 bg-dark border-black card p-2" style={{ height: 95 + "vh", overflowX: "scroll", overflowY: "scroll" }}
            onDrop={drop}
            onDragOver={allow}
            >  
            </div>
        </div>
    );
}
export default RightPanel;


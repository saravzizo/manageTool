
import React from 'react';
import Draggable from 'react-draggable';
import { useState } from 'react';

const RightPanel = () => {

    const [position, setPosition] = useState({});

    return (
        <div className='col-9 bg-light'>
            <div className="m-3 bg-secondary border-black card" style={{ height: 95 + "vh", overflowX: "scroll", overflowY: "scroll" }}>

                <Draggable>
                    <p>efw</p>
                </Draggable>

            </div>
        </div>
    );
}
export default RightPanel;


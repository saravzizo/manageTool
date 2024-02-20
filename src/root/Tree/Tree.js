
import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function Tree() {


  return (

    <div className='d-flex flex-row' style={{ height: 100 + "%" }}>
        <LeftPanel />
        <RightPanel />
    </div>




  );
}

export default Tree;
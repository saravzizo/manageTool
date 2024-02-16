import CEO from './CEO';
import Manager from './Manager';
import DEV from './DEV';
import Tester from './Tester';

const Landing = () => {

    return (

        <div className="d-flex flex-column bg-light flex-sm-row">
            <div id="ManagerCard" className="card col mx-1">
                <p className="h6 text-center m-0">CEOs</p>
                <hr className='m-1'></hr>
                <CEO />
            </div>


            <div id="ManagerCard" className="card col mx-1">
                <p className="h6 text-center m-0">Managers</p>
                <hr className='m-1'></hr>
                <Manager />
            </div>


            <div id="ManagerCard" className="card col mx-1">
                <p className="h6 text-center m-0">DEVs</p>
                <hr className='m-1'></hr>
                <DEV />
            </div>



            <div id="ManagerCard" className="card col mx-1">
                <p className="h6 text-center m-0">Testers</p>
                <hr className='m-1'></hr>
                <Tester />
            </div>

        </div>


        // </div>
    );
}
export default Landing;
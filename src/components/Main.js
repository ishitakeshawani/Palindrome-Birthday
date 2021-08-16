import { React } from 'react';
import Form from './Form';


const Main = () => {
  

  return (
    <div id="output" className="main">
      <h1>
        Enter your birthdate and we <br></br> will tell you if your birthdate is{" "}
        <br></br>a palindrome
      </h1>
      <h3>
        This app checks your birthdate in 4 formats <i>yyyy-mm-dd, dd-mm-yyyy,<br></br>
        mm-dd-yy, m-dd-yyyy</i><br></br> e.g. if your birthdate is 01 Aug 1995, then app will
        check for 19950801,<br></br> 01081995, 080195, 1081995
      </h3>
      <Form />
    </div>
  );
}



export default Main;
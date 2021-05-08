import React,{useState,Fragment,useEffect} from 'react'
import * as ReactBootStrap from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import { logout } from '../actions/auth';
import {connect} from 'react-redux';


function Nav({logout,isAuthenticated,user}) {
  const [redirect, setRedirect] = useState(false);
 




  const logout_user = () => {
    logout();
    setRedirect(true);
};

  const guestLinks = () => (
    <Fragment>
         <ReactBootStrap.Nav.Item>
        <ReactBootStrap.Nav.Link href="/login">sign in</ReactBootStrap.Nav.Link>
        </ReactBootStrap.Nav.Item>
        <ReactBootStrap.Nav.Item>
        <ReactBootStrap.Nav.Link href="/signup">sign up</ReactBootStrap.Nav.Link>
         </ReactBootStrap.Nav.Item>
    </Fragment>
);

const authLinks = () => (
 
  <Fragment>
  <ReactBootStrap.Nav.Item>
  <ReactBootStrap.Nav.Link href="/class">Home</ReactBootStrap.Nav.Link>
  </ReactBootStrap.Nav.Item>
  <ReactBootStrap.Nav.Item>
  <ReactBootStrap.Nav.Link onClick={logout_user}>Logout</ReactBootStrap.Nav.Link>
 </ReactBootStrap.Nav.Item>
 <ReactBootStrap.Nav.Item>
<ReactBootStrap.Nav.Link >{user.username}</ReactBootStrap.Nav.Link>
 </ReactBootStrap.Nav.Item>
 </Fragment>

)


    return (
      <Fragment>
      <div>
        <ReactBootStrap.Nav>                                                                                                             
        {isAuthenticated && user ? authLinks() : guestLinks()}
         </ReactBootStrap.Nav>
         {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
      </div>
      </Fragment>
    );   
     };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user:state.auth.user
});


export default connect(mapStateToProps,{logout}) (Nav);

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Fotter from  '../components/Footer';
import { connect } from 'react-redux';
import { checkAuthenticated,load_user } from '../actions/auth';

const Layout = ({ checkAuthenticated,load_user,children }) => {

    useEffect((props) => {
       checkAuthenticated();
       load_user();
    }, []);

    return (
        <div>
            <Navbar />
            {children}
            <Fotter/>
        </div>
    );
};



export default connect(null, { checkAuthenticated,load_user })(Layout);

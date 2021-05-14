import React from 'react';
import './App.css';
import Room from "./containers/Room";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home'
import ClassView from './containers/ClassView'
import Login from './containers/Login'
import Signup from './containers/Signup'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Layout from './hocs/Layout';
import {Provider} from 'react-redux';
import store from './Store';
import Addwork from './containers/Addwork';
import Works from './containers/Works';
import Submit from './containers/Submit';


function App() {
  return (
  <Provider store={store}>
      <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/class' component={ClassView} />
                    <Route exact path='/Room/:id' component={Room} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/Addwork/:id' component={Addwork} />
                    <Route exact path='/Works/:id' component={Works} />
                    <Route exact path='/Submit/:id' component={Submit} />
               
                </Switch>
            </Layout>
      </Router>
  </Provider>
   
  )
}

export default App

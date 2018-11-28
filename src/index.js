import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import NavBar from './components/navbar';
import PhotographersPage from './pages/photographersPage'
import PhotographerDetailPage from './pages/PhotographerDetailPage'
import LoginPage from './pages/loginPage'
import ProfilePage from './pages/profilePage'
//css files
import './css/navbar.css';
import './css/photographer.css';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path='/photographers' exact render={()=><PhotographersPage />} />
          <Route path='/photographers/:id' exact render={props=><PhotographerDetailPage {...props} />} />
          <Route path='/login' exact render={()=><LoginPage />} />
          <Route path='/profile' exact component={ProfilePage} />
        </Switch>
      </div>
    </Router>

  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

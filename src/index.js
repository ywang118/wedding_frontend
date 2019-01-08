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
import HomePage from './pages/HomePage'
import ProfilePage from './pages/profilePage'
import SignupPage from './pages/signupPage';
import GalleryImage from './pages/Gallery';
//css files
import './css/navbar.css';
import './css/photographer.css';
import './css/photographerDetail.css'
import './css/profile.css'
import './css/home.css'
import './css/gallery.css'
import './css/logIn.css'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path='/photographers' exact render={()=><PhotographersPage />} />
          <Route path='/photographers/:id' exact render={props=><PhotographerDetailPage {...props} />} />
          <Route path='/login' exact render={()=><LoginPage />} />
          <Route path='/' exact render={()=><HomePage />} />
          <Route path='/home' exact render={()=> <HomePage />} />
          <Route path='/profile' exact component={ProfilePage} />
          <Route path= '/gallery' exact render={()=> <GalleryImage />} />
          <Route path='/signup' exact component={SignupPage} />
        </Switch>
      </div>
    </Router>

  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { fetchUser } from './actions/actions';
import ProfilePage from './components/ProfilePage/profilePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SideBar from './components/SideBar';
import GameSelect from './components/Main/GameSelect';
import PlatformSelect from './components/Main/PlatformSelect';
import RegionSelect from './components/Main/RegionSelect';

class App extends Component {
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          <SideBar name={this.props.currentUser.name} profileImage={this.props.currentUser.photo} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/platform" component={PlatformSelect} />
          <Route exact path="/games" component={GameSelect} />
          <Route exact path="/region" component={RegionSelect} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, logoutUser } from '../actions/actions';
import * as Cookies from 'js-cookie';
import CreateLobby from './createLobby';
import io from 'socket.io-client';
import { socket } from '../App';


class SideBar extends Component {
  _userLogButton = () => {
    const accessToken = Cookies.get('accessToken');
    if (!this.props.currentUser.isLogged) {
      console.log('fetch user');
      this.props.dispatch(fetchUser(accessToken));
    } else if (this.props.currentUser.isLogged) {
      console.log('logout user');
      this.props.dispatch(logoutUser());
    }
  };
  _clickHandler() {
    socket.emit('create-group', {
      currentUser: this.props.currentUser,
      selection: this.props.selection
    });
  }

  render() {
    let buttonText = '';
    this.props.currentUser.isLogged
      ? (buttonText = 'Log Out')
      : (buttonText = 'Log In');

    let buttonPath = '';
    this.props.currentUser.isLogged
      ? (buttonPath = '/api/auth/logout')
      : (buttonPath = '/api/auth/google');

    return (
      <div className="sidebar">
        <Link to={'/'} className="main-text">
          <h1>Base</h1>
        </Link>
        <button onClick={this._clickHandler.bind(this)} />

        <div className="profile-container">
          <img src={this.props.profileImage} alt="" />
          <p>
            {this.props.name}
          </p>
        </div>
        <a href={buttonPath}>
          <button className="logout" onClick={this._userLogButton}>
            {buttonText}
          </button>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    selection: state.userSelections
  };
};

export default connect(mapStateToProps)(SideBar);

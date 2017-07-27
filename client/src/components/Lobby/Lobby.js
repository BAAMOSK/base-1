import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from './Icon';
import Title from './Title';
import Room from './Room';
import Required from './Required';
import { fetchPlatform } from '../../actions/lobby';
import {socket} from '../../App';

class Lobby extends Component {
  constructor(props) {
    super(props);
    socket.on('user-joined', (data) => {
      console.log(data);
    })
   
  }
 
  // renderLobbies() {
  //    socket.on('user-joined', (data) => {
  //     console.log(data);
  //   })
  // }

  render() {
    return (
      <div className="lobby" >
        <h3>Wow - NA - PC</h3>
          <Room />
          <Room />
          <Room />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    platform: state.platform,
    region: state.region,
    game: state.game
  }
}

export default connect(mapStateToProps, { fetchPlatform })(Lobby);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateGameSelection } from '../../actions/actions';
import games from '../../utils/games';
import Selector from './Selector';
import {socket} from '../../App';

class GameSelect extends Component {
  constructor() {
    super()

    this._clickHandler = this._clickHandler.bind(this);
  }

   _clickHandler() {
    socket.emit('join-room', {
      selection: this.props.userSelections
    });
  }
  render() {
    const gameRender = games.map(game => {
      return (
        <Selector
          key={game.title}
          title={game.title}
          image={game.image}
          onClick={p => this.props.dispatch(updateGameSelection(p))}
        />
      );
    });
    return (
      <div className="select-platform">
        <h2>Select Your Game</h2>
        <div className="platforms-container">
          {gameRender}
        </div>
        <Link to={'/lobby'}>
          <button onClick={this._clickHandler}>Find Lobby</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userSelections: state.userSelections
  };
};

export default connect(mapStateToProps)(GameSelect);

import React               from 'react';
import PureRenderComponent from './PureRenderComponent';
import {connect}           from 'react-redux';
import Winner              from './Winner';
import Tally               from './Tally';
import * as actionCreators from '../action_creators';

export class Results extends PureRenderComponent {
  render() {
    return (
      <div className="results">{this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Tally {...this.props} />}
        <div className="management">
          <button
            ref       = "next"
            className = "next"
            onClick   = {this.props.next}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pair: state.getIn(['vote', 'pair']),
  tally: state.getIn(['vote', 'tally']),
  winner: state.getIn(['winner']),
});

export default connect(
  mapStateToProps,
  actionCreators
)(Results);

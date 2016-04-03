/* eslint-env mocha */
import {fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const
      state = fromJS({}),
      action = {
        type: 'SET_STATE',
        state: fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {'Trainspotting': 1},
          },
        }),
      },
      nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {'Trainspotting': 1},
      },
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const
      state = fromJS({}),
      action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {'Trainspotting': 1},
          },
        },
      },
      nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {'Trainspotting': 1},
      },
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const
      action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {'Trainspotting': 1},
          },
        },
      },
      nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {'Trainspotting': 1},
      },
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const
      state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {'Trainspotting': 1},
        },
        hasVoted: 'Trainspotting',
      }),
      action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Sunshine', 'Slumdog Millionaire'],
          },
        },
      },
      nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire'],
      },
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const
      state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {'Trainspotting': 1},
        },
      }),
      action = {
        type: 'VOTE',
        entry: 'Trainspotting',
      },
      nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {'Trainspotting': 1},
      },
      hasVoted: 'Trainspotting',
    }));
  });

  it('does not set hasVoted for VOTE on some invalid entry', () => {
    const
      state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {'Trainspotting': 1},
        },
      }),
      action = {
        type: 'VOTE',
        entry: 'Sunshine',
      },
      nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {'Trainspotting': 1},
      },
    }));
  });

});

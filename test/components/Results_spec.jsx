/* eslint-env mocha */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import {fromJS} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const
      pair = fromJS(['Trainspotting', '28 Days Later']),
      tally = fromJS({'Trainspotting': 5}),
      component = renderIntoDocument(
        <Results pair={pair} tally={tally} />
      ),
      entries = scryRenderedDOMComponentsWithClass(component, 'entry'),
      [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const
      next = () => (nextInvoked = true),
      pair = fromJS(['Trainspotting', '28 Days Later']),
      component = renderIntoDocument(
        <Results
          pair  = {pair}
          tally = {fromJS({})}
          next  = {next}
        />
      );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results
        winner = "Trainspotting"
        pair   = {['Trainspotting', '28 Days Later']}
        tally  = {fromJS({})}
      />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    /* eslint-disable no-unused-expressions */
    expect(winner).to.be.ok;
    /* eslint-enable no-unused-expressions */
    expect(winner.textContent).to.contain('Trainspotting');
  });

});

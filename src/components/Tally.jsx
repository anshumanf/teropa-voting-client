import React               from 'react';
import PureRenderComponent from './PureRenderComponent';

export const VOTE_WIDTH_PERCENT = 8;

export default class Tally extends PureRenderComponent {
  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    if(this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }

  getVotesBlockWidth(entry) {
    return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
  }

  render()  {
    return (
      <div className="tally">
        {this.getPair().map(entry =>
          <div key={entry} className="entry">
            <h1>{entry}</h1>
            <div className="voteVisualization">
              <div
                className = "votesBlock"
                style     = {{width: this.getVotesBlockWidth(entry)}}
              >
              </div>
            </div>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

import React from 'react';
import PureRenderComponent from './PureRenderComponent';

class Winner extends PureRenderComponent {
  render() {
    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );
  }
}

export default Winner;

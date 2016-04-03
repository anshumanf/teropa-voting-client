import React from 'react';

const propTypes = {
  children: React.PropTypes.oneOf([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]),
};

class App extends React.Component {
  render()  {
    return this.props.children;
  }
}

App.propTypes = propTypes;

export default  App;

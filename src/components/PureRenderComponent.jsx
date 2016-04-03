import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class PureRenderComponent extends React.Component {
  shouldComponentUpdate(...args)  {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
}

export default PureRenderComponent;

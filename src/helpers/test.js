import React, { PropTypes } from 'react';

const propTypes = {};
const defaultProps = {};

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="test" />
    );
  }
}

Test.propTypes = propTypes;
Test.defaultProps = defaultProps;

export default Test;
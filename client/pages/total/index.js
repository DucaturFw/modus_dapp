import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

class Total extends React.Component {
  render() {
    const { tokens } = this.props;

    return (
      <Wrapper>
        <div>Total tokens: {tokens.length}</div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  font-size: 1.4rem;
`;

const Title = styled.h5``;

export default connect(state => ({
  tokens: state.tokens.list
}))(Total);

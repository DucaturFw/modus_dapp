import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import Token from './../../components/token';

class Process extends React.Component {
  get list() {
    const { token } = this.props;

    return token.tokens.map(item => {
      return <Token token={item} />;
    });
  }

  render() {
    const { token } = this.props;

    return (
      <Wrapper>
        <Title>Info about your ETF-Token</Title>
        <div>Address: {token.tokenId}</div>
        {this.list}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  flex: 0 0 50%;
  font-size: 1.4rem;
  padding-top: 20px;
`;

const Title = styled.h5`
  font-size: 1.5rem;
`;

export default connect(null)(Process);

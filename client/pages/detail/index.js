import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import Info from './info';
import Events from './events';

class Details extends React.Component {
  getToken() {
    const { id } = this.props.match.params;

    return this.props.tokens.find(token => token.address === id);
  }

  render() {
    const token = this.getToken();

    if (!token) {
      return <Title>not found :(</Title>;
    }
    return (
      <Wrapper>
        <Info token={token} />
        <Events token={token} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  flex-grow: 1;
  font-size: 1.4rem;

  display: flex;
  padding: 0 20px;

  height: 100%;
`;

const Title = styled.h5`
  margin: 50px;
  font-size: 2rem;
`;

export default connect(state => ({
  tokens: state.tokens.list
}))(Details);

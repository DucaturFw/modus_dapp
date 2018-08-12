import React from 'react';
import { connect } from 'react-redux';
import FA from 'react-fontawesome';
import styled from 'react-emotion';

import Token from './token';

class TokenList extends React.Component {
  get list() {
    const { id } = this.props.match.params;

    return this.props.tokens.map((token, idx) => {
      return <Token data={token} key={idx} active={token.tokenId === id} />;
    });
  }

  render() {
    return (
      <Wrapper>
        <Title>Your Tokens</Title>
        {!this.props.loading && <TokenContainer>{this.list}</TokenContainer>}
        {this.props.loading && (
          <Loading>
            <Icon name="spinner" spin />
            Loading...
          </Loading>
        )}
      </Wrapper>
    );
  }
}

export default connect(state => ({
  tokens: state.tokens.list,
  loading: state.tokens.loading
}))(TokenList);

const TokenContainer = styled.div`
  overflow-y: auto;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 20px;

  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 0 0 400px;
`;

const Title = styled.h3`
  font-size: 1.7rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Icon = styled(FA)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 15px;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1.4rem;
`;

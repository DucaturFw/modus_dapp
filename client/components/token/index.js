import React from 'react';
import styled from 'react-emotion';

export default class Token extends React.Component {
  render() {
    const { token } = this.props;
    return (
      <TokenWrap key={token.address}>
        <Sign>{token.sign}</Sign>
        <Info>
          <span>Name:</span>
          &nbsp;&nbsp;
          {token.name}
        </Info>
        <Info>
          <span>Address:</span>
          &nbsp;&nbsp;
          {token.address}
        </Info>
        <Info>
          <span>Price:</span>
          &nbsp;&nbsp;
          {token.price}
        </Info>
        <Info>
          <span>Stake:</span>
          &nbsp;&nbsp;
          {token.stake}%
        </Info>
      </TokenWrap>
    );
  }
}

const TokenWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Sign = styled.div`
  font-weight: bold;
`;

const Info = styled.div`
  padding-left: 20px;
`;

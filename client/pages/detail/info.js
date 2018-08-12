import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

class Process extends React.Component {
  get list() {
    const { token } = this.props;

    return token.tokens.map(item => {
      return (
        <Token key={item.address}>
          <Sign>{item.sign}</Sign>
          <Info>
            <span>Name:</span>
            &nbsp;&nbsp;
            {item.name}
          </Info>
          <Info>
            <span>Address:</span>
            &nbsp;&nbsp;
            {item.address}
          </Info>
          <Info>
            <span>Price:</span>
            &nbsp;&nbsp;
            {item.price}
          </Info>
          <Info>
            <span>Stake:</span>
            &nbsp;&nbsp;
            {item.stake}
          </Info>
        </Token>
      );
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

const Token = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Sign = styled.div`
  font-weight: bold;
`;

const Info = styled.div`
  padding-left: 20px;
`;

export default connect(null)(Process);

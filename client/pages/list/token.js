import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

class TokenItem extends React.Component {
  render() {
    const { data: token, active } = this.props;
    return (
      <Wrapper active={active}>
        <LinkDecorator to={`/${token.tokenId}`}>
          <Title>Id: {token.tokenId}</Title>
          <div>
            <span>Stake: {token.stake}</span>
          </div>
          {token.tokens.map(tkn => {
            return (
              <div key={tkn.address}>
                <span>
                  {tkn.sign} ({tkn.price} USD): {tkn.stake}%
                </span>
              </div>
            );
          })}
        </LinkDecorator>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px 10px 10px 0;
  font-size: 1.4rem;
  overflow: hidden;

  background: ${props => (props.active ? props.theme.misc.activeLight : props.theme.comp.back)};
`;

const Title = styled.h5`
  font-size: 1.5rem;
  font-weight: bold;
`;

const LinkDecorator = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.text.dark};
`;

export default connect(null)(TokenItem);

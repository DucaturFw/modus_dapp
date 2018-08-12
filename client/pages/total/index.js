import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import Token from './../../components/token';

class Total extends React.Component {
  getList() {
    const { tokens } = this.props;
    const list = [];

    tokens.forEach(tkn => {
      tkn.tokens.forEach(item => list.push(item));
    });

    return list.map(item => {
      return <Token token={item} />;
    });
  }

  render() {
    const { tokens } = this.props;

    return (
      <Wrapper>
        <div>Total tokens: {tokens.length}</div>
        <div>Stakes: </div>
        {this.getList()}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  font-size: 1.4rem;
  padding-top: 20px;
`;

const Title = styled.h5`
  font-size: 1.5rem;
`;

export default connect(state => ({
  tokens: state.tokens.list
}))(Total);

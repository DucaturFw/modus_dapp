import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'react-emotion';

import Info from './info';
import Events from './events';

import detilsActions from './../../actions/details';

class Details extends React.Component {
  componentDidMount() {
    const token = this.getToken();

    this.props.getHistory(token.tokenId);
  }

  componentWillReceiveProps(newProps) {
    const { id } = newProps.match.params;
    const token = newProps.tokens.find(token => token.tokenId === id);

    newProps.getHistory(token.tokenId);
  }

  getToken() {
    const { id } = this.props.match.params;

    return this.props.tokens.find(token => token.tokenId === id);
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

export default connect(
  state => ({
    tokens: state.tokens.list
  }),
  dispatch => bindActionCreators(detilsActions, dispatch)
)(Details);

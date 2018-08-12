import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'react-emotion';
import FA from 'react-fontawesome';

import Select from 'react-select';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import createActions from './../../actions/create';

class Create extends React.Component {
  state = {
    tokens: [],
    amount: 1
  };

  addOption = () => {
    if (this.state.tokens.length < this.props.erc20.length) {
      this.setState(state => ({
        ...state,
        tokens: [
          ...state.tokens,
          {
            sign: null,
            stake: null
          }
        ]
      }));
    }
  };

  getList = () => {
    return this.state.tokens.map((token, idx) => {
      const handleRemove = this.handleRemove.bind(this, idx);
      const emptySelect = token.stake === null;

      return (
        <TokenWrap key={idx}>
          {emptySelect && this.getSelect(token, idx)}
          {!emptySelect && this.getRange(token, idx)}
          <ActionIcon name="trash" onClick={handleRemove} />
        </TokenWrap>
      );
    });
  };

  getSelect = (token, idx) => {
    const onChange = this.selectOnChange.bind(this, idx);
    const onAccept = this.setAccept.bind(this, idx);
    const selected = token.sign
      ? {
          value: token.sign,
          label: token.sign
        }
      : null;

    return (
      <React.Fragment>
        <StyledSelect value={selected} onChange={onChange} options={this.getOptions()} />
        <ActionIcon name="check" onClick={onAccept} />
      </React.Fragment>
    );
  };

  getOptions = () => {
    return this.props.erc20.filter(tkn => !this.state.tokens.find(item => item.sign === tkn.sign)).map(token => ({
      value: token.sign,
      label: token.sign
    }));
  };

  setAccept = idx => {
    let stake = 0;

    if (this.state.tokens.length === 1) {
      stake = 100;
    }
    this.updateToken(idx, { stake });
  };

  selectOnChange = (idx, e) => {
    this.updateToken(idx, { sign: e.value, stake: null });
  };

  getRange = (token, idx) => {
    const handle = this.rangeHandle.bind(this, token, idx);
    return (
      <SliderWrap>
        {token.sign} - {token.stake}%<br />
        <Slider min={0} max={100} value={token.stake} onChange={handle} />
      </SliderWrap>
    );
  };

  rangeHandle = (token, idx, value) => {
    this.updateToken(idx, { stake: value });

    this.getStakeTokens(idx, value).map(item => {
      this.updateToken(item.index, { stake: item.stake });
    });
  };

  getStakeTokens(idx, value) {
    const stakes = this.state.tokens.map((tkn, i) => ({ ...tkn, index: i })).filter(tkn => tkn.index !== idx);
    const sum = stakes.reduce((sum, item) => {
      return sum + item.stake;
    }, 0);
    const rest = 100 - value;

    return stakes.map(tkn => ({
      ...tkn,
      stake: Math.round((tkn.stake / sum) * rest)
    }));
  }

  handleRemove = idx => {
    this.setState(state => ({
      ...state,
      tokens: [...state.tokens.slice(0, idx), ...state.tokens.slice(idx + 1)]
    }));
  };

  updateToken(idx, obj) {
    this.setState(state => ({
      ...state,
      tokens: [
        ...state.tokens.slice(0, idx),
        {
          ...state.tokens[idx],
          ...obj
        },
        ...state.tokens.slice(idx + 1)
      ]
    }));
  }

  isShowAdds = () => {
    return this.state.tokens.length > 1;
  };

  handleAmount = e => {
    const value = e.target.value;

    this.setState(state => ({
      ...state,
      amount: value
    }));
  };

  confirmToken = () => {
    const { tokens, amount } = this.state;

    this.props.createToken(tokens, amount);
  };

  render() {
    return (
      <Wrapper>
        <Title>Create new ETF-Token</Title>
        <Container>
          {this.getList()}
          <AddBtn onClick={this.addOption}>
            <StyledIcon name="plus" />
            &nbsp;&nbsp;Add ERC20 to Order
          </AddBtn>
          {this.isShowAdds() && (
            <Adds>
              <SmallTitle>Amount</SmallTitle>
              <StyeledInput type="number" onChange={this.handleAmount} value={this.state.amount} />
              <ConfirmBtn onClick={this.confirmToken}>Create Token</ConfirmBtn>
            </Adds>
          )}
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  font-size: 1.4rem;
  padding-top: 20px;
`;

const Title = styled.h5`
  text-align: center;
  font-size: 1.7rem;
`;

const Container = styled.div`
  width: 500px;
  margin: 10px auto;
`;

const AddBtn = styled.div`
  text-align: center;
  background: ${props => props.theme.comp.back};
  width: 200px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledIcon = styled(FA)`
  font-size: 1.8rem;
  color: ${props => props.theme.text.dark};
`;

const ActionIcon = styled(StyledIcon)`
  margin-left: 10px;
  cursor: pointer;
`;

const TokenWrap = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;

  height: 38px;
`;

const StyledSelect = styled(Select)`
  flex-grow: 1;
`;

const SliderWrap = styled.div`
  width: 95%;
`;

const Adds = styled.div`
  margin-top: 30px;
`;

const SmallTitle = styled(Title)`
  font-size: 1.4rem;
`;

const ConfirmBtn = styled(AddBtn)`
  background: ${props => props.theme.text.main};
`;

const StyeledInput = styled.input`
  height: 38px;
  width: 100%;

  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;

  padding: 2px 8px;
  font-size: 1.4rem;
  margin: 10px;
  outline: none;
`;

export default connect(
  state => ({
    erc20: state.tokens.erc20
  }),
  dispatch => bindActionCreators(createActions, dispatch)
)(Create);

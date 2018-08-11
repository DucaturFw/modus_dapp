import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import Menu from './menu';

import { getAccount } from './../../models';

class Header extends React.Component {
  render() {
    return (
      <Wrapper>
        <Item>
          <Title>Modus</Title>
        </Item>
        <Item>
          <Menu path={this.props.location.pathname} />
        </Item>
        <Item>
          <Info>
            <Account>
              <span>account</span>
              <br />
              <span>[{getAccount()}]</span>
            </Account>
            <div>
              <Label>
                <Signal active /> Main
              </Label>
              <Label>
                <Signal /> Plasma
              </Label>
            </div>
          </Info>
        </Item>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  background: ${props => props.theme.comp.darkBack};
`;

const Label = styled.div`
  color: ${props => props.theme.text.light};
  font-size: 1.4rem;
`;

const Title = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.text.main};
`;

const Info = styled.div`
  display: flex;
`;

const Account = styled(Label)`
  text-align: center;
  margin-right: 30px;
`;

const Signal = styled.span`
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background: ${props => (props.active ? props.theme.misc.green : props.theme.misc.red)};
`;

const Item = styled.div`
  flex: 0 0 33%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default connect()(Header);

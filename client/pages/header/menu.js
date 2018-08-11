import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    const { path } = this.props;
    const isTotal = path === '/';
    const isCreate = path === '/new';

    return (
      <React.Fragment>
        <Item active={isTotal}>
          <LinkDecorator to={'/'}>Total</LinkDecorator>
        </Item>
        <Item active={isCreate}>
          <LinkDecorator to={'/new'}>Create</LinkDecorator>
        </Item>
      </React.Fragment>
    );
  }
}

const Item = styled.div`
  font-size: 1.7rem;
  width: 50%;
  text-align: center;
  height: 100%;
  padding-top: 15px;

  background: ${props => (props.active ? props.theme.misc.active : props.theme.misc.unactive)};
`;

const LinkDecorator = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.text.light};
`;

export default connect(null)(Menu);

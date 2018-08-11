import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import theme from './styles/theme';
import './styles/styles.css';
import styled from 'react-emotion';

import TokensActions from './actions/tokens';

import Header from './pages/header';
import List from './pages/list';
import Create from './pages/create';
import Total from './pages/total';
import Detail from './pages/detail';

import { init } from './models';

class App extends Component {
  componentDidMount() {
    init()
      .then(this.props.loadERC20)
      .then(this.props.load)
      .then(this.props.loadComplete);
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <Route path="/" component={props => <Header {...props} />} />
            <ContentWrapper>
              <Route path="/:id?" component={props => <List {...props} />} />
              <Main>
                <Switch>
                  <Route exact path="/" component={Total} />
                  <Route path="/new" component={Create} />
                  <Route path="/:id" component={Detail} />
                </Switch>
              </Main>
            </ContentWrapper>
          </Container>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({
    loading: state.tokens.loading
  }),
  dispatch => bindActionCreators(TokensActions, dispatch)
)(App);

const Container = styled('div')`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
`;

const Main = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import theme from './styles/theme';
import './styles/styles.css';
import styled from 'react-emotion';
import FA from 'react-fontawesome';

import TokensActions from './actions/tokens';
import DetailsActions from './actions/details';

import Header from './pages/header';
import List from './pages/list';
import Create from './pages/create';
import Total from './pages/total';
import Detail from './pages/detail';

import { init } from './models';

import { getEventSubscriber, getAuctionEvents, getAuctionLotEvents, getBetData, getLotData } from './models';

class App extends Component {
  componentDidMount() {
    console.log(this.props);

    init()
      .then(this.props.loadERC20)
      .then(this.props.load)
      .then(this.props.loadComplete)
      .then(() => {
        console.log('start listening');

        getBetData().then(this.props.betLoad);
        getLotData().then(this.props.lotLoad);
        getAuctionEvents().on('data', this.props.betPush);
        getAuctionLotEvents().on('data', this.props.lotPush);

        getEventSubscriber().on('data', res => {
          let data = res.returnValues;

          console.log('get event', data);
        });
      });
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <ThemeProvider theme={theme}>
          <Wrapper>
            <Loader>
              <StyledIcon name="spinner" spin />
              loading...
            </Loader>
          </Wrapper>
        </ThemeProvider>
      );
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
  dispatch => bindActionCreators({ ...TokensActions, ...DetailsActions }, dispatch)
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

const Wrapper = styled.div`
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(FA)`
  font-size: 1.8rem;
  color: ${props => props.theme.text.dark};
  margin-right: 20px;
`;

const Loader = styled.div`
  font-size: 2rem;
`;

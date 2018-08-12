import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { format } from 'date-fns';

class Events extends React.Component {
  getCreated() {
    if (this.props.created) {
      let date = format(new Date(this.props.created.timestamp * 1000), 'HH:mm MM/DD/YYYY');
      return (
        <div>
          <MarkedText>{date}</MarkedText>
          <br />
          <p>
            <a href={`https://ropsten.etherscan.io/tx/${this.props.created.transactionHash}`} target="_blank">
              [txhash]
            </a>
            Token created
          </p>
        </div>
      );
    }
  }

  getEvents() {
    const { bet, lot } = this.props;
    let list = [];

    bet.forEach(item => list.push(item));
    lot.forEach(item => list.push(item));
    list.sort((a, b) => b.blockNumber - a.blockNumber);

    return list;
  }

  getEventsElems() {
    const list = this.getEvents();

    return list.map(item => {
      const data = item.returnValues;
      return (
        <div>
          <MarkedText>Block: {item.blockNumber}</MarkedText>
          <br />
          {item.event == 'CreateBet' && (
            <p>
              Create bet for token {data.lot} with [{data.amounts[0]}, {data.amounts[1]}]
            </p>
          )}
          {item.event == 'CreateLot' && <p>Create Lot for token {data.lot}</p>}
        </div>
      );
    });
  }

  render() {
    // console.log(this.props);
    this.getEvents();

    return (
      <Wrapper>
        <Item>
          <Title>Main Blockchain Events</Title>
          <Window>{this.getCreated()}</Window>
        </Item>
        <Item>
          <Title>Auction Blockchain Events</Title>
          <Window>{this.getEventsElems()}</Window>
        </Item>
      </Wrapper>
    );
  }
}
export default connect(state => ({
  created: state.details.created,
  bet: state.details.bet,
  lot: state.details.lot
}))(Events);

const Wrapper = styled.div`
  flex: 0 0 50%;
  font-size: 1.4rem;

  display: flex;
  flex-direction: column;

  padding-top: 10px;
`;

const Item = styled.div`
  height: 50%;
  width: 100%;

  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  overflow-y: auto;
`;

const Title = styled.div`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 10px;
`;

const Window = styled.pre`
  padding: 10px;
  border: 1px solid ${props => props.theme.border.darkBack};
  color: ${props => props.theme.text.light};
  background: ${props => props.theme.comp.darkBack};

  flex-grow: 1;
`;

const MarkedText = styled.span`
  font-weight: 700;
  color: ${props => props.theme.text.main};
`;

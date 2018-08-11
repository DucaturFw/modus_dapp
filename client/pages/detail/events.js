import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

class Events extends React.Component {
  render() {
    return (
      <Wrapper>
        <Item>
          <Title>Main Blockchain Events</Title>
          <Window>
            <div>
              <MarkedText>10.12.1313</MarkedText>
              <br />
              <p>Created contract at 0x4o342fhiwuehf87382382r</p>
            </div>
          </Window>
        </Item>
        <Item>
          <Title>Auction Blockchain Events</Title>
          <Window>
            <div>
              <MarkedText>10.12.1313</MarkedText>
              <br />
              <p>Created contract at 0x4o342fhiwuehf87382382r</p>
            </div>
          </Window>
        </Item>
      </Wrapper>
    );
  }
}

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

export default connect(null)(Events);

import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {AUTH_TOKEN} from '../constants'

import Login from './Login'
import Signup from './Signup'

import styled from 'styled-components'
import '../styles/styles.css'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import {StyledLink, RedText, Text, Categ, PanelLog, PanelSign, Nav, Title} from './styles'

const Wrapper = styled.div`
  height: 5.7vw;
  background-color: #2C3339;
`;

class Header extends Component {
  
  constructor(props) {
      super(props);
      this.state = { 
        visibleLog: false,
        visibleSign: false
      };
      this.handleClickLog = this.handleClickLog.bind(this)
      this.handleClickSign = this.handleClickSign.bind(this)
  }

  handleClickLog() {
    if (this.state.visibleSign === 1) {
      this.setState({visibleSign: !this.state.visibleSign});
    }
    this.setState({visibleLog: !this.state.visibleLog});
  }

  handleClickSign() {
    if (this.state.visibleLog === 1) {
      this.setState({visibleLog: !this.state.visibleLog});
    }
    this.setState({visibleSign: !this.state.visibleSign});
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <Wrapper>
          
          <Nav>
            <Categ>
              <StyledLink to="/anunturi/">
                    <Text> ANUNȚURI </Text>
              </StyledLink>
            </Categ>

            {authToken && (
              <Categ>
                <StyledLink to="/anunturi/creeaza/">
                  <Text> ADĂUGAȚI UN PRODUS NOU </Text>
                </StyledLink>
              </Categ>
            )}
            {authToken && (
              <Categ>
                <StyledLink to="/" onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN)
                    localStorage.removeItem('userID')
                }}>
                  <Text> IEȘIȚI DIN CONT </Text>
                </StyledLink>
              </Categ>
            )}
            {authToken && (
              <Categ>
                <StyledLink to={"/utilizatori/"+localStorage.getItem('userID')}>
                  <RedText> PROFIL </RedText>
                </StyledLink>
              </Categ>
            )}
            {!authToken && (
              <Categ>
                <a href="#">
                  <Text onClick={this.handleClickLog}> INTRAȚI ÎN CONT </Text>
                </a>
                <CSSTransitionGroup transitionName="Logslide" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                  {this.state.visibleLog? 
                    <PanelLog> <Login history={this.props.history}/> </PanelLog>
                  : null}
                </CSSTransitionGroup>
              </Categ>
            )}
            {!authToken && (
              <Categ>
                <a href="#">
                  <RedText onClick={this.handleClickSign}> ÎNREGISTRAȚI-VĂ </RedText>
                </a>
                <CSSTransitionGroup transitionName="Signslide" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                  {this.state.visibleSign? 
                    <PanelSign> <Signup history={this.props.history}/> </PanelSign>
                  : null}
                </CSSTransitionGroup>
              </Categ>
            )}
          </Nav>
          
          <StyledLink to="/">
            <Title> 
              Bazaaro 
            </Title>
          </StyledLink>

      </Wrapper>
    )
  }
}

export default withRouter(Header)
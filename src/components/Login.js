import React, {Component} from 'react'
import {AUTH_TOKEN} from '../constants'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

import {Input, Button} from './styles'

import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  font-size: 0.8vw;
`

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <Wrapper>
        <div>
          <div> ADRESA DE MAIL: </div>
          <Input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            spellcheck="false"
          />
          <br/>
          <div> PAROLA: </div>
          <Input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            spellcheck="false"
          />
        </div>
        <div>
          <a href="#">
            <Button onClick={() => this._confirm()}>
              LOGAȚI-VĂ
            </Button>
          </a>
        </div>
      </Wrapper>
    )
  }

  _confirm = async () => {
    const {email, password} = this.state
    const result = await this.props.loginMutation({
      variables: {
        email,
        password,
      },
    })
    this._saveUserData(result.data.login.token)
    localStorage.setItem('userID', result.data.login.user.id)
    localStorage.setItem('userName', result.data.login.user.name)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`

export default compose(graphql(LOGIN_MUTATION, {name: 'loginMutation'}))(Login)
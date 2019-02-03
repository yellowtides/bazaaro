import React, {Component} from 'react'
import {AUTH_TOKEN} from '../constants'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import {Input, Button} from './styles'

const Wrapper = styled.div`
  position: absolute;
  font-size: 0.8vw;
`

class Signup extends Component {
    state = {
        email: '',
        password: '',
        name: '',
    }

    render() {
        return (
            <Wrapper>
                <div>
                    <div> NUMELE ȘI PRENUMELE </div> <div> DUMNEAVOASTRĂ: </div>
                        <Input
                            maxLength="128"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                            type="text"
                            spellcheck="false"
                        />
                    <br/>
                    <div> ADRESA DE MAIL: </div>
                        <Input
                            maxLength="255"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                            type="text"
                            spellcheck="false"
                        />
                    <br/>
                    <div> ALEGEȚI O PAROLĂ: </div>
                        <Input
                            spellcheck="false"
                            maxLength="16"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                            type="password"
                        />
                    <br/>
                </div>
                <div>
                    <a href="#">
                        <Button disabled={!this.state.email || !this.state.password || !this.state.name}
                            onClick={() => this._confirm()}
                        >
                            CONFIRM
                        </Button>
                    </a>
                </div>
            </Wrapper>
        )
    }

    _confirm = async () => {
        const {name, email, password} = this.state
        const result = await this.props.signupMutation({
            variables: {
                name,
                email,
                password,
            },
        })
        const {token} = result.data.signup
        this._saveUserData(token)
        localStorage.setItem('userID', result.data.signup.user.id)
        localStorage.setItem('userName', result.data.signup.user.name)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name, rating: 0, no_reviews: 0) {
      token
      user {
        id
        name
      }
    }
  }
`

export default compose(graphql(SIGNUP_MUTATION, {name: 'signupMutation'}))(Signup)
import React, {Component} from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/styles.css'

import styled from 'styled-components'
import {CardTitle, LoadingCircle, LoadingText, Input, Stars, Skeleton} from './styles'
import UserPosts from './UserPosts';

const Wrapper = styled.div`
    color: #2C3339;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 1.75vw;
`
const StarWrapper = styled.div`
    unicode-bidi: bidi-override;
    font-size: 3.75vw;
    width: 15.7vw;
    height: 4vw;
    overflow: hidden;
    position: relative;
    margin: 0 auto 0.6vw;
    top: 0;
`
const Contact = styled.form`
    margin-top: 2vw;
`
const Entries = styled.div`
    float: right;
    width: 63vw;
    height: 80vh;
    position: relative;
`
const Left = styled.div`
    float: left;
    width: 35vw;
    background-color: #29384C;
    color: #EBEDF3;
    padding-bottom: 2vw;
    min-height: 38vw;
`
const Title = styled.div`
    text-align: center;
    font-weight: 600;
    padding: 2vw 0 0.4vw;
    font-size: 2.3vw;
`
const Line = styled.div`
    background-color: #2C3339;
    width: 20vw;
    font-weight: 500;
    height: 1px;
    margin: 0.25vw auto 1.5vw;
`
const Detail = styled.div`
    display: inline-block;
    float: left;
    margin-left: 1.5vw;
`
const Answer = styled.div`
    display: inline-block;
    float: right;
    width: 20vw;
    margin-right: 1.5vw;
`
const KanyeWest = styled.div`
    font-size: 1.5vw;
    margin-bottom: 1vw;
    display: block;
    width: 100%;
    overflow: hidden;
`
const Expl = styled.div`
    text-align: center;
    font-size: 0.8vw;
    margin-top: 2.5vw;
    margin-bottom: -0.75vw;
`
const TA = styled.textarea`
    display: inline-block;
    width: 13.5vw;
    margin-top: 0.7vw;
    font-family: 'Open Sans';
    outline: 0;
    height: 10vw;
    resize: none;
`
const Save = styled.input`
    float: right;
    margin-right: 9.9vw;    
    text-align: center;
    width: 10vw;
    font-weight: 600;
    font-size: 1vw;
    background-color: #2C3339;
    color: #EBEDF3;
    font-family: Open Sans;
    padding-top: 0.5vw; padding-bottom: 0.5vw;
    border: 0.1vw solid #2C3339;
    border-radius: 0.4vw;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    outline: none;
    :active {
        transform: translateY(0.4vw);
        box-shadow: none;
    }
`
class ProfilePage extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            tel: false,
            add: false,
            oth: false,
            telephone: "",
            address: "",
            other: ""
        };
        this.handleClickt = this.handleClickt.bind(this)
        this.handleClicka = this.handleClicka.bind(this)
        this.handleClicko = this.handleClicko.bind(this)
    }
  
    handleClickt() {
        this.setState({tel: !this.state.tel});
    }
    handleClicka() {
        this.setState({add: !this.state.add});
    }
    handleClicko() {
        this.setState({oth: !this.state.oth});
    }

    render() {
        return (
            <Query query={FIND_USER} variables={{ filter: this.props.match.params.userId }}>
                {({ data, loading, error }) => {
                    if (loading) {
                        return (
                            <div>
                                <LoadingCircle/>
                                <LoadingText>B</LoadingText>
                            </div>
                        )
                    }
                    if (error) {
                        return (
                            <div>Err...</div>
                        )
                    }
                    return(
                        <Wrapper>
                            <Left>
                                <Title> {data.finduser.name} </Title>
                                <Line style={{"background-color": "#EBEDF3"}}/>
                                <Expl>[media recenziilor de pe anunțurile utilizatorului]</Expl>
                                <StarWrapper>
                                    <Stars style={{"width": (data.finduser.no_reviews? (data.finduser.rating*20) : '0')+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></Stars>
                                    <Skeleton><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></Skeleton>
                                </StarWrapper>
                                
                                <Mutation mutation={EDIT_USER}>
                                    {(edituser, { data2, loading2, error2 }) => {
                                        return (
                                            <Contact onSubmit={async e => {
                                                e.preventDefault()
                                                var { telephone, address, other } = this.state
                                                await edituser({
                                                    variables: { telephone, address, other },
                                                })
                                                window.location.reload()
                                            }}>
                                                <CardTitle style={{"margin-bottom": "1vw", "font-size":"2vw"}}>Contact:</CardTitle>
                                                <Line style={{"background-color":"#EBEDF3", "margin-top": "-1.25vw", "width": "12vw"}}/>
                                                <KanyeWest>
                                                    <Detail>Telefon:</Detail>
                                                    {!this.state.tel?
                                                        <Answer>
                                                            {data.finduser.telephone}
                                                            {(this.props.match.params.userId === localStorage.getItem('userID')) &&
                                                                <a onClick={this.handleClickt} href="#"> ✎</a>
                                                            } 
                                                        </Answer>
                                                        :
                                                        <Answer>
                                                            <Input
                                                                onChange={e => this.setState({ telephone: e.target.value })}
                                                                value={this.state.telephone}
                                                                spellcheck="false"
                                                                style={{"margin": "0", "display": "inline-block"}}
                                                            />
                                                            {(this.props.match.params.userId === localStorage.getItem('userID')) &&
                                                                <a onClick={this.handleClickt} href="#"> ✎</a>
                                                            } 
                                                        </Answer>
                                                    }
                                                </KanyeWest>
                                                <KanyeWest>
                                                    <Detail>Adresă:</Detail>
                                                    {!this.state.add?
                                                        <Answer>
                                                            {data.finduser.address}
                                                            {(this.props.match.params.userId === localStorage.getItem('userID')) &&
                                                                <a onClick={this.handleClicka} href="#"> ✎</a>
                                                            } 
                                                        </Answer>
                                                        :
                                                        <Answer>
                                                            <Input
                                                                onChange={e => this.setState({ address: e.target.value })}
                                                                value={this.state.address}
                                                                spellcheck="false"
                                                                style={{"margin": "0", "display": "inline-block"}}
                                                            />
                                                            {(this.props.match.params.userId === localStorage.getItem('userID')) &&
                                                                <a onClick={this.handleClicka} href="#"> ✎</a>
                                                            } 
                                                        </Answer>
                                                    }
                                                </KanyeWest>
                                                <KanyeWest>
                                                    <Detail>E-mail:</Detail>
                                                    <Answer>
                                                        {data.finduser.email}
                                                    </Answer>
                                                </KanyeWest>
                                                <KanyeWest>
                                                    <Detail>Alte detalii:</Detail>
                                                    {!this.state.oth?
                                                        <Answer>
                                                            {data.finduser.other}
                                                            {(this.props.match.params.userId === localStorage.getItem('userID')) &&
                                                                <a onClick={this.handleClicko} href="#"> ✎</a>
                                                            } 
                                                        </Answer>
                                                        :
                                                        <Answer>
                                                            <TA
                                                                spellcheck="false"
                                                                onChange={e => this.setState({ other: e.target.value })}
                                                            />
                                                            {(this.props.match.params.userId === localStorage.getItem('userID')) &&
                                                                <a onClick={this.handleClicko} href="#"> ✎</a>
                                                            } 
                                                        </Answer>
                                                    }
                                                </KanyeWest>
                                                {(this.state.oth || this.state.add || this.state.tel) &&
                                                    <Save type="submit" value="Salvați" disabled={(!this.state.other && !this.state.address && !this.state.telephone)}/>
                                                }
                                            </Contact>
                                        )    
                                    }}
                                </Mutation>
                            </Left>
                            <Entries>
                                <Title> Postări </Title>
                                <Line/>
                                <UserPosts match={this.props.match}/>
                            </Entries>
                        </Wrapper>     
                    )
                }}
            </Query>  
        )
    }
}

const FIND_USER = gql`
    query FindUser($filter: String!) {
        finduser(filter: $filter) {
            id
            name
            email
            rating
            no_reviews
            telephone
            address
            other
        }
    }
`
const EDIT_USER = gql`
    mutation EditUser($telephone: String, $address: String, $other: String) {
        edituser(telephone: $telephone, address: $address, other: $other) {
            id
        }
    }
`
export default ProfilePage
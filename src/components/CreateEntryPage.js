import React, {Component} from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import Entry from './Entry'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import '../styles/styles.css'

import styled from 'styled-components'

const Wrapper = styled.div`
    display: relative;
`
const Step = styled.div`
    display: block;
    height: 17vw;
    margin-top: 3vw;
    margin-bottom: 8vw;
    width: 75vw;
`
const SubHeader = styled.div`
    position: absolute;
    float: left;
    font-family: Galada, cursive;
    font-size: 4.5vw;
    color: #2C3339;
    width: 70vw;
    left: 0;
    right: 0;
    margin: 0 auto;
`
const BoldRed  = styled.span`
    font-weight: 600;
    color: #D93732;
`
const Blue  = styled.span`
    font-weight: 600;
    color: #29384C;
`
const Line = styled.div`
    width: 70vw;
    height: 2px;
    background-color: #2C3339;
    margin-top: -2vw;
    margin-bottom: 3vw;
`
const Content = styled.div`
    float: right;
    width: 35vw;
    text-align: right;
    margin-right: 2vw;
    font-family: Open Sans;
    font-size: 1.5vw;
`
const Save = styled.input`
    font-weight: 600;
    float: right;
    margin: 1.5vw 9.9vw 3vw;    
    text-align: center;
    width: 12vw;
    font-size: 1vw;
    background-color: #29384C;
    color: #EBEDF3;
    font-family: Open Sans;
    padding-top: 0.7vw; padding-bottom: 0.7vw;
    border: 0.1vw solid #2C3339;
    border-radius: 0.4vw;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    outline: none;
    :active {
        background-color: #2C3339;
        transform: translateY(0.4vw);
        box-shadow: none;
    }
`
const Overlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.8;
    z-index: 5;
`
const Container = styled.div`
    z-index:5;
    font-family: Open Sans;
    position: relative;
    float: left;
    margin-bottom: 3vw;
    text-align: center;
    left: 50%;
    top: 35vw;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 25vw;
    height: 47.5vw;
    border: 1px solid black;
    background-color: #EBEDF3;
`
const Textbox = styled.textarea`
    font-family: Open Sans;
    outline: none;
    width: 20vw;
    font-size: 1vw;
    height: 12.5vw;
    margin: -1.5vw auto 0;
    resize: none;
`
const Confirmbutton = styled.button`
    margin: 2vw auto 0;
    text-align: center;
    width: 10vw;
    font-size: 1vw;
    font-weight: 600;
    background-color: #29384C;
    color: #EBEDF3;
    padding-top: 0.5vw; padding-bottom: 0.5vw;
    border: 0.1vw solid #29384C;
    border-radius: 0.4vw;
    font-family: Open Sans;
    :hover {
        background-color: #2C3339;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    :active {
        outline: none;
    }
    :focus{
        outline: none;
    }
`
const FieldW = styled.div`
    position: relative;
    display: block;
    font-size: 1.25vw;
    font-family: Open Sans;
    width: 20vw;
    margin: 0 auto;
`
const AmySchumer = styled.div`
    display: block;
    margin-bottom: 3vw;
`
const Question = styled.div`
    display: block;
    text-align: left;
    font-weight: 600;
    padding: 1.5vw 0 0.5vw 0;
`
const Field = styled.input`
    color: #29384C;
    font-family: Open Sans;
    font-size: 1vw;
    display: inline-block;
    font-family: Open Sans;
    margin-top: 1vw;
    outline: none;
    float: right;
    height: 1.5vw;
    width: 10vw;
`
const Line2 = styled.div`
    display: block;
    width: 20vw;
    position: absolute;
    left: 0; right: 0;
    margin: 0 auto;
    height: 1px;
    background-color: #2C3339;
`
const Price = styled.div`
    display: inline-block;
    width: 20vw;
    height: 2vw;
`
const JasonDerulo = styled.div`
    display: inline-block;
    font-size: 1vw;
`
const Option = styled.option`
`
const Select = styled.select`
    color: #29384C;
    font-family: Open Sans;
    outline: none;
    height: 2vw;
    width: 4vw;
    font-size: 1vw;
`
class CreateEntryPage extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            entry: {
                id: "",
                title: "-",
                createdAt: new Date(),
                postedBy: {
                    name: localStorage.getItem('userName'),
                },
                produce: "",
                description: "",
                rating: 0,
                no_reviews: 0,
                price_lei: 0,
                price_bani: 0,
                per: "1kg",
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }
  
    handleClick() {
        this.setState({visible: !this.state.visible});
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.setState({visible: false});
        }
    }
  
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }
  render() {
    let entry = Object.assign({}, this.state.entry);
    return (
        <Mutation mutation={POST_MUTATION}>
            {(post, { data, loading, error }) => {
                return(
                    <Wrapper>
                        <div style={{"z-index": "100", "position": "relative"}}>                                             
                            <CSSTransitionGroup transitionName="Signslide" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                                {this.state.visible?
                                    <div>
                                        <Overlay onClick={this.handleClick}/> 
                                        <Container>
                                            <FieldW>
                                                <AmySchumer>
                                                    <Question>Titlu:</Question>
                                                    <Line2/>
                                                    <Field onChange={e => {
                                                        entry.title = e.target.value;
                                                        this.setState({entry: entry});
                                                    }}
                                                        value={this.state.entry.title}
                                                        spellcheck="false"
                                                        type="text"
                                                    />
                                                </AmySchumer>
                                                <AmySchumer>
                                                    <Question>Tipul produsului:</Question>
                                                    <Line2/>
                                                    <Field onChange={e => {
                                                        entry.produce = e.target.value;
                                                        this.setState({entry: entry});
                                                    }}
                                                        value={this.state.entry.produce}
                                                        placeholder="(ex. mere, pere, etc.)"
                                                        spellcheck="false"
                                                    />
                                                </AmySchumer>
                                                <AmySchumer>
                                                    <Question>Preț:</Question>
                                                    <Line2/>
                                                    <Price>
                                                        <JasonDerulo>
                                                            <Field onChange={e => {
                                                                entry.price_lei = e.target.value;
                                                                this.setState({entry: entry});
                                                            }}
                                                                value={entry.price_lei}
                                                                type="number"
                                                                spellcheck="false"
                                                                min="0"
                                                                style={{"width": "3.1vw", "float":"none", "margin-right": "0.3vw", "text-align": "right"}}
                                                            />
                                                            lei
                                                        </JasonDerulo>
                                                        <JasonDerulo>
                                                            <Field onChange={e => {
                                                                entry.price_bani = e.target.value;
                                                                this.setState({entry: entry});
                                                            }}
                                                                value={entry.price_bani}
                                                                type="number"
                                                                spellcheck="false"
                                                                min="0"
                                                                max="99"
                                                                style={{"width": "2.4vw", "float":"none", "margin-left": "0.3vw", "text-align": "right"}}
                                                            /> bani
                                                        </JasonDerulo>
                                                        <br/> 
                                                        <JasonDerulo> 
                                                            per
                                                            <Select style={{"margin":"1vw 0 0 0.3vw"}}  
                                                                onChange={e => {
                                                                    entry.per = e.target.value;
                                                                    this.setState({entry: entry});
                                                                }}>
                                                                <Option>1kg</Option>
                                                                <Option>100g</Option>
                                                                <Option>10g</Option>
                                                                <Option>buc.</Option>
                                                            </Select>
                                                        </JasonDerulo>
                                                    </Price>
                                                </AmySchumer>
                                                <AmySchumer>
                                                    <Question style={{"margin-top":"-3.5vw"}}>Descriere:</Question>
                                                    <Line2/>
                                                </AmySchumer>
                                            </FieldW>
                                            <Textbox
                                                spellcheck="false"
                                                onChange={e => {
                                                    entry.description = e.target.value;
                                                    this.setState({entry: entry});
                                                }}/>
                                            <Confirmbutton onClick={this.handleClick}>Confirm</Confirmbutton>
                                        </Container>
                                    </div>
                                : null}
                            </CSSTransitionGroup>
                        </div>
                        <Step style={{"margin-bottom": "-3vw"}}>
                            <SubHeader>
                                Pasul <BoldRed>1</BoldRed>
                                <Line/>
                                <Content>Configurați-vă profilul pentru ca să puteți fi contactat de potențialii clienți! <br/>Puteți face acest lucru accesând profilul dvs. și apăsând simbolurile (<BoldRed>✎</BoldRed>).</Content>
                            </SubHeader>
                        </Step>
                        <Step>
                            <SubHeader>
                                Pasul <BoldRed>2</BoldRed>
                                <Line/>
                                <Entry preview="prev" entry={this.state.entry} style={{"width": "1vw"}}/>
                                <Content style={{"width": "30vw", "display": "inline-block", "margin": "0.5vw 2vw 0"}}>Introduceți detaliile produsului pe care vreți să îl publicați!<br/><Save onClick={this.handleClick} style={{"margin-right": "7vw"}} type="submit" value="Editați anunțul"/></Content>                    
                            </SubHeader>
                        </Step>
                        <Step>
                            <SubHeader>
                                Pasul <BoldRed>3</BoldRed>
                                <Line/>
                                <Content><BoldRed>Notă</BoldRed>: apăsarea acestui buton atestă faptul că ați citit și aderat <Blue>termenilor și condițiilor de utilizare</Blue> ai site-ului nostru.<br/>
                                <form onSubmit={async (event) => {
                                        event.preventDefault()
                                        const { title, produce, description, price_lei, price_bani, per } = this.state.entry
                                        await post({
                                            variables: { title, produce, description, price_lei, price_bani, per },
                                        })
                                        window.location.reload()
                                    }}>
                                    <Save type="submit" value="Adăugați produsul!"/>
                                </form>
                                </Content>
                            </SubHeader>
                        </Step>
                    </Wrapper>
                )
            }}
        </Mutation>  
    )
  }
}
const POST_MUTATION = gql`
    mutation PostMutation($title: String!, $produce: String!, $description: String!, $price_lei: Int!, $price_bani: Int!, $per: String!) {
        post (
            title: $title
            produce: $produce,
            description: $description,
            price_lei: $price_lei,
            price_bani: $price_bani,
            per: $per,
            rating: 0,
            no_reviews: 0,
        ) {
            id
        }
    }
`
export default CreateEntryPage
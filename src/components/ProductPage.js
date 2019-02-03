import React, {Component} from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/styles.css'
import {AUTH_TOKEN} from '../constants'
import {timeDifferenceForDate} from '../utils'
import AddReview from './AddReview'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import styled from 'styled-components'
import {Slideleftbutton, Sliderightbutton, LoadingText, LoadingCircle} from './styles'

import ReviewList from './ReviewList'

const Wrapper = styled.div`
    color: #2C3339;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 1.75vw;
`
const SlideShow = styled.div`
    width: 20vw;
    height: 20vw;
    margin: 2vw auto 0;
    background-color: #29384C;
    position: relative;
    z-index:-4;
`
const Reviews = styled.div`
    float: right;
    height: 84vh;
    width: 25vw;
    margin-right: 1.35vw;
    margin-top: 2vw;
    position: relative;
    height: 30vw;
`
const Title = styled.div`
    padding-top: 2vw;
    font-size: 2vw;
    font-weight: 600;
    max-width: 47vw;
`
const Date = styled.div`
    margin-top: 3vw;
    font-size: 1.2vw;
`
const Price = styled.div``
const Descr = styled.div`
    padding-top: 2vw; 
    margin-left: 2vw;
    margin-right: 2vw;
    font-size: 1.3vw;
    text-align: justify;
`
const Contact = styled.div`
    margin: 4vw auto 0;
    text-align: center;
    width: 15vw;
    background-color: #29384C;
    color: #EBEDF3;
    padding-top: 0.5vw; padding-bottom: 0.5vw;
    border: 0.1vw solid #29384C;
    border-radius: 0.4vw;
    :hover {
        background-color: #2C3339;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`
const Leftside = styled.div`
    float: left;
    width: 25vw;
`
const Line = styled.div`
    background-color: #2C3339;
    width: 30vw;
    font-weight: 500;
    height: 1px;
    margin: 0.25vw auto 2vw;
`
const Content = styled.div`
    display: inline-block; 
    width: 47vw;
    text-align: center;
`
const Addreview = styled.div`
    margin: 0 auto 1.5vw;
    text-align: center;
    font-weight: 600;
    width: 10vw;
    font-size: 1.25vw;
    background-color: #29384C;
    color: #EBEDF3;
    padding-top: 0.5vw; padding-bottom: 0.5vw;
    border: 0.1vw solid #29384C;
    border-radius: 0.4vw;
    :hover {
        background-color: #2C3339;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
class ProductPage extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            visible: false
        };
        this.handleClick = this.handleClick.bind(this)
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
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <Query query={FIND_QUERY} variables={{ filter: this.props.match.params.entryId }}>
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
                        <div>
                            {data.findentry.map(entry => (
                                    <Wrapper>                   
                                        <div style={{"z-index": "100", "position": "relative"}}>                                          
                                            <CSSTransitionGroup transitionName="Signslide" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                                                {this.state.visible?
                                                    <div>
                                                        <Overlay onClick={this.handleClick}/> 
                                                        <AddReview entryId = {entry.id} history={this.props.history}/>
                                                    </div>
                                                : null}
                                            </CSSTransitionGroup>
                                        </div>
                                        <Leftside>
                                            <SlideShow>
                                                <Slideleftbutton style={{"top": "7.75vw", "font-size": "3vw", "left": "1vw"}}> &#10094; </Slideleftbutton>
                                                <Sliderightbutton style={{"top": "7.75vw", "font-size": "3vw", "right": "1.1vw"}}> &#10095; </Sliderightbutton>
                                            </SlideShow>
                                            <a href={"/utilizatori/"+entry.postedBy.id}>
                                                <Contact>Profilul vânzătorului</Contact>
                                            </a>
                                        </Leftside>
                                        <Reviews> 
                                            {authToken && (
                                                <a href="#">
                                                    <Addreview onClick={this.handleClick}>
                                                        Adăugați o recenzie!
                                                    </Addreview>
                                                </a>
                                            )}
                                            <ReviewList match={this.props.match}/>                                             
                                        </Reviews>
                                        <Content>
                                            <Title> {entry.title} </Title>
                                            <Line style={{"width": "18vw", "height": "2px"}}/>
                                            <span>
                                                <Date> {timeDifferenceForDate(entry.createdAt)} </Date>
                                                <Price>{entry.price_lei}<sup style={{"font-size": "1vw"}}>{(entry.price_bani<=9) && '0'}{entry.price_bani}</sup> lei / {entry.per}</Price>
                                            </span>
                                            <Line/>
                                            <Descr>{entry.description}</Descr>
                                        </Content>
                                    </Wrapper>
                                ))
                            }
                        </div>
                    )
                }}
            </Query>  
        )
    }

}

const FIND_QUERY = gql`
    query FindQuery($filter: String!) {
        findentry(filter: $filter) {
            id
            title
            createdAt
            postedBy {
                name
                id
            }
            produce
            description
            rating
            no_reviews
            price_lei
            price_bani
            per
        }
    }
`
export default ProductPage
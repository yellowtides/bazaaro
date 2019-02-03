import React, {Component} from 'react'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import {CardName, Descr, RevFooter, Like, Skeleton, Stars} from './styles'

const Rev = styled.div`
    font-family: Open Sans;
    font-size: 1.1vw;
    color: #EBEDF3;
    background-color: #2C3339;
    min-height: 10.7vw;
    width: 23vw;
    margin: 0 auto;
    margin-bottom: 1vw;
    position: relative;
`
const StarWrapper = styled.div`
    unicode-bidi: bidi-override;
    font-size: 2vw;
    width: 8.35vw;
    height: 2.2vw;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: 0 auto 0.65vw;
    top: 0.5vw;
    left: 1vw;
`
const FootW = styled.div`
    margin-right: 1.5vw;
    position: relative;
    text-align: right;
    bottom: 0;
`
const Likes = styled.div`
    position: absolute;
    bottom: 1.5vw;
    left: 0.6vw;
    display: inline-block;
    margin-left: 1vw;
    float: left;
`
const Line = styled.div`
    background-color: #EBEDF3;
    width: 13vw;
    font-weight: 500;
    height: 1px;
    margin: 0.75vw auto 1.5vw;
`
class Review extends Component {
  render() {
    return (
        <Mutation mutation={VOTE_MUTATION}>
            {(vote, { data, loading, error }) => {
                return(
                    <Rev>
                        <span>
                            <a href={"/utilizatori/"+this.props.review.postedBy.id} style={{"color": "#EBEDF3"}}>
                                <CardName style={{"display": "inline-block", "margin-left": "1.5vw", "margin-top": "1vw", "text-align": "left", "width": "11vw"}}>{this.props.review.postedBy.name}</CardName>
                            </a>
                            <StarWrapper>
                                <Stars style={{"width": (this.props.review.opinion*20)+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></Stars>
                                <Skeleton><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></Skeleton>
                            </StarWrapper>
                            <Line/>
                        </span>
                        <Descr>{this.props.review.content}</Descr>
                        <FootW>
                            <a href="#" style={{"color": "#EBEDF3"}}>
                                <Likes>
                                    <Like onClick={async e => {
                                        e.preventDefault()
                                        const reviewId = this.props.review.id
                                        const opinion = 1
                                        await vote({
                                            variables: { reviewId, opinion },
                                        })
                                    }}>⮝</Like>
                                    <Like onClick={async e => {
                                        e.preventDefault()
                                        const reviewId = this.props.review.id
                                        const opinion = -1
                                        await vote({
                                            variables: { reviewId, opinion },
                                        })
                                    }}>⮟</Like>
                                </Likes>
                            </a>
                            <RevFooter><span style={{"color": "#D93732", "font-weight": "600"}}>{this.props.review.no_reviews}</span> {(this.props.review.no_reviews>=20 || this.props.review.no_reviews <= -20)? 'de' : null} {(this.props.review.no_reviews===1 || this.props.review.no_reviews===-1)? 'apreciere' : 'aprecieri'}</RevFooter>
                        </FootW>
                    </Rev>
                )
                }
            }
        </Mutation>
    )
  }
}

const VOTE_MUTATION = gql`
    mutation VoteMutation($reviewId: ID!, $opinion: Int!) {
        vote(reviewId: $reviewId, opinion: $opinion) {
            id
        }
    }
`

export default Review
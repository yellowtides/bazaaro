import React, {Component} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/styles.css'

import styled from 'styled-components'
import {Star} from './styles'

const Container = styled.div`
    z-index:5;
    font-family: Open Sans;
    position: fixed;
    float: left;
    margin-bottom: 3vw;
    text-align: center;
    left: 50%;
    top: 50vh;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 25vw;
    height: 32vw;
    border: 1px solid black;
    background-color: #EBEDF3;
`
const StarWrapper = styled.div`
  margin-top: 1.75vw;
  text-align: center;
  // unicode-bidi: bidi-override;
  // direction: rtl;
`
const Textbox = styled.textarea`
    font-family: Open Sans;
    outline: none;
    width: 20vw;
    font-size: 1vw;
    height: 12.5vw;
    margin: 0 auto;
    resize: none;
`
const Opinion = styled.div`
    font-size: 1.75vw;
    text-align: center;
    margin: 2vw 0;
`
const Numberinp = styled.input`
    font-family: Open Sans;
    font-size: 1.75vw;
    width: 2vw;
    height: 2vw;
    text-align: center;
    outline: none;
    overflow: hidden;
`
const Confirmbutton = styled.input`
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
class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            content: "",
            opinion: 5
        };
    }
    render() {
        return (
            <Mutation mutation={REVIEW_MUTATION}>
                {(comment, { data, loading, error }) => {
                    return(
                        <form
                            onSubmit={async e => {
                                e.preventDefault()
                                const { opinion, content } = this.state
                                const entryId = this.props.entryId
                                await comment({
                                    variables: { entryId, content, opinion },
                                })
                                window.location.reload()
                            }}
                        >
                            <Container>
                                <StarWrapper>
                                    {(this.state.opinion >= 1)? <Star>★</Star> : <Star>☆</Star>}
                                    {(this.state.opinion >= 2)? <Star>★</Star> : <Star>☆</Star>}
                                    {(this.state.opinion >= 3)? <Star>★</Star> : <Star>☆</Star>}
                                    {(this.state.opinion >= 4)? <Star>★</Star> : <Star>☆</Star>}
                                    {(this.state.opinion >= 5)? <Star>★</Star> : <Star>☆</Star>}
                                </StarWrapper>
                                <Opinion>
                                    <Numberinp min="0" max="5"
                                        onChange={e => this.setState({ opinion: e.target.value })}
                                        value={this.state.opinion}
                                        type="number"
                                        spellcheck="false"
                                    /> / 5
                                </Opinion>
                                <Textbox
                                    spellcheck="false"
                                    onChange={e => this.setState({ content: e.target.value })}
                                />
                                <Confirmbutton type="submit"
                                    disabled={!this.state.content || !this.state.opinion}
                                    value="Confirm"
                                />
                            </Container>
                        </form>
                    )
                }}
            </Mutation>  
        )
    }
}

const REVIEW_MUTATION = gql`
    mutation CommentMutation($entryId: ID!, $content: String!, $opinion: Float!) {
    comment(entryId: $entryId, content: $content, no_reviews: 0, opinion: $opinion) {
            id
        }
    }
`
export default AddReview
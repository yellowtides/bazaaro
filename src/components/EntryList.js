import React, {Component} from 'react'
import Entry from './Entry'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import '../styles/styles.css'
import { LoadingText, LoadingCircle } from './styles';

const Wrapper = styled.div`
    margin-top: 2vw;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
    align-content: center;
`
class EntryList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY} variables={{ filter: this.props.match.params.filter }}>
                {({ data, loading, error }) => {
                    if (loading) return (
                        <div>
                            <LoadingCircle/>
                            <LoadingText>B</LoadingText>
                        </div>
                    )
                    if (error) return <div> err.. </div>
                    return (
                        <Wrapper>
                            {data.feed.map(entry => (<Entry key={entry.id} entry={entry}/>))}
                        </Wrapper>
                    )
                }}
            </Query>
        )
    }
}

const FEED_QUERY = gql`
    query FeedQuery($filter: String) {
        feed(filter: $filter) {
            id
            title
            createdAt
            postedBy {
                name
            }
            produce
            rating
            no_reviews
            price_lei
            price_bani
            per
        }
    }
`
export default EntryList
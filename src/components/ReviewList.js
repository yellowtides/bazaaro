import React, {Component} from 'react'
import Review from './Review'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import '../styles/styles.css'
import { LoadingText, LoadingCircle } from './styles';

const Wrapper = styled.div``
class ReviewList extends Component {
    render() {
        return (
            <Query query={FIND_QUERY} variables={{ filter: this.props.match.params.entryId }}>
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
                            {(data.loadreviews)?
                                (data.loadreviews.map(review => (<Review key={review.id} review={review}/>)))
                            : null}
                        </Wrapper>
                    )
                }}
            </Query>
        )
    }
}

const FIND_QUERY = gql`
    query FindQuery($filter: String) {
        loadreviews(filter: $filter) {
            id
            createdAt
            content
            postedBy {
                id
                name
            }
            no_reviews
            opinion
        }
    }
`
export default ReviewList
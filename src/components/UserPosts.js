import React, {Component} from 'react'
import Entry from './Entry'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import '../styles/styles.css'
import { LoadingText, LoadingCircle } from './styles';

const Wrapper = styled.div`
    margin-top: 2vw;
    margin-left: 1vw;
    display: block;
`
class UserPosts extends Component {
    render() {
        return (
            <Query query={FIND_QUERY} variables={{ filter: this.props.match.params.userId }}>
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
                            {data.findentrybyuser.map(entry => (<Entry theme="profile" key={entry.id} entry={entry}/>))}
                        </Wrapper>
                    )
                }}
            </Query>
        )
    }
}

const FIND_QUERY = gql`
    query FindQuery($filter: String) {
        findentrybyuser(filter: $filter) {
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
export default UserPosts
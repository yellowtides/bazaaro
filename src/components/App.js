import React, {Component} from 'react'
import EntryList from './EntryList'
import ProductPage from './ProductPage'
import CreateEntryPage from './CreateEntryPage'
import ProfilePage from './ProfilePage'
import Header from './Header'
import {Switch, Route} from 'react-router-dom'
import Homepage from './Homepage'

import styled from 'styled-components'

const Wrapper = styled.div``;
const Content = styled.div``;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header/>
        <Content>
          <Switch>
            <Route path="/anunturi/postare/:entryId" component={ProductPage} />
            <Route path="/anunturi/filter/:filter" component={EntryList} />
            <Route exact path="/anunturi/creeaza" component={CreateEntryPage} />
            <Route path="/anunturi/" component={EntryList} />
            <Route path="/utilizatori/:userId" component={ProfilePage} />
            <Route exact path="/" component={Homepage} />
          </Switch>
        </Content>
      </Wrapper>
    )
  }
}

export default App
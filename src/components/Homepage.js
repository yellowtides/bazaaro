import React, {Component} from 'react'
import '../styles/styles.css'
import {Link, Redirect} from 'react-router-dom'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import styled from 'styled-components'
import {WhiteCircle, FrontText, Homeline, ActionPanel, Subtitle, Slideleftbutton, Sliderightbutton, Category, Searchbar} from './styles'


const Wrapper = styled.div`
    position: relative;
    z-index:-1;
    text-align: center;
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 1.75vw;
`
const CircleWrapper = styled.div`
    z-index: 1;
    width: 2.8vw;
    position: absolute;
    top: 3vw;
    left: 0; right: 0; margin: 0 auto;
`
const Searchicon = styled(Link)`
    position: absolute;
    -webkit-transform: rotate(45deg); 
    -moz-transform: rotate(45deg); 
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    height: 5vw;
    width: 5vw;
    background: none;
    border: none;
    outline: none;
    top: 16.8vw;
    left: 70.4vw;
    color: #2C3339;
    font-size: 4vw;
`
class Homepage extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            toggle: true,
            search: false
        };
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.arrFunction = this.arrFunction.bind(this)
    }
  
    handleClick() {
        this.setState({toggle: !this.state.toggle});
    }
    
    handleSubmit(e) {
        if (e.key === 'Enter') {
            this.setState({search: !this.state.search});
        }
    }

    arrFunction(event) {
        if (event.keyCode === 37 || event.keyCode === 39) {
            this.setState({toggle: !this.state.toggle});
        }
    }
    
    componentDidMount() {
        document.addEventListener("keydown", this.arrFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.arrFunction, false);
    }
    
    render() {
        if (this.state.search === true) {
          return <Redirect to={'/anunturi/filter/'+this.state.filter} />
        }
        return (
            <Wrapper>
                <CSSTransitionGroup transitionName="Slideshow" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                    {this.state.toggle? 
                        <ActionPanel>
                            <Subtitle>CĂUTARE</Subtitle>
                            <Searchbar type="text"
                                onChange={e => this.setState({ filter: e.target.value })}
                                value={this.state.filter}
                                onKeyPress={this.handleSubmit}
                            />
                            <Searchicon to={"./anunturi/filter/"+this.state.filter}>&#9906;</Searchicon>
                        </ActionPanel>
                    : null}
                </CSSTransitionGroup>
                <CSSTransitionGroup transitionName="Slideshow" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                    {this.state.toggle? 
                        null:
                        <ActionPanel>
                            <Subtitle>RĂSFOIRE</Subtitle>
                            <div>
                                <Category src="https://storage.googleapis.com/zopnow-static/images/products/320/fresh-apple-red-delicious-v-500-g.png"/>
                                <Category src="https://www.gurvam.com.br/media/catalog/product/b/a/batata_branca_1.png"/>
                            </div>
                        </ActionPanel>
                    }
                </CSSTransitionGroup>
                <Slideleftbutton onClick={this.handleClick}> &#10094; </Slideleftbutton>
                <Sliderightbutton onClick={this.handleClick}> &#10095; </Sliderightbutton>
                <CircleWrapper>
                    <WhiteCircle onClick={!this.state.toggle? this.handleClick : null} style={
                        this.state.toggle? {
                            'float': 'left',
                            'background-color': '#2C3339',
                            'border': '0.2vw solid #EBEDF3'
                        }
                        : {
                            'float': 'left',
                            'border': '0.2vw solid transparent'
                        } 
                    }></WhiteCircle>
                    <WhiteCircle  onClick={this.state.toggle? this.handleClick : null} style={
                        this.state.toggle? {
                            'float': 'right',
                            'border': '0.2vw solid transparent'
                        }
                        : {
                            'float': 'right',
                            'background-color': '#2C3339',
                            'border': '0.2vw solid #EBEDF3'
                        } 
                    }></WhiteCircle>
                </CircleWrapper>
                <FrontText>Cu ce vă putem ajuta astăzi?</FrontText>
                <Homeline/>
            </Wrapper>
        ) 
    }
}

export default Homepage
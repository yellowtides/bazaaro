import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.div`
  position: absolute;
  dispaly: inline-block;
  color: #EBEDF3;
  font-size: 4vw;
  font-family: 'Galada', cursive;
  left: 78vw;
  margin-right: 7vw;
  padding: 0.3em 0.35em;
  padding-top: 0.2em;
  height: 1.3em;
  background-color: #2C3339;
  border-radius: 0.5vw;
`

const Nav = styled.ul`
  margin: 0;
  padding: 0;
  float: left;
  list-style-type: none;
`

const PanelLog = styled.div`
  margin-left: -3.7vw;
  background-color: #2C3339;
  position: absolute;
  text-align: left;
  padding-left: 1vw;
  width: 15vw;
  height: 11.2vw;
  color: #EBEDF3;
  top: 5.7vw;
  z-index:99;
`

const PanelSign = styled.div`
  margin-left: -3.7vw;
  background-color: #2C3339;
  position: absolute;
  text-align: left;
  padding-left: 1vw;
  width: 15vw;
  height: 17.5vw;
  color: #EBEDF3;
  top: 5.7vw;
  z-index:99;
`

const Categ = styled.li`
  margin: 0;
  font-family: 'Open Sans';
  font-size: 1vw;
  font-weight: 600;
  display: inline-block;
  padding-left: 5vw;
  padding-right: 2vw;
  text-align: center;
  margin-top: 2.1vw;
`

const Text = styled.li`
  color: #EBEDF3;
  :hover {
    color: #D93732;
  }
`

const RedText = styled.li`
  color :#E94347;
  :hover {
    color: #D93732;
  }
`

const Input = styled.input`
  display: block;
  width: 13.5vw;
  margin: 0 auto;
  height: 1vw;
  margin-top: 0.3vw;
  font-family: 'Open Sans';
  outline: 0;
`

const Button = styled.div`
  color: #EBEDF3;
  font-size: 1vw;
  text-align: center;
  padding-top: 0.6vw;
  width: 6vw;
  margin: 1vw auto;
  height: 2vw;
  font-family: 'Open Sans';
  background-color: #2C3339;
  border: 1px solid #EBEDF3;
  border-radius: 4px;
  :hover {    
    // color: #2C3339;
    // border-color: #2C3339;
    background-color: #29384C;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

const FrontText = styled.div`
  font-family: quicksand;
  font-size: 5vw;
  font-weight: 400;
  color: #EBEDF3;
  position: absolute;
  left: 0; right: 0; margin: 0 auto;
  top: 31.2vw;
` 

const Homeline = styled.div`
  position: absolute;
  background-color: #EBEDF3;
  width: 70vw;
  font-weight: 500;
  height: 0.1vw;
  top: 31.2vw;
  left: 0; right: 0; margin: 0 auto;
`

const ActionPanel = styled.div`
  position: absolute;
  background-color: #29384C;
  color: #EBEDF3;
  width: 100vw;
  height: 40vw;
`

const Subtitle = styled.div`
  margin-top: 6vw;
`
const Slideleftbutton = styled.button`
  outline: none;
  top: 14vw;
  color: #EBEDF3;
  background: none;
  border: none;
  font-family: quicksand;
  font-size: 7vw;
  position: absolute;
  left: 2vw;
`
const Sliderightbutton = styled.button`
  outline: none;
  top: 14vw;
  color: #EBEDF3;
  background: none;
  border: none;
  font-family: quicksand;
  font-size: 7vw;
  position: absolute;
  right: 2.2vw;
`

const Category = styled.img`
  width: 18vw;
  margin: 2vw 8vw 0;
`
const Searchbar = styled.input`
  color: #2C3339;
  font-family: 'Open Sans';
  margin-top: 9.3vw;
  width: 50vw;
  height: 3vw;
  text-align: center;
  font-size: 1.86vw;
  outline: none;
`
const WhiteCircle = styled.div`
  border-radius: 50%;
  width: 0.6vw;
  height: 0.6vw;
  background-color: #EBEDF3;
`
const CardTitle = styled.div`
  font-weight: 600;
  text-align: center;
  padding: 0.75vw 0;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`
const Preview = styled.img`
  width: 12vw;
  height: 12vw;
  float: left;
  // -webkit-mask-image: -webkit-gradient(linear, left top, right top, from(#29384C), to(rgba(0,0,0,0)))
  }
`
const CardDate = styled.div`
  text-align: right;
  margin-right: 1.5vw;
  font-size: 0.75vw;
  margin-top: 0.225vw;
`
const RatingText = styled.div`
  display: inline-block;
  margin-left: 1.5vw;
`
const CardName = styled.div`
  margin-top: 1.5vw;
  text-align: center;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`
const Star = styled.div`
  display: inline-block;
  font-size: 2.5vw;
  color: #D93732;
  // :hover:before, :hover ~ div:before {
  //   content: "★";
  //   position: absolute;
  //   color: #E94347;
  // }
`
const Rating = styled.div`
  text-align: center;
  font-size: 1vw;
  margin-top: 0.12vw;
`
const CardRedText = styled.div`
  display: inline;
  color: #E94347;
`
const Descr = styled.div`
  padding-left: 1.5vw;
  text-align: justify;
  font-size: 0.9vw;
  font-weight: 400;
  margin-top: 0.9vw;
  margin-right: 1.5vw;
`
const RevFooter = styled.div`
  margin-top: 7.5vw;
  margin-bottom: 1.5vw;
  display: inline-block;
  padding-left: 0.8vw;
  font-size: 0.8vw;
`
const Like = styled.span`
  font-size: 1.25vw;
  margin-bottom: -0.6vw;
  display: block;
`
const LoadingText = styled.div`
  font-size: 7.5vw;
  width: 5vw;
  height: 10vw;
  color: #2C3339;
  font-family: 'Galada', cursive;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const LoadingCircle = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5vw 0 0 -5vw; 
  background-color: #EBEDF3;
  display: inline-block;
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
  border: 0.6vw solid;
  border-color: transparent transparent transparent #29384C;
  animation: linear loading 1.5s infinite;
`
const Stars = styled.div`
  top: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  color: #EBEDF3;
`
const Skeleton = styled.div`
  top: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;    
  z-index: 0;
  color: #D93732;
`
export {RedText, Text, Categ, PanelLog, PanelSign, StyledLink, Nav, Title, Input, Button, FrontText, Homeline, Subtitle, ActionPanel, 
Slideleftbutton, Sliderightbutton, Category, Searchbar, WhiteCircle, CardTitle, Preview, CardDate, RatingText, CardName, 
Star, Rating, CardRedText, Descr, RevFooter, Like, LoadingCircle, LoadingText, Stars, Skeleton}
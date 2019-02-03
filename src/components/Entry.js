import React, {Component} from 'react'

import styled from 'styled-components'
import '../styles/styles.css'

import {timeDifferenceForDate} from '../utils'

import {CardTitle, Preview, CardDate, CardName, Rating, CardRedText, Stars, Skeleton} from './styles'

const Card = styled.div`
  position: relative;
  border: 2px solid #29384C; 
  font-size: 1.125vw;
  width: 30vw;
  background-color: #29384C;
  color: #EBEDF3;
  height: 12vw;
  font-family: open sans;
  margin: 0.75vw 0;
  display: inline-block;
`
const StarWrapper = styled.div`
  unicode-bidi: bidi-override;
  font-size: 2vw;
  width: 8.35vw;
  height: 2.2vw;
  overflow: hidden;
  position: relative;
  margin: 0 auto 0.6vw;
  top: 0;
`
const Data = styled.div`
  float: right;
  width: 23vw;
`
const PriceTab = styled.div`
  position: absolute;
  margin-top: 1.4vw;
  min-width: 5vw;
  height: 10vw;
  color: #EBEDF3;
  font-family: Open Sans;
  text-align: center;
  font-weight: 600;
  font-size: 3.5vw;
  background-color: #2C3339;
  display: inline-block;
  padding: 0 1vw;
`
const CURR = styled.div`
  margin-right: 0.2vw;
  display: inline-block;
`
const CHANGE = styled.sup`
  display: inline-block;
  font-size: 1vw;
`
const PER = styled.div`
  font-size: 3vw;
`
const Line = styled.div`
    background-color: #EBEDF3;
    width: 60%;
    font-weight: 500;
    height: 0.08vw;
    margin: 0.25vw auto;
`
const Overlay = styled.div`
  position: absolute;
  left: 0;
  width: 12vw;
  height: 12vw;
  float: left;
  background: linear-gradient(to right, transparent, transparent, #29384C)
`
class Entry extends Component {
  render() {
    return (
      <div style={{"display": "inline-block"}}>
        {this.props.preview &&
            <div>
              <Card>
                <Preview src="https://vignette.wikia.nocookie.net/trollpasta/images/f/f3/HUANIU_APPLE01.jpg/revision/latest/scale-to-width-down/1000?cb=20140709150125"/>
                <Overlay/>
                <CardTitle style={{"padding-left":"1vw", "padding-right":"1vw"}}>{this.props.entry.title}</CardTitle>
                <CardDate>{timeDifferenceForDate(this.props.entry.createdAt)}</CardDate>
                <CardName style={{"padding-left":"1vw", "padding-right":"1vw"}}>{this.props.entry.postedBy.name}</CardName>
                <StarWrapper>
                  <Stars style={{"width": (this.props.entry.no_reviews? (this.props.entry.rating*20) : '0')+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></Stars>
                  <Skeleton><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></Skeleton>
                </StarWrapper>
                <Rating>(<CardRedText>{this.props.entry.rating.toFixed(2)}</CardRedText> / <CardRedText>5 </CardRedText>din<CardRedText> {this.props.entry.no_reviews} </CardRedText> {(this.props.entry.no_reviews>=20)? 'de' : null} {(this.props.entry.no_reviews===1)? 'recenzie' : 'recenzii'})</Rating>
              </Card>
              <PriceTab>
                <CURR>{this.props.entry.price_lei}</CURR>
                <CHANGE>{this.props.entry.price_bani <= 9 && '0'}{this.props.entry.price_bani}</CHANGE>
                <Line/>
                <PER>{this.props.entry.per}</PER>
              </PriceTab>
            </div>
        }
        <a href={`/anunturi/postare/${this.props.entry.id}`}>
          {this.props.theme &&
            <div>
              <Card style={{"width":"52vw", "margin-bottom":"1vw"}}>
                <Overlay/>
                <Preview src="https://vignette.wikia.nocookie.net/trollpasta/images/f/f3/HUANIU_APPLE01.jpg/revision/latest/scale-to-width-down/1000?cb=20140709150125"/>
                <Data>
                  <CardTitle style={{"padding-left":"1vw", "padding-right":"1vw"}}>{this.props.entry.title}</CardTitle>
                  <CardDate style={{"padding-left":"1vw", "padding-right":"1vw"}}>{timeDifferenceForDate(this.props.entry.createdAt)}</CardDate>
                  <CardName>{this.props.entry.postedBy.name}</CardName>
                  <StarWrapper>
                    <Stars style={{"width": (this.props.entry.no_reviews? (this.props.entry.rating*20) : '0')+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></Stars>
                    <Skeleton><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></Skeleton>
                  </StarWrapper>
                  <Rating>(<CardRedText>{this.props.entry.rating.toFixed(2)}</CardRedText> / <CardRedText>5 </CardRedText>din<CardRedText> {this.props.entry.no_reviews} </CardRedText> recenzii)</Rating>
                </Data>
              </Card>
              <PriceTab> 
                <CURR>{this.props.entry.price_lei}</CURR>
                <CHANGE>{this.props.entry.price_bani <= 9 && '0'}{this.props.entry.price_bani}</CHANGE>
                <Line/>
                <PER>{this.props.entry.per}</PER>
              </PriceTab>
            </div>
          }
          {!this.props.theme && !this.props.preview &&
            <div>
              <Card>
                <Preview src="https://vignette.wikia.nocookie.net/trollpasta/images/f/f3/HUANIU_APPLE01.jpg/revision/latest/scale-to-width-down/1000?cb=20140709150125"/>
                <Overlay/>
                <CardTitle style={{"padding-left":"1vw", "padding-right":"1vw"}}>{this.props.entry.title}</CardTitle>
                <CardDate>{timeDifferenceForDate(this.props.entry.createdAt)}</CardDate>
                <CardName style={{"padding-left":"1vw", "padding-right":"1vw"}}>{this.props.entry.postedBy.name}</CardName>
                <StarWrapper>
                  <Stars style={{"width": (this.props.entry.no_reviews? (this.props.entry.rating*20) : '0')+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></Stars>
                  <Skeleton><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></Skeleton>
                </StarWrapper>
                <Rating>(<CardRedText>{this.props.entry.rating.toFixed(2)}</CardRedText> / <CardRedText>5 </CardRedText>din<CardRedText> {this.props.entry.no_reviews} </CardRedText> {(this.props.entry.no_reviews>=20)? 'de' : null} {(this.props.entry.no_reviews===1)? 'recenzie' : 'recenzii'})</Rating>
              </Card>
              <PriceTab>
                <CURR>{this.props.entry.price_lei}</CURR>
                <CHANGE>{this.props.entry.price_bani <= 9 && '0'}{this.props.entry.price_bani}</CHANGE>
                <Line/>
                <PER>{this.props.entry.per}</PER>
              </PriceTab>
            </div>
          }
        </a>
      </div>
    )
  }
}

export default Entry
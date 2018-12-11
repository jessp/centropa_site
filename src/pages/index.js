import React from 'react'
import { graphql} from "gatsby"

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal'


import 'leaflet/dist/leaflet.css'
import '../layouts/main.css'
import '../css/index.css'

import LogoAnimation from "./../components/LogoAnimation"
import Header from '../components/Header'
import Footer from '../components/Footer'
import {MapIcon} from '../components/MapIcon'


class IndexPage extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      "animationCompleted": false,
      "contributorIndex": 0,
      "lat": 59.909272,
      "lng": 10.753171,
      "zoom": 14,
    }

    this.completeAnimation = this.completeAnimation.bind(this);

  }

  componentWillUnmount(){
    this.setState({animationCompleted: true});
  }

  completeAnimation(){
    this.setState({animationCompleted: true});
  }

  render() {   
   const position = [this.state.lat, this.state.lng]

    return(
      <div style={{"width":"100%", "height":"100%", "position":"relative", "overflow": "hidden"}}>
        <div className={"mondrianHolder " + (this.state.animationCompleted ? "afterIntroTransformed" : "")} ref={el => this.scene = el}>
          <div className={"left1"} style={{"backgroundColor": "#DA852D"}}/>
          <div className={"left2"} style={{"backgroundColor": "#A4384D"}}>
            <svg viewBox="0 0 310 300" style={{"width": "100%", "height": "100%"}}>
              <text y={"45"} fontSize={"40"} fontWeight={"bold"}>{"Hours"}</text>

              <text y={"105"} fontSize={"35"} fontWeight={"bold"}>{"Monday - Friday"}</text>
              <text y={"145"} fontSize={"30"}>{"9 - 22"}</text>
              <text y={"195"} fontSize={"35"} fontWeight={"bold"}>{"Saturday - Sunday"}</text>
              <text y={"235"} fontSize={"30"}>{"12 - 22"}</text>
            </svg>
          </div>
          <div className={"left3"} style={{"backgroundColor": "#2A8FA3"}}/>
          <div className={"left4"} style={{"backgroundImage": "url(" + this.props.data.about.acf.photo_4.source_url + ")"}}/>
          <div className={"left5"} style={{"backgroundImage": "url(" + this.props.data.about.acf.photo_3.source_url + ")"}}/>
          <div className={"left6"}>
              <Map center={position} zoom={this.state.zoom} style={{"width": "14.5vw", "height": "14.5vw"}}>
                {() => {
                  return (
                    <div>
                      <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
                      />
                      <Marker position={position} icon={MapIcon}/>
                    </div>
                  );
                }}
              </Map>
          </div>
          <div className={"left7"} style={{"backgroundColor": "#EFC835"}}/>

          <div className={"right1"} style={{"backgroundColor": "#2A8FA3"}}/>
          <div className={"right2"} style={{"backgroundImage": "url(" + this.props.data.about.acf.photo_2.source_url + ")"}}/>
          <div className={"right3"} style={{"backgroundImage": "url(" + this.props.data.about.acf.photo_1.source_url + ")"}}/>
          <div className={"right4"} style={{"backgroundImage": "url(" + this.props.data.about.acf.photo_5.source_url + ")"}}/>
          <div className={"right5"} style={{"backgroundColor": "#EFC835"}}/>
          <div className={"right6"} style={{"backgroundColor": "#DA852D"}}/>
          <div className={"right7"} style={{"backgroundColor": "#2A8FA3"}}/>
        </div>
        <div className={"svgGroup"}>
          <div className={"logoHolder"}>
            <LogoAnimation completeAnimation={this.completeAnimation}/>
            <div className={"underlineLink"}>
              <p>{this.props.data.about.acf.homepage_text}</p>
              <p className={"hideExceptMobile"}>{"Monday - Friday: 9 - 22"}</p>
              <p className={"hideExceptMobile"}>{"Saturday - Sunday: 12 - 22"}</p>
              <p>
                <a href={"/"}>
                  <span>{"Book a table now"}</span>
                </a>
              </p>
            </div>
          </div>
        </div>
        <Header page={"Home"}/>
        <Footer/>
      </div>
  )
  }

}

export default IndexPage


export const featuredQuery = graphql`
  query {
        about:  wordpressPage(title: {eq: "Home"}) {
         acf {
          homepage_text
          photo_1 {
          source_url
        }
          photo_2{
          source_url
        }
          photo_3{
          source_url
        }
          photo_4{
          source_url
        }
          photo_5{
          source_url
        }
        }
  }
}
`


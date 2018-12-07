import React from 'react'
import { graphql} from "gatsby"
import LogoAnimation from "./../components/LogoAnimation"
import Header from '../components/header'
import Footer from '../components/Footer'
import '../css/index.css'
import {shuffle} from '../utils/helpers.js';


class IndexPage extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      "animationCompleted": false,
      "colours": shuffle(["#da852d", "#a4384d", "#2a8fa3", "#efc835", "#fff", "#da852d", "#a4384d", "#2a8fa3", "#efc835", "#fff"]),
      "contributorIndex": 0
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
          <div className={"left4"} style={{"backgroundColor": "#A4384D"}}/>
          <div className={"left5"} style={{"backgroundImage": "url(" + this.props.data.about.acf.photo_4.source_url + ")"}}/>
          <div className={"left6"} style={{"backgroundImage": "url(" + this.props.data.about.acf.photo_3.source_url + ")"}}/>
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
                <a href={"#"}>
                  <span>{"Book a table now"}</span>
                </a>
              </p>
            </div>
          </div>
        </div>
        <Header/>
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


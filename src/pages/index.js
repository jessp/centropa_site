import React from 'react'
import { graphql, Link } from "gatsby"
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

  completeAnimation(){
    this.setState({animationCompleted: true});
  }


  render() {   
    console.log(this.props.data.about.acf.photo_1.source_url); 
    return(
      <div style={{"width":"100%", "height":"100%", "position":"relative", "overflow": "hidden"}}>
        <div className={"mondrianHolder " + (this.state.animationCompleted ? "afterIntroTransformed" : "")}>
          <div className={"left1"} style={{"backgroundColor": "#DA852D"}}/>
          <div className={"left2"} style={{"backgroundColor": "#A4384D"}}/>
          <div className={"left3"} style={{"backgroundColor": "#2A8FA3"}}/>
          <div className={"left4"} style={{"backgroundColor": "#000"}}/>
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


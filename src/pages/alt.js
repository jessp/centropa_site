import React from 'react'
import { graphql, Link } from "gatsby"
import LogoAnimation from "./../components/LogoAnimation"
import Header from '../components/header'
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
  	return(
  	  <div style={{"width":"100%", "height":"100%", "position":"relative"}}>
        <div className={"mondrianHolder " + (this.state.animationCompleted ? "afterIntroTransformed" : "")}>
          <div className={"left1"} style={{"backgroundColor": "#DA852D"}}/>
          <div className={"left2"} style={{"backgroundColor": "#A4384D"}}/>
          <div className={"left3"} style={{"backgroundColor": "#2A8FA3"}}/>
          <div className={"left4"} style={{"backgroundColor": "#000"}}/>
          <div className={"left5"} style={{"backgroundColor": "#ccc"}}/>
          <div className={"left6"} style={{"backgroundColor": "#aaa"}}/>
          <div className={"left7"} style={{"backgroundColor": "#EFC835"}}/>

          <div className={"right1"} style={{"backgroundColor": "#2A8FA3"}}/>
          <div className={"right2"} style={{"backgroundColor": "#aaa"}}/>
          <div className={"right3"} style={{"backgroundColor": "#ccc"}}/>
          <div className={"right4"} style={{"backgroundColor": "#000"}}/>
          <div className={"right5"} style={{"backgroundColor": "#EFC835"}}/>
          <div className={"right6"} style={{"backgroundColor": "#DA852D"}}/>
          <div className={"right7"} style={{"backgroundColor": "#2A8FA3"}}/>
        </div>
        <div className={"svgGroup"}>
          <div className={"logoHolder"}>
            <LogoAnimation completeAnimation={this.completeAnimation}/>
          </div>
        </div>
        <Header/>
  	  </div>
	)
  }

}

export default IndexPage


export const featuredQuery = graphql`
  query {
        food:  allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "sandwiches"}
                }
              }
          }) {
          edges {
            node {
              title
              acf{
                food_photo {
                  source_url
                }
              }
            }
          }
        }
        allContributors: allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "contributor"}
                }
              }
          } sort: { fields: [date], order: ASC }) {
          edges {
            node {
              slug
              acf{
                country_name
                author_name
                sandwich_name
                author_photo {
                  source_url
                }
                location_photo {
                  source_url
                }
              }
            }
          }
        }
      }
`


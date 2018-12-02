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
    this.rendergrid = this.rendergrid.bind(this);

  }

  completeAnimation(){
    this.setState({animationCompleted: true});
  }

  rendergrid(authorPackage){
    let colours = this.state.colours;
    return (
      <div className={"grid1 monGrid"}>
        {Array.apply(null, Array(10)).map(function (_, i) {return i;}).map(function(d, i){
          let whichBg = "none";
          let colourBg = colours[d];
          if (d === 2){
            whichBg = "url(" + authorPackage.location_photo + ")";
            colourBg = "none"
          } else if (d === 3){
            whichBg = "url(" + authorPackage.food_photo + ")";
            colourBg = "none"
          } else if (d === 7){
            whichBg = "url(" + authorPackage.author_photo + ")";
            colourBg = "none"
          }
          let textColour = "#000";
          if (colours[d] === "#da852d" || colours[d] === "#a4384d" || colours[d] === "#2a8fa3"){
            textColour = "#fff";
          }
          return (
            <div key = {i} style={{"backgroundColor": colourBg, "gridArea": ("grid" + d), 
                "backgroundImage": whichBg}}>
              {
                d === 6 && 
                <div className={"gridText"} style={{"color": textColour}}>
                  <p>{authorPackage.sandwich}</p>
                  <p>{"inspired by"}</p>
                  <p>{authorPackage.author}</p>
                  <p>{"inspired by"}</p>
                  <p>{authorPackage.country}</p>
                </div>
              }
            </div>
            )
        })}
        </div>
    )
  }


  render() {
    let slideNode = this.props.data.allContributors.edges[this.state.contributorIndex].node;
    let slideObject = {};
    slideObject["author"] = slideNode.acf.author_name;
    slideObject["sandwich"] = slideNode.acf.sandwich_name;
    slideObject["country"] = slideNode.acf.country_name;
    slideObject["author_photo"] = slideNode.acf.author_photo.source_url;
    slideObject["location_photo"] = slideNode.acf.location_photo.source_url;
    let sandwichPhoto = this.props.data.food.edges.find(function(sandwich){
      return sandwich.node.title === slideObject["sandwich"];
    }).node.acf;
    slideObject["food_photo"] = sandwichPhoto.food_photo ? sandwichPhoto.food_photo.source_url : "http://placekitten.com/600/600";
    
  	return(
  	  <div style={{"width":"100%", "height":"100%", "position":"relative"}}>
        <div className={"svgGroup " + (this.state.animationCompleted ? "afterIntroTransformed" : "")}>
          <LogoAnimation completeAnimation={this.completeAnimation}/>
        </div>
        <div className={"mondrianHolder " + (this.state.animationCompleted ? "afterIntroTransformed" : "")}>
          {this.rendergrid(slideObject)}
        </div>
        <div className={"clearer"}/>
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


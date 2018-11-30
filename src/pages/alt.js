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
      "colours": shuffle(["#da852d", "#a4384d", "#2a8fa3", "#efc835", "#fff", "#da852d", "#a4384d", "#2a8fa3", "#efc835", "#fff"])
    }

    this.completeAnimation = this.completeAnimation.bind(this);
    this.rendergrid = this.rendergrid.bind(this);

  }

  completeAnimation(){
    this.setState({animationCompleted: true});
  }

  rendergrid(){
    let colours = this.state.colours;
    return (
      <div className={"grid1 monGrid"}>
        {Array.apply(null, Array(10)).map(function (_, i) {return i;}).map(function(d, i){
          let whichBg = "none";
          if (d === 2){
            whichBg = "url(http://placekitten.com/600/600)";
          } else if (d === 3){
            whichBg = "url(http://placekitten.com/400/400)";
          } else if (d === 7){
            whichBg = "url(http://placekitten.com/500/500)";
          }
          let textColour = "#000";
          if (colours[d] === "#da852d" || colours[d] === "#a4384d" || colours[d] === "#2a8fa3"){
            textColour = "#fff";
          }
          return (
            <div key = {i} style={{"backgroundColor": colours[d], "gridArea": ("grid" + d), 
                "backgroundImage": whichBg}}>
              {
                d === 6 && 
                <div className={"gridText"} style={{"color": textColour}}>
                  <p>{"Ham on Rye"}</p>
                  <p>{"inspired by"}</p>
                  <p>{"Ola Nordman"}</p>
                  <p>{"inspired by"}</p>
                  <p>{"Paris"}</p>
                </div>
              }
            </div>
            )
        })}
        </div>
    )
  }


  render() {
  	return(
  	  <div style={{"width":"100%", "height":"100%", "position":"relative"}}>
        <div className={"svgGroup afterIntroTransformed " + (this.state.animationCompleted ? "afterIntroTransformed" : "")}>
          <LogoAnimation completeAnimation={this.completeAnimation}/>
        </div>
        <div className={"mondrianHolder afterIntroTransformed " + (this.state.animationCompleted ? "afterIntroTransformed" : "")}>
          {this.rendergrid()}
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
          author: wordpressPost(
            tags:
              {elemMatch: 
                {name:
                  {eq: "limited feature"}
                }
              },
            categories:
              {elemMatch: 
                {name:
                  {eq: "contributor"}
                }
              }
            ) {
          title
          slug
          acf {
            author_name
            author_pronoun
            country_name
            author_photo {
              source_url
            }
          }
    }
     sandwich: wordpressPost(
          tags: {
            elemMatch:
            {name:
              {eq: "limited feature"}
            }
          },
            categories:
              {elemMatch: 
                {name:
                  {eq: "menu"}
                }
            
          }
        )
    {
      title
      acf {
        description
      }
    }
        
  }

  
`


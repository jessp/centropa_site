import React from 'react'
import { graphql, Link } from "gatsby"
import Vivus from 'vivus';
import logo from "../images/logo-11.svg"
import Header from '../components/header'
import { IoIosPin } from 'react-icons/io'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import Slide from '../components/slide'

import sandwich_sketch from '../images/home_page/sandwich_sketch.svg';
import sandwich_photo from '../images/home_page/sandwich_photo.jpg';

import bjor_sketch from '../images/home_page/bjor_sketch.svg';
import bjor_photo from '../images/home_page/bjor_photo.png';

import eating_sketch from '../images/home_page/eating_sketch.svg';
import eating_photo from '../images/home_page/eating_photo.jpg';

import globe_img from '../images/home_page/globe_img.svg';
import text_img from '../images/home_page/text_img.svg';

import scroll_down from '../images/scroll_down.svg';


import '../css/index.css'


class IndexPage extends React.Component {

  componentDidMount() {
    new Vivus('scroll_down', {duration: 100, file: scroll_down});
    new Vivus('globe_img', {duration: 100, file: globe_img});
  }


  render() {
  	const featuredData = this.props.data.author;
    const description = this.props.data.sandwich.acf.description.toLowerCase();
  	return(
  	  <div style={{"width":"100%", "height":"100%", "position":"relative"}}>
        <div className = {"indexBg"}/>
        <div className={"container"}>
           <div className={"info_holder"}>
              <div className={"logo_holder"} style={{"height":"140px"}}>
                <div id={"globe_img"}/>
                <img src={text_img} className={"text_img"}/>
                <div className={"clearer"}/>
              </div>
              <p>A quick, succint summary of Centropa's charms, likely ending by saying that it's in the Bjorvika Deichman branch.</p>
           </div>
    	     <div className={"image_clip"} 
            style={{"backgroundImage" : "url('" + featuredData.acf.author_photo.source_url + "')"}}>
           </div>
           <div className={"authorInfoHolder"}>
              <p>{featuredData.acf.author_name + " is this month's featured author."}</p>
              <p>
                <span>{"Check out " + featuredData.acf.author_pronoun + " work “"}</span>
                <Link to={featuredData.slug}><span>{featuredData.title}</span></Link>
                <span>{",” commissioned as part of the 12x project, or order our "}</span>
                <Link to={"/menu"}><span>{description}</span></Link>
                <span>{" smørbrød inspired by " + featuredData.acf.author_pronoun + " musings on "}</span>
                <span>{featuredData.acf.country_name}</span>
                <span>{"."}</span>
              </p>
            </div>

        </div>

          
           <Slide
            id={"sandwich-svg"}
            photoSrc={sandwich_photo}
            header={"Simple ingredients, expertly prepared"}
            sketch={sandwich_sketch}
            body={"Centrally located in the great new city centre. " +
                  "More text and text, this is text, more text. " +
                  "This is a lot of text, don't worry about reading it. " + 
                  "This is some more text, but maybe it will be the same amount of text, who knows."}/>
          <Slide
            id={"bjor-svg"}
            photoSrc={bjor_photo}
            header={"In the heart of Bjørvika"}
            sketch={bjor_sketch}
            body={"We focus on sourcing the freshest ingredients." +
                  "More text and text, this is text, more text. " +
                  "This is a lot of text, don't worry about reading it. " + 
                  "This is some more text, but maybe it will be the same amount of text, who knows."}/>
         <Slide
            id={"eating-svg"}
            photoSrc={eating_photo}
            header={"Inspired by Literature"}
            sketch={eating_sketch}
            body={"We focus on sourcing the freshest ingredients." +
                  "More text and text, this is text, more text. " +
                  "This is a lot of text, don't worry about reading it. " + 
                  "This is some more text, but maybe it will be the same amount of text, who knows."}/>
          <div style={{"position": "absolute", "bottom":"10px", "textAlign": "center", "zIndex": 3, "width": "100%"}}>
            <div id="scroll_down" style={{"width": "50px", "margin": "0 auto"}}/>
          </div>
          <div className={"bgOverlay"}/>
          <div className={"footerHolder"}>
            <p>
              <IoIosPin/>
              {"Find us at Dronning Eufemias gate 4, 0154 Oslo."}
            </p>
            <p style={{"fontSize": "1.5em"}}>
              <FaInstagram style={{"marginRight": "3px"}}/>
              <FaFacebook/>
            </p>
          </div>
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


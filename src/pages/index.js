import React from 'react'
import { graphql, Link } from "gatsby"
import logo from "../images/logo-11.svg"
import Header from '../components/header'
import { IoIosPin } from 'react-icons/io'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import Slide from '../components/slide'
import sandwich_sketch from '../images/home_page/sandwich_sketch.svg';
import sandwich_photo from '../images/home_page/sandwich_photo.jpg';





import '../css/index.css'


class IndexPage extends React.Component {

  render() {
  	const featuredData = this.props.data.author;
    const description = this.props.data.sandwich.acf.description.toLowerCase();
  	return(
  	  <div style={{"width":"100%", "height":"100%", "position":"relative"}}>
        <div className = {"indexBg"}/>
        <div className={"container"}>
           <div className={"info_holder"}>
              <img className={"centropaLogo"} src={logo}/>
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
        </div>
          <Slide
            id={"sandwich-svg"}
            photoSrc={sandwich_photo}
            header={"Simple ingredients, expertly prepared"}
            body={"Centrally located in the great new city centre. " +
                  "More text and text, this is text, more text. " +
                  "This is a lot of text, don't worry about reading it. " + 
                  "This is some more text, but maybe it will be the same amount of text, who knows."}>
            <object id="sandwich-svg" className={"slideSketch"} type="image/svg+xml" data={sandwich_sketch}></object>
          </Slide>
          <Slide
            imgSrc={"http://placekitten.com/400/400"}
            header={"In the heart of Bjørvika"}
            body={"We focus on sourcing the freshest ingredients." +
                  "More text and text, this is text, more text. " +
                  "This is a lot of text, don't worry about reading it. " + 
                  "This is some more text, but maybe it will be the same amount of text, who knows."}/>
          <Slide
            imgSrc={"http://placekitten.com/350/350"}
            header={"The 12x Project"}
            body={"A rotating menu inspired by flavours from arount the world." +
                  "More text and text, this is text, more text. " +
                  "This is a lot of text, don't worry about reading it. " + 
                  "This is some more text, but maybe it will be the same amount of text, who knows."}/>
          <div className={"bgOverlay"}/>
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


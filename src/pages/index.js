import React from 'react'
import { graphql, Link } from "gatsby"
import logo from "../images/logo-11.svg"
import Header from '../components/header'
import { IoIosPin } from 'react-icons/io'
import { FaInstagram, FaFacebook } from 'react-icons/fa'



import '../css/index.css'


class IndexPage extends React.Component {

  render() {
  	const featuredData = this.props.data.author;
    const description = this.props.data.sandwich.acf.description.toLowerCase();
    console.log(featuredData);
  	return(
	  <div>
      <div className={"container"}>
         <div className={"info_holder"}>
            <img className={"centropaLogo"} src={logo}/>
            <h2>{"Welcome home!"}</h2>
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


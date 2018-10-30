import React from 'react'
import { graphql } from "gatsby"
import ButtonLink from '../components/ButtonLink'

import '../css/index.css'


class IndexPage extends React.Component {

  render() {
  	const featuredData = this.props.data.wordpressPost;
    console.log(featuredData);
  	return(
	  <div>
      <div className={"container"}>
         <div className={"info_holder"}>
            <h1>Centropa</h1>
            <p>A quick, succint summary of Centropa's charms, likely ending by saying that it's in the Bjorvika Deichman branch.</p>
            <ButtonLink to={"/page"} text={"About"}/> 
            <ButtonLink to={"/menu"} text={"Menu"}/> 
            <ButtonLink to={"/12x"} text={"12x Project"}/> 
         </div>
  	     <div 
            className={"image_clip"}
            style={
              {"backgroundImage": "url(" + featuredData.acf.author_photo.source_url + ")"}
            }>
         </div>
      </div>
	  </div>
	)
  }

}

export default IndexPage


export const featuredQuery = graphql`
  query {
          wordpressPost(
            tags:
              {elemMatch: 
                {name:
                  {eq: "limited feature"}
                }
              }
            ) {
          content
          acf {
            author_name
            country_name
            author_photo {
              source_url
            }
          }
        }
      }
`

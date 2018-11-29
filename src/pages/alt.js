import React from 'react'
import { graphql, Link } from "gatsby"
import LogoAnimation from "./../components/LogoAnimation"
import Header from '../components/header'
import '../css/index.css'


class IndexPage extends React.Component {


  render() {
  	return(
  	  <div style={{"width":"100%", "height":"100%", "position":"relative"}}>
        <div className={"svgGroup"}>
          <LogoAnimation/>
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

